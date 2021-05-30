import { User } from "../entities/User";
import { CreateUserDTO } from "../dtos/CreateUser";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";

interface IUserRepository {
  create(data: CreateUserDTO): Promise<User>;
  listAll(): Promise<User[]>;
  update(data: UpdateUserDTO): Promise<User>;

  //Find User methods.
  findByUUID(uuid: string): Promise<User | undefined>;
  findByPhone(phone: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}

export { IUserRepository };
