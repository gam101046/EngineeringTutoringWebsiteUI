import { Elysia } from "elysia";
import { exampleRoutes } from "../modules/example/example.routes";
import { logixlysia } from "logixlysia";

export const apiRouter = new Elysia({ prefix: "/api" })
  .use(
    logixlysia({
      config: {
        customLogFormat: '🖕🏼 {now} {level} {duration} {method} {pathname} {status} {message} {ip}'
      }
    })
  )
  .get("/", () => ({ message: "API Router is ready 🚀" }))
  .use(exampleRoutes);
