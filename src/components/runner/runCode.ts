import type { LogEntry } from "./sandbox.worker";

export interface RunResult {
  ok: boolean;
  logs: LogEntry[];
  timedOut?: boolean;
}

let counter = 0;

/**
 * Run untrusted JS in a throwaway Web Worker, capturing console output.
 * The worker has no DOM or network access. A timeout terminates runaway
 * (e.g. infinite-loop) code so the UI never freezes.
 */
export function runCode(code: string, timeoutMs = 2000): Promise<RunResult> {
  return new Promise((resolve) => {
    const id = ++counter;
    let settled = false;

    const worker = new Worker(
      new URL("./sandbox.worker.ts", import.meta.url),
      { type: "module" }
    );

    const finish = (result: RunResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve(result);
    };

    const timer = setTimeout(() => {
      finish({
        ok: false,
        timedOut: true,
        logs: [
          {
            level: "error",
            text: "Execution timed out (possible infinite loop). The sandbox was terminated.",
          },
        ],
      });
    }, timeoutMs);

    worker.onmessage = (e: MessageEvent) => finish(e.data as RunResult);
    worker.onerror = (err) =>
      finish({
        ok: false,
        logs: [{ level: "error", text: err.message || "Sandbox error" }],
      });

    worker.postMessage({ code, id });
  });
}
