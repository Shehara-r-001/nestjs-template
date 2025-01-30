# NestJS Template

This is a boilerplate template for building scalable applications using [NestJS](https://nestjs.com/). It includes essential configurations and a structured project setup to kickstart your development.

## 📌 Features

- 🏎 **SWC** - Faster TypeScript compilation using `swc`
- 📖 **Swagger API Documentation** - Auto-generated API docs using `@nestjs/swagger`
- 📂 **Organized Folder Structure** - Clean modular architecture
- 🔥 **Redis Caching** - Integrated Redis support with `ioredis`
- ✅ **Linting & Formatting** - Pre-configured ESLint and Prettier

---

## Folder Structure

This project follows a modular structure to maintain scalability and separation of concerns:

```
src/
│-- app/
│   │-- core/ (Configurations, decorators, filters, guards, and interceptors)
│   │-- features/ (Feature modules, controllers, and services)
│   │-- shared/ (Common utilities, models, pipes, and services)
│   │-- app.module.ts (Main application module)
│   │-- main.ts (Bootstrap file)
│-- test/ (Testing-related files)
│-- .env (Environment variables)
│-- .env.example (Example environment file)
│-- .gitignore (Git ignore file)
│-- README.md (Project documentation)
```

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (Optional, for Redis)

### Installation

Clone the repository:

```sh
git clone https://github.com/Shehara-r-001/nestjs-template.git
cd nestjs-template
```

Install dependencies:

```sh
npm install
```

### Environment Variables

Copy the example `.env.example` file and configure it:

```sh
cp .env.example .env
```

Update the `.env` file with the required values.

### Running the App

Start the development server:

```sh
npm run start:dev
```

The server will run at `http://localhost:<PORT>/api/v1`.

### Running with Docker (Optional)

To run Redis using Docker:

```sh
docker run --name redis -p 6379:6379 -d redis
```

## Scripts

- `start` - Run the application
- `start:dev` - Run the application in development mode
- `build` - Build the application
- `test` - Run unit tests

## License

This project is licensed under the [MIT License](LICENSE).

---

Made by Shehara Ranathisara(https://github.com/Shehara-r-001)
