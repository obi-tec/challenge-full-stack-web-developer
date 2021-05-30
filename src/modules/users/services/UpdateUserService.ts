import { validate } from 'uuid';

import { User } from "../entities/User";
import { IUserRepository } from "../repositories/IUserRepository";

interface Request {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  uf: string;
}

class UpdateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ uuid, name, email, phone, city, uf }: Request): Promise<User> {
    const isUUID = validate(uuid);

    if (!isUUID) {
      throw new Error('Invalid syntax UUID');
    }

    const user = await this.userRepository.findByUUID(uuid);
    if (!user) {
      throw new Error('User not found.');
    }

    const emailAlreadyExist = await this.userRepository.findByEmail(email);

    if (emailAlreadyExist && emailAlreadyExist.id !== uuid) {
      throw new Error('E-mail address already in used.');
    }

    const telephoneAlreadyExist = await this.userRepository.findByPhone(phone);

    if (telephoneAlreadyExist && telephoneAlreadyExist.id !== uuid) {
      throw new Error('Telephone user already in used..');
    }

    Object.assign(user, { name, email, phone, city, uf });
    await this.userRepository.update(user);
    return user;
  }
}

export { UpdateUserService };
