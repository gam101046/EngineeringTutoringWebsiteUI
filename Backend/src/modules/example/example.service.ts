import { prisma } from "../../db";
import { Prisma } from "../../generated/prisma";

export class ExampleService {
  async getAll() {
    return await prisma.example.findMany();
  }

  async getById(id: string) {
    const example = await prisma.example.findUnique({
      where: { id },
    });
    if (!example) throw new Error("NOT_FOUND");
    return example;
  }

  async create(data: Prisma.ExampleCreateInput) {
    return await prisma.example.create({
      data,
    });
  }
  
  async update(id: string, data: Prisma.ExampleUpdateInput) {
    // Verify existence
    await this.getById(id);
    return await prisma.example.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    // Verify existence
    await this.getById(id);
    return await prisma.example.delete({
      where: { id },
    });
  }
}
