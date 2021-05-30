import { getRepository, Repository } from "typeorm";
import { CreateUserDTO } from "../../dtos/CreateUser";
import { UpdateUserDTO } from "../../dtos/UpdateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


class UserTypeormRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async listAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ id: data.uuid, ...data });

    await this.ormRepository.save(user);

    return user;
  };

  public async update(data: UpdateUserDTO): Promise<User> {
    const updateUser = await this.ormRepository.save(data);
    return updateUser;
  }

  //Find User methods.
  public async findByUUID(uuid: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne(uuid);
    return findUser;
  };

  public async findByPhone(phone: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { phone }
    });
    return findUser;
  };

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { email }
    });
    return findUser;
  };
}

export { UserTypeormRepository };
