import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const routes = Router()

routes.post('/login', new AdminController().login)
routes.post('/create', new AdminController().insertUser)


export default routes;


