import { Router } from "express";
import { Connection } from "../middleware/Connection";
import { InstituitionController } from "../controllers/InstituitionController";

const routes = Router()
const conn = new Connection().conn;

routes.use(conn)

routes.get('/get-all-notices', new InstituitionController().getNoticesAll)
routes.get('/get-all-seals', new InstituitionController().getSealsAll)

export default routes;
