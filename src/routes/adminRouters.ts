import { Router } from "express";
import { AdminController } from "../controllers/AdminController";
import { Connection } from "../middleware/Connection";

const routes = Router()
const conn = new Connection().conn;

routes.use(conn)

routes.post('/login', new AdminController().login)
routes.post('/create', new AdminController().insertUser)
routes.post('/get-all', new AdminController().getAllUsers)
routes.post('/delete-by-id', new AdminController().deleteById)


export default routes;


