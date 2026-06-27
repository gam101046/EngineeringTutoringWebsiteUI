import { Elysia } from "elysia";


const app = new Elysia()
  .get("/", () => "API is running 🚀")
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);