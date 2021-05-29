import { User } from "../entities/User";
import { CreateUserDTO } from "../dtos/CreateUser";

interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  listAll(): Promise<User[]>;

  //Find User methods.
  findByUUID(uuid: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUserRepository };
