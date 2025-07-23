# 🧑‍💻 User Auth & Role-Based Access API

## 📄 Description

A Node.js API for user authentication and role-based access control using JWT and Sequelize (MySQL). Includes signup, signin, profile management, and protected routes for different user roles (`admin`, `user`).

---

## ⚙️ Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Server framework
- **Sequelize** – ORM for MySQL
- **MySQL** – Relational database
- **JWT (jsonwebtoken)** – Authentication
- **Joi** – Request validation
- **Bcrypt** – Password hashing
- **dotenv** – Environment variable handling

---

## 🚀 Routes

### 🔓 Public Routes (`/api/public`)

| Method | Endpoint     | Description                      |
|--------|--------------|----------------------------------|
| POST   | `/signup`    | Register a new user              |
| POST   | `/signin`    | Authenticate and get JWT token   |

### 🔐 Protected Routes (`/api/user`) — *Require `Authorization` header*

| Method | Endpoint                | Description                         |
|--------|-------------------------|-------------------------------------|
| GET    | `/viewProfile/:id`     | View user profile by ID             |
| DELETE | `/deleteProfile/:id`   | Delete user profile by ID           |

### 🛡️ Role-Based Routes

| Method | Endpoint         | Access Role | Description                       |
|--------|------------------|-------------|-----------------------------------|
| GET    | `/adminOnly`     | admin       | Only accessible by admin users    |
| GET    | `/userOnly`      | user        | Only accessible by regular users  |

> 🔐 **All protected and role-based routes require a valid JWT token in `Authorization` header.**

---

## 🗃️ Database Structure (`Users` table via Sequelize)

| Field     | Type     | Notes                       |
|-----------|----------|-----------------------------|
| id        | Integer  | Primary key, auto-increment |
| name      | String   |                             |
| email     | String   | Unique                      |
| password  | String   | Hashed using bcrypt         |
| role      | String   | Either `admin` or `user`    |

---

## 🧼 Notes

- Passwords are hashed before storing in DB.
- JWT token contains `email` and `role` for access control.
- Joi ensures validation for `signup` and `signin` inputs.
- Modular structure with separate folders for `controllers`, `middlewares`, `routes`, and `validations`.

---

## 💻 Scripts

```bash
# Install dependencies
npm install

# Start the server
node index.js

# Run Sequelize migrations
npx sequelize-cli db:migrate

# (Optional) Create .env file
touch .env
