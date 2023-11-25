import { NestFactory } from '@nestjs/core'; // Importing NestFactory from the core of NestJS
import { AppModule } from './app.module'; // Importing the main app module

// This is the bootstrap function that sets up the NestJS application
async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Creating a new NestJS application instance
  await app.listen(3000); // The application starts listening for incoming requests on port 3000
}
bootstrap(); // Calling the bootstrap function to start the application
