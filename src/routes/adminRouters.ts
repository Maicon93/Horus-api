import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { Connection } from "../middleware/Connection";

const routes = Router()
const conn = new Connection().conn;

routes.use(conn)

routes.post('/auth', new AdminController().auth)
routes.post('/login', new AdminController().login)
routes.post('/create', new AdminController().insertUser)


export default routes;


