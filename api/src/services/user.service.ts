import { PrismaClient, User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { Messages } from "../constants/messages";
import { validateCreateUser, validateUpdateUser } from "../utils/validate";
import { toLowerCase } from "../utils/stringUtils";
import { validate as uuidValidate } from "uuid";

const prisma = new PrismaClient();

export class UserService {
  async createUser(data: CreateUserDTO): Promise<User> {
    validateCreateUser(data);

    if(!uuidValidate(data.uuid)) {
      throw new Error(Messages.Validate.INVALID_UUID);
    }

    const existingUuid = await prisma.user.findUnique({
      where: { uuid: data.uuid },
    });

    if (existingUuid) {
      throw new Error(Messages.User.UUID_ALREADY_EXISTS);
    }

    const email = toLowerCase(data.email);
    const userRegistered = await this.isEmailAlreadyRegistered(email);

    if (email && userRegistered) {
      throw new Error(Messages.User.EMAIL_ALREADY_EXISTS);
    }

    const updatedData = {
      ...data,
      email,
    };

    return prisma.user.create({
      data: updatedData,
    });
  }

  async getUsers(
    currentPage: number,
    perPage: number,
  ): Promise<{
    users: User[];
    total: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  }> {
    const skip = (currentPage - 1) * perPage;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: perPage,
        orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
      }),
      prisma.user.count(),
    ]);
    const totalPages = Math.ceil(total / perPage);
    return { users, total, currentPage, perPage, totalPages };
  }

  async getUser(uuid: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { uuid },
    });

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    return user;
  }

  async updateUser(uuid: string, data: UpdateUserDTO): Promise<User> {
    validateUpdateUser(data);

    const user = await this.getUser(uuid);

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    let updatedData = { ...data };

    if (data.email) {
      const email = toLowerCase(data.email);

      if (user.email !== email) {
        const userRegistered = await this.isEmailAlreadyRegistered(email);

        if (userRegistered) {
          throw new Error(Messages.User.EMAIL_ALREADY_EXISTS);
        }

        updatedData.email = email;
      }
    }

    return prisma.user.update({
      where: { uuid },
      data: updatedData,
    });
  }

  async deleteUser(uuid: string): Promise<User> {
    const user = await this.getUser(uuid);

    if (!user) {
      throw new Error(Messages.User.NOT_FOUND);
    }

    await prisma.user.delete({
      where: { uuid },
    });

    return user;
  }

  private async isEmailAlreadyRegistered(email: string): Promise<boolean> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    return !!existingUser;
  }
}
