import { Router } from "express";
import { InstituitionController } from "../controllers/InstituitionController";
import { Connection } from "../middleware/Connection";

const routes = Router()
const conn = new Connection().conn;

routes.use(conn)

routes.get('/get-all-notices', new InstituitionController().getNoticesAll)
routes.get('/get-all-seals', new InstituitionController().getSealsAll)

export default routes;
