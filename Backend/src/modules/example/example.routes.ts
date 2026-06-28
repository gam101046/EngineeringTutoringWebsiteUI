import { Elysia, t } from "elysia";
import { ExampleController } from "./example.controller";
// Import generated TypeBox schemas from prismabox
// Note: You must run `bunx prisma generate` first
import {
  ExamplePlainInputCreate,
  ExamplePlainInputUpdate
} from "../../../generated/prismabox/Example";

const controller = new ExampleController();
export const exampleRoutes = new Elysia({
  prefix: "/examples",
  detail: { tags: ["Example"] }
})
  .get("/", () => controller.getAll(), {
    detail: {
      summary: "Get all examples",
      description: "Retrieves a list of all example records.",
    },
  })
  .get(
    "/:id",
    ({ params: { id }, set }) => controller.getById(id, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Get example by ID",
        description: "Retrieves a single example record by its ID.",
      },
    }
  )
  .post(
    "/",
    ({ body, set }) => controller.create(body, set),
    {
      body: ExamplePlainInputCreate,
      detail: {
        summary: "Create a new example",
        description: "Creates a new example record.",
      },
    }
  )
  .patch(
    "/:id",
    ({ params: { id }, body, set }) => controller.update(id, body as any, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      body: ExamplePlainInputUpdate,
      detail: {
        summary: "Update an example",
        description: "Updates an existing example record.",
      },
    }
  )
  .delete(
    "/:id",
    ({ params: { id }, set }) => controller.delete(id, set),
    {
      params: t.Object({
        id: t.String(),
      }),
      detail: {
        summary: "Delete an example",
        description: "Deletes an example record by its ID.",
      },
    }
  );
