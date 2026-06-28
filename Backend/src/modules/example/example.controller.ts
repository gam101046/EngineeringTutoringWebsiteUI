import { ExampleService } from "./example.service";
import type { Prisma } from "../../generated/prisma";

export class ExampleController {
  private exampleService: ExampleService;

  constructor() {
    this.exampleService = new ExampleService();
  }

  async getAll() {
    return await this.exampleService.getAll();
  }

  async getById(id: string, set: any) {
    try {
      return await this.exampleService.getById(id);
    } catch (e: any) {
      set.status = 404;
      return { success: false, message: "Example not found" };
    }
  }

  async create(body: any, set: any) {
    try {
      const created = await this.exampleService.create(body);
      set.status = 201;
      return created;
    } catch (e: any) {
      set.status = 400;
      return { success: false, message: e.message };
    }
  }

  async update(id: string, body: any, set: any) {
    try {
      return await this.exampleService.update(id, body);
    } catch (e: any) {
      if (e.message === "NOT_FOUND") {
        set.status = 404;
        return { success: false, message: "Example not found" };
      }
      set.status = 400;
      return { success: false, message: e.message };
    }
  }

  async delete(id: string, set: any) {
    try {
      await this.exampleService.delete(id);
      return { success: true, message: "Deleted successfully" };
    } catch (e: any) {
      if (e.message === "NOT_FOUND") {
        set.status = 404;
        return { success: false, message: "Example not found" };
      }
      set.status = 400;
      return { success: false, message: e.message };
    }
  }
}
