import { Router } from "express";
import { InstituitionController } from "../controllers/InstituitionController";

const routes = Router();

routes.get('/get-all-seals', new InstituitionController().getSealsAll);

export default routes;
