import { Elysia } from "elysia";

// ── ANSI color codes ──────────────────────────────────────────────────────────
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",

  // Status colors
  green: "\x1b[32m",  // 2xx
  yellow: "\x1b[33m", // 4xx
  red: "\x1b[31m",    // 5xx

  // Method colors
  cyan: "\x1b[36m",   // GET
  blue: "\x1b[34m",   // POST
  magenta: "\x1b[35m",// PUT / PATCH
  white: "\x1b[37m",  // DELETE / other

  // Misc
  gray: "\x1b[90m",
};

const getStatusColor = (status: number): string =>
  status >= 500 ? c.red : status >= 400 ? c.yellow : c.green;

const getMethodColor = (method: string): string => {
  switch (method.toUpperCase()) {
    case "GET":    return c.cyan;
    case "POST":   return c.blue;
    case "PUT":
    case "PATCH":  return c.magenta;
    case "DELETE": return c.red;
    default:       return c.white;
  }
};

const getTimestamp = (): string => {
  return new Date().toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

// ── Error Middleware ──────────────────────────────────────────────────────────
export const errorMiddleware = new Elysia().onError(({ code, error, set }) => {
  const message = error instanceof Error ? error.message : String(error);

  if (code === "NOT_FOUND") {
    set.status = 404;
    return { success: false, message: "Not Found" };
  }

  set.status = 500;
  return {
    success: false,
    message: "Internal Server Error",
    error: message,
  };
});

// ── Logger Middleware ─────────────────────────────────────────────────────────
// onAfterResponse จะรันหลังส่ง response ออกไปเสมอ
// ครอบคลุมทั้งกรณี success และ error (404, 500, validation ฯลฯ)
// ต่างจาก onAfterHandle ที่จะ "ข้าม" ไปเลยถ้า request error
// ── Logger Middleware (แก้ไขแล้ว) ─────────────────────────────────────────────
export const loggerMiddleware = new Elysia()
  // ใช้ derive เพื่อสร้างตัวแปรใน context ของ request นั้นๆ โดยเฉพาะ
  .derive(() => ({
    _startTime: Date.now()
  }))
  .onAfterResponse(({ request, set, _startTime }) => {
    const { pathname } = new URL(request.url);
    const status = typeof set.status === "number" ? set.status : 200;

    // ใช้ _startTime ที่ได้มาจาก derive โดยตรง
    const duration = `${Date.now() - _startTime}ms`;

    const statusColor  = getStatusColor(status);
    const methodColor  = getMethodColor(request.method);
    const timestamp    = getTimestamp();
    const paddedMethod = request.method.padEnd(6);

    console.log(
      `${c.dim}[${timestamp}]${c.reset} ` +
      `${c.bold}${methodColor}${paddedMethod}${c.reset} ` +
      `${pathname} ` +
      `${c.bold}${statusColor}${status}${c.reset} ` +
      `${c.gray}(${duration})${c.reset}`
    );
  });

// ── Combined Middleware ───────────────────────────────────────────────────────
export const setupMiddlewares = new Elysia()
  .use(errorMiddleware)
  .use(loggerMiddleware);