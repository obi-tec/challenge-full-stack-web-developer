import { PrismaClient, User } from "@prisma/client";
import { UserService } from "../src/services/user.service";
import { CreateUserDTO } from "../src/dtos/create-user.dto";
import { Messages } from "../src/constants/messages";
import { UpdateUserDTO } from "../src/dtos/update-user.dto";
import { v4 as uuidv4 } from "uuid";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe("UserService", () => {
  let userService: UserService;
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient();
    userService = new UserService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test for creating a new user
  it("should create a user", async () => {
    const data: CreateUserDTO = {
      uuid: uuidv4(),
      email: "rodrigosoares@email.com",
      name: "Rodrigo Soares",
    };
    (prisma.user.create as jest.Mock).mockResolvedValue(data);

    const result = await userService.createUser(data);
    expect(result).toEqual(data);
    expect(prisma.user.create).toHaveBeenCalledWith({ data });
  });

  // Test for invalid user data during creation
  it("should not create a user if uuid, name or email is not provided", async () => {
    const noUuid: CreateUserDTO = { uuid: "", email: "test@test.com", name: "Test User" };
    const noName: CreateUserDTO = { uuid: uuidv4(), email: "test@test.com", name: "" };
    const noEmail: CreateUserDTO = { uuid: uuidv4(), email: "", name: "Test User" };

    await expect(userService.createUser(noUuid)).rejects.toThrow(Messages.Validate.INVALID_UUID);
    await expect(userService.createUser(noName)).rejects.toThrow(Messages.Validate.LONG_NAME);
    await expect(userService.createUser(noEmail)).rejects.toThrow(Messages.Validate.INVALID_EMAIL);
  });

  // Test for duplicate email during user creation
  it("should not create a user if uuid or email already exists", async () => {
    const data: CreateUserDTO = { uuid: uuidv4(), email: "test@test.com", name: "Test User" };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(data);

    await expect(userService.createUser(data)).rejects.toThrow(Messages.User.UUID_ALREADY_EXISTS);
  });

  // // Test for fetching users with pagination
  it("should get users with pagination", async () => {
    const users = [
      { uuid: uuidv4(), email: "carla@email.com", name: "Carla" },
      { uuid: uuidv4(), email: "sheila@email.com", name: "Sheila" },
      { uuid: uuidv4(), email: "alice@email.com", name: "Alice" },
      { uuid: uuidv4(), email: "bob@email.com", name: "Bob" },
      { uuid: uuidv4(), email: "carol@email.com", name: "Carol" },
    ];

    (prisma.user.findMany as jest.Mock).mockResolvedValue(users);
    (prisma.user.count as jest.Mock).mockResolvedValue(users.length);

    const result = await userService.getUsers(1, 5);
    expect(result).toEqual({ users, total: 5, currentPage: 1, perPage: 5, totalPages: 1 });
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 5,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });
    expect(prisma.user.count).toHaveBeenCalled();
  });

  // // Test for pagination across multiple pages

  it("should get users with pagination for the second page", async () => {
    const usersPage1 = [
      { email: "carla@email.com", name: "Carla" },
      { email: "sheila@email.com", name: "Sheila" },
      { email: "alice@email.com", name: "Alice" },
    ];
    const usersPage2 = [
      { email: "bob@email.com", name: "Bob" },
      { email: "carol@email.com", name: "Carol" },
    ];
    (prisma.user.findMany as jest.Mock)
      .mockResolvedValueOnce(usersPage1)
      .mockResolvedValueOnce(usersPage2);
    (prisma.user.count as jest.Mock).mockResolvedValue(usersPage1.length + usersPage2.length);

    const resultPage1 = await userService.getUsers(1, 3);
    const resultPage2 = await userService.getUsers(2, 3);

    expect(resultPage1).toEqual({
      users: usersPage1,
      total: 5,
      currentPage: 1,
      perPage: 3,
      totalPages: 2,
    });
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      skip: 0,
      take: 3,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });

    expect(resultPage2).toEqual({
      users: usersPage2,
      total: 5,
      currentPage: 2,
      perPage: 3,
      totalPages: 2,
    });
    expect(prisma.user.findMany).toHaveBeenCalledWith({
      skip: 3,
      take: 3,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });
    expect(prisma.user.count).toHaveBeenCalled();
  });

  // Test for fetching a user by UUID
  it("should get a user by uuid", async () => {
    const user = { uuid: "1234", email: "test@test.com", name: "Test User" } as User;
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);

    const result = await userService.getUser("1234");
    expect(result).toEqual(user);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid: "1234" } });
  });

  // Test for handling non-existent user by UUID
  it("should throw an error if user not found by uuid", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(userService.getUser("1234")).rejects.toThrow(Messages.User.NOT_FOUND);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid: "1234" } });
  });

  // Test for updating a user
  it("should update a user", async () => {
    const uuid = "1234";
    const existingUser = { uuid, email: "test@test.com", name: "Test User" } as User;
    const updateData: UpdateUserDTO = { email: "newtest@test.com", name: "New Test User" };
    const updatedUser = { ...existingUser, ...updateData };

    // Mock to find the user by UUID or email
    (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
      if (where.uuid === uuid) return existingUser;
      if (where.email === updateData.email) return null;

      return null;
    });

    // Mock to update the user
    (prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await userService.updateUser(uuid, updateData);

    expect(result).toEqual(updatedUser);

    // Validate that the user search was called with the correct UUID
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });

    // Validate that the email check was performed
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: updateData.email } });

    // Validate the update method call
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { uuid },
      data: updateData,
    });
  });

  it("should throw an error if user not found when updating", async () => {
    const uuid = "1234";
    const updateData: UpdateUserDTO = { email: "newtest@test.com", name: "New Test User" };

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(userService.updateUser(uuid, updateData)).rejects.toThrow(Messages.User.NOT_FOUND);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });
  });

  it("should throw an error if email already exists when updating", async () => {
    const uuid = "1234";
    const existingUser = { uuid, email: "test@test.com", name: "Test User" } as User;
    const updateData: UpdateUserDTO = { email: "existing@test.com", name: "New Test User" };

    (prisma.user.findUnique as jest.Mock)
      .mockResolvedValueOnce(existingUser)
      .mockResolvedValueOnce({ email: "existing@test.com" });

    await expect(userService.updateUser(uuid, updateData)).rejects.toThrow(
      Messages.User.EMAIL_ALREADY_EXISTS,
    );
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "existing@test.com" } });
  });

  it("should throw an error if email is invalid during update", async () => {
    const uuid = uuidv4();
    const updateData: UpdateUserDTO = { email: "invalid-email", name: "New Test User" };

    await expect(userService.updateUser(uuid, updateData)).rejects.toThrow(
      Messages.Validate.INVALID_EMAIL,
    );
  });

  it("should throw an error if name is too short during update", async () => {
    const uuid = uuidv4();
    const updateData: UpdateUserDTO = { email: "valid@email.com", name: "" };

    await expect(userService.updateUser(uuid, updateData)).rejects.toThrow(
      Messages.Validate.LONG_NAME,
    );
  });

  // Test for deleting a user
  it("should delete a user", async () => {
    const uuid = "1234";
    const existingUser = { uuid, email: "test@test.com", name: "Test User" } as User;

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(existingUser);
    (prisma.user.delete as jest.Mock).mockResolvedValue(existingUser);

    const result = await userService.deleteUser(uuid);

    expect(result).toEqual(existingUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { uuid } });
  });

  it("should throw an error if user not found when deleting", async () => {
    const uuid = "1234";

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(userService.deleteUser(uuid)).rejects.toThrow(Messages.User.NOT_FOUND);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });
  });

  // Test for handling unexpected errors in Prisma operations
  it("should handle unexpected errors during operations", async () => {
    const uuid = "1234";
    const unexpectedError = new Error("Unexpected database error");

    (prisma.user.findUnique as jest.Mock).mockRejectedValue(unexpectedError);

    await expect(userService.getUser(uuid)).rejects.toThrow(unexpectedError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { uuid } });
  });
});
