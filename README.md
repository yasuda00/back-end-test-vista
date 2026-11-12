# Vista Backend API

A RESTful backend API developed for the Vista technical assessment using Node.js, TypeScript, Express.js, Prisma ORM, and MySQL.

The API manages companies and their associated services through a relational database.

## Technologies Used

- **Node.js** – JavaScript runtime
- **TypeScript** – Static type checking
- **Express.js** – REST API framework
- **Prisma ORM** – Database access and migrations
- **MySQL** – Relational database
- **dotenv** – Environment variable management
- **cors** – Cross-Origin Resource Sharing

## Project Structure

```text
back-end-test-vista/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controllers/
│   │   ├── company.controller.ts
│   │   └── service.controller.ts
│   ├── dtos/
│   │   ├── company.dto.ts
│   │   └── service.dto.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   ├── company.routes.ts
│   │   └── service.routes.ts
│   └── server.ts
├── .env.example
├── .gitignore
├── package.json
├── prisma7.config.ts
├── tsconfig.json
└── Vista Backend API.postman_collection.json
```

## Database Design

The application uses two relational database tables:

### Company

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key, auto-increment |
| name | String | Company name |
| registrationNumber | String | Unique registration number |

### Service

| Field | Type | Description |
|---|---|---|
| id | Int | Primary key, auto-increment |
| companyId | Int | Foreign key referencing Company |
| name | String | Service name |
| description | String? | Optional service description |
| price | Decimal(10,2) | Service price |

**Relationship:** One company can have multiple services. Each service belongs to one company.

Deleting a company also deletes its associated services through the configured cascade relationship.

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- MySQL Server
- Git

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yasuda00/back-end-test-vista.git
cd back-end-test-vista
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the database

Create a MySQL database named:

```sql
CREATE DATABASE technical_test;
```

### 4. Configure environment variables

Copy `.env.example` to `.env`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your local MySQL credentials:

```env
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/technical_test"

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=YOUR_PASSWORD
DATABASE_NAME=technical_test

PORT=3000
```

Replace `YOUR_PASSWORD` with your MySQL password.

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

### 7. Build for production

```bash
npm run build
```

Start the production build:

```bash
npm start
```

## API Endpoints

Base URL:

```text
http://localhost:3000
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check API and database connection |
| POST | `/companies` | Create a company |
| GET | `/companies` | Retrieve all companies with their services |
| POST | `/services` | Create a service |
| GET | `/services/:id` | Retrieve a service by ID |

## API Request Examples

### 1. Create Company

**POST** `/companies`

Request body:

```json
{
  "name": "Vista Solutions",
  "registrationNumber": "VISTA-TEST-001"
}
```

Successful response: `201 Created`

### 2. Get All Companies

**GET** `/companies`

Returns all companies, including their associated services.

Successful response: `200 OK`

### 3. Create Service

**POST** `/services`

Request body:

```json
{
  "companyId": 1,
  "name": "Web Development",
  "description": "Website development services",
  "price": 2500
}
```

Successful response: `201 Created`

### 4. Get Service by ID

**GET** `/services/1`

Returns the service matching the specified ID.

Successful response: `200 OK`

## HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | Request successful |
| 201 | Resource created successfully |
| 400 | Invalid request data |
| 404 | Resource not found |
| 409 | Duplicate company registration number |
| 500 | Internal server error |

## API Testing

The project includes a Postman collection:

`Vista Backend API.postman_collection.json`

To test the API:

1. Open Postman.
2. Import the collection JSON file.
3. Make sure the backend server is running.
4. Execute the available API requests.

The collection contains requests for creating and retrieving companies and services.

## Notes

- Environment variables are stored in `.env`, which is excluded from Git.
- Use `.env.example` as a template for local configuration.
- Prisma migrations are included in the repository.
- The Prisma Client is generated during the build process.

## Author

Developed as part of the Vista Backend Technical Assessment.