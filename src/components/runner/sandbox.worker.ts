/// <reference lib="webworker" />

type LogLevel = "log" | "info" | "warn" | "error";
export interface LogEntry {
  level: LogLevel;
  text: string;
}

/** Render an arbitrary value the way a console roughly would. */
function format(value: unknown, depth = 0, seen = new WeakSet<object>()): string {
  if (typeof value === "string") return depth === 0 ? value : `"${value}"`;
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") {
    const name = (value as { name?: string }).name;
    return name ? `[Function: ${name}]` : "[Function (anonymous)]";
  }
  if (typeof value === "object") {
    const obj = value as object;
    if (seen.has(obj)) return "[Circular]";
    if (depth > 4) return Array.isArray(obj) ? "[Array]" : "[Object]";
    seen.add(obj);
    try {
      if (Array.isArray(obj)) {
        return `[${obj.map((v) => format(v, depth + 1, seen)).join(", ")}]`;
      }
      if (obj instanceof Error) return `${obj.name}: ${obj.message}`;
      if (obj instanceof Map) {
        const entries = [...obj.entries()]
          .map(([k, v]) => `${format(k, depth + 1, seen)} => ${format(v, depth + 1, seen)}`)
          .join(", ");
        return `Map(${obj.size}) { ${entries} }`;
      }
      if (obj instanceof Set) {
        const items = [...obj.values()].map((v) => format(v, depth + 1, seen)).join(", ");
        return `Set(${obj.size}) { ${items} }`;
      }
      const entries = Object.entries(obj as Record<string, unknown>)
        .map(([k, v]) => `${k}: ${format(v, depth + 1, seen)}`)
        .join(", ");
      const ctor = (obj.constructor && obj.constructor.name) || "Object";
      const prefix = ctor && ctor !== "Object" ? `${ctor} ` : "";
      return `${prefix}{ ${entries} }`;
    } finally {
      seen.delete(obj);
    }
  }
  return String(value);
}

const ctx = self as unknown as DedicatedWorkerGlobalScope;

ctx.onmessage = (e: MessageEvent) => {
  const { code, id } = e.data as { code: string; id: number };
  const logs: LogEntry[] = [];

  const push = (level: LogLevel) => (...args: unknown[]) =>
    logs.push({ level, text: args.map((a) => format(a)).join(" ") });

  const sandboxConsole = {
    log: push("log"),
    info: push("info"),
    warn: push("warn"),
    error: push("error"),
    debug: push("log"),
  };

  const post = (ok: boolean) => ctx.postMessage({ id, ok, logs });

  try {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const fn = new Function("console", `"use strict";\n${code}\n//# sourceURL=playground.js`);
    fn(sandboxConsole);
    // Give promise chains / queued microtasks a brief window to log, then report.
    setTimeout(() => post(true), 60);
  } catch (err) {
    logs.push({
      level: "error",
      text: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    });
    post(false);
  }
};
