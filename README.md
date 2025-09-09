# Product Microservice

A NestJS-based microservice for product management with Prisma ORM and NATS messaging.

## Development Setup

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file based on `env.template`
4. Run Prisma migration
   ```bash
   npx prisma migrate dev
   ```
5. Start the NATS server
   ```bash
   docker run -d --name nats-server -p 4222:4222 -p 8222:8222 nats
   ```
6. Run the development server
   ```bash
   npm run start:dev
   ```