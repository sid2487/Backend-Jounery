/**
 * 📁 Backend Project Structure Guide (Node.js + Express + MongoDB)
 *
 * ✅ 1. server.js – Main Entry Point
 * - Imports express, dotenv, DB config, routes
 * - Initializes express app and middleware
 * - Sets up API routes
 * - Starts the server (app.listen)
 *
 * ✅ 2. config/db.js – DB Connection
 * - Connects to MongoDB using mongoose
 * - Uses async/await and try-catch
 * - Exported using default export
 *
 * ✅ 3. .env – Environment Variables
 * - Stores sensitive data like DB URI and PORT
 * - Accessed via process.env
 *
 * ✅ 4. models/ – Mongoose Models
 * - Each file defines schema and model for a collection
 * - Example: models/User.js defines User schema
 *
 * ✅ 5. controllers/ – Logic Handlers
 * - Functions for handling business logic
 * - Example: createUser, getUsers
 * - Exported individually (named export)
 *
 * ✅ 6. routes/ – Route Definitions
 * - Sets up endpoints using express.Router()
 * - Imports functions from controllers
 * - Exported as default
 *
 * ✅ 7. middlewares/ – Error or Auth Middleware
 * - Reusable logic between request and response
 * - Example: errorHandler.js or authMiddleware.js
 *
 * ✅ 8. app.use() – Middleware Registration
 * - Used in server.js
 * - Example: app.use("/api/users", userRoutes);
 *
 * ✅ 9. Imports: When to use {} vs not
 * - default export: import anything from "file"
 * - named export: import { something } from "file"
 *
 * ✅ 10. api/users vs /createUser
 * - /api/users is base route prefix
 * - route file has router.post("/", ...) -> becomes POST /api/users
 */

// 💡 This file is for your personal reference.
// Keep learning and building! 💪





/**
 * 📦 Import Flow Guide – Where to Import What (MERN Backend)
 *
 * | What             | Import Where?           | Why?                                |
 * | ---------------- | ----------------------- | ----------------------------------- |
 * | express          | server.js               | Setup Express server                |
 * | dotenv           | server.js               | Load env variables from .env        |
 * | DB connect fn    | server.js               | Connect Mongo before using routes   |
 * | Routes           | server.js               | Hook endpoints to paths             |
 * | Controllers      | route files             | Handle logic for specific endpoints |
 * | Models           | controller files        | Perform DB operations               |
 * | Middleware       | server.js / routes      | Handle errors, auth, etc.           |
 *
 * 🧠 How to Use:
 * - Keep this as a dev note in your project for reference.
 * - Helps you remember import flow & clean architecture.
 */


