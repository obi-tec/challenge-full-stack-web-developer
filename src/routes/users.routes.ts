import { Router } from 'express';
import { UserTypeormRepository } from '../modules/users/repositories/implementations/UserTypeormRepository';
import { CreateUserService } from '../modules/users/services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const userRepository = new UserTypeormRepository();

  const allUsers = await userRepository.listAll();
  return response.json(allUsers);
});

userRouter.post('/', async (request, response) => {
  const { uuid, name, email, phone, city, uf } = request.body;

  try {
    const userRepository = new UserTypeormRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      uuid,
      name,
      email,
      phone,
      city,
      uf
    });

    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({
      message: error.message
    })
  }
});

export { userRouter };
