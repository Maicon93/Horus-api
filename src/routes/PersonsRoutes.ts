import { Router } from "express";
import { Connection } from "../middleware/Connection";
import { Auth } from "../middleware/Auth";
import { PersonsController } from "../controllers/PersonsController";

const routes = Router();
const conn = new Connection().conn;
const auth = new Auth().execute;

routes.use(conn);

routes.get('/get-all-persons', new PersonsController().getAllPersons);
routes.get('/get-teachers-by-course/:id', new PersonsController().getTeachersByCourse);

routes.use(auth);

routes.put('/create-or-update-person', new PersonsController().createOrUpdatePerson);
routes.delete('/delete-person/:id', new PersonsController().personDelete);


export default routes;
