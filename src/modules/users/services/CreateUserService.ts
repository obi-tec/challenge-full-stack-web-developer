import { validate } from "uuid";
import { CreateUserDTO } from "../dtos/CreateUser";
import { IUserRepository } from "../repositories/IUserRepository";


class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ uuid, name, email, phone, city, uf }: CreateUserDTO) {
    const isUUID = validate(uuid);

    if (!isUUID) {
      throw new Error('Invalid syntax UUID');
    }

    const uuidAlreadyExist = await this.userRepository.findByUUID(uuid);

    if (uuidAlreadyExist) {
      throw new Error('UUID already exist.');
    }

    const emailAlreadyExist = await this.userRepository.findByEmail(email);

    if (emailAlreadyExist) {
      throw new Error('E-mail address already exist.');
    };

    const phoneAlreadyExist = await this.userRepository.findByPhone(phone);

    if (phoneAlreadyExist) {
      throw new Error('Telephone already exist.');
    };

    const user = await this.userRepository.create({
      uuid,
      name,
      email,
      phone,
      city,
      uf
    });

    return user;
  }
}

export { CreateUserService };
