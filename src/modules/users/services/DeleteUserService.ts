import { validate } from "uuid";
import { IUserRepository } from "../repositories/IUserRepository";


class DeleteUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(uuid: string): Promise<void> {
    const isUUID = validate(uuid);

    if (!isUUID) {
      throw new Error('Invalid syntax UUID');
    }

    const user = await this.userRepository.findByUUID(uuid);

    if (!user) {
      throw new Error('User not found.');
    }

    await this.userRepository.delete(user.id);
  }
}

export { DeleteUserService };
