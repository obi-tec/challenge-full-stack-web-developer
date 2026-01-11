import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { v4 as uuidv4 } from 'uuid';

const generatedUuid = uuidv4(); // Gera um UUID

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API documentation for User service',
    },
    servers: [
      {
        url: process.env.SERVER_URL || 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

const updateUuidInDocs = (swaggerSpec: any) => {
  swaggerSpec.paths['/users/{uuid}'].get.parameters[0].schema.example = generatedUuid;
  swaggerSpec.paths['/users'].post.requestBody.content['application/json'].schema.properties.uuid.example = generatedUuid;
  return swaggerSpec;
};

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(updateUuidInDocs(swaggerSpec)));
};
