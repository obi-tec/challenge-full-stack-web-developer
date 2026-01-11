import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               uuid:
 *                 type: string
 *                 example: ${uuidv4()}
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', UserController.createUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', UserController.getUsers);

/**
 * @swagger
 * /users/{uuid}:
 *   get:
 *     summary: Get a user by UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           example: ${uuidv4()}
 *         required: true
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */
router.get('/:uuid', UserController.getUser);

/**
 * @swagger
 * /users/{uuid}:
 *   put:
 *     summary: Update a user by UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           example: ${uuidv4()}
 *         required: true
 *         description: UUID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       400:
 *         description: Bad request
 */
router.put('/:uuid', UserController.updateUser);

/**
 * @swagger
 * /users/{uuid}:
 *   delete:
 *     summary: Delete a user by UUID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           example: ${uuidv4()}
 *         required: true
 *         description: UUID of the user
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:uuid', UserController.deleteUser);

export default router;
