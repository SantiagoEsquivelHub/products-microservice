# Product Microservice

A NestJS-based microservice for product management with Prisma ORM and NATS messaging.

## Features

- **Product CRUD Operations**: Create, read, update, and soft delete products
- **Microservice Architecture**: Uses NATS for message-based communication
- **Database Management**: Prisma ORM with SQLite database
- **Pagination Support**: Efficient product listing with pagination
- **Soft Delete**: Products are marked as unavailable instead of being deleted
- **Product Validation**: Bulk product validation functionality

## Tech Stack

- **Framework**: NestJS
- **Database**: SQLite with Prisma ORM
- **Message Broker**: NATS
- **Language**: TypeScript

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
6. Start the development server
   ```bash
   npm run start:dev
   ```

## API Commands

The microservice responds to the following message patterns:

- `create_product` - Create a new product
- `find_all_products` - Get paginated list of products
- `find_one_product` - Get a specific product by ID
- `update_product` - Update an existing product
- `delete_product` - Soft delete a product
- `validate_products` - Validate multiple products by IDs

## Database Schema

```prisma
model Product {
  id        Int      @id @default(autoincrement())
  name      String
  price     Float
  available Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([available])
}
```

## Project Structure

```
src/
├── common/           # Shared DTOs and utilities
├── config/           # Environment configuration
├── products/         # Product module
│   ├── dto/         # Data Transfer Objects
│   ├── entities/    # Product entity
│   └── products.service.ts
└── main.ts          # Application entry point
```