import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { setupMiddlewares } from "./middlewares";
import { apiRouter } from "./router";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Engenius API Documentation",
          version: "1.0.0",
        },
      },
      path: "/swagger",
    })
  )
  .use(setupMiddlewares)
  .use(apiRouter)
  .get("/", () => "API is running 🚀")
  .listen(process.env.PORT || 3001);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
console.log(
  `📖 Open Swagger at http://${app.server?.hostname}:${app.server?.port}/swagger`
);