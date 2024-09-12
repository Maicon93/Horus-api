import { User } from "../controllers/userController";

declare global {
  namespace Express {
    export interface Request {
      conn: Any;
    }
  }
}