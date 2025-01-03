import { Router } from "express";
import { Connection } from "../middleware/Connection";
import { Auth } from "../middleware/Auth";
import { CourseController } from "../controllers/CourseController";
import { uploadPdfCourse } from "../middleware/uploadPdfCourse"

const routes = Router();
const conn = new Connection().conn;
const auth = new Auth().execute;

routes.use(conn);

routes.get('/get-course/:id', new CourseController().getCourseById);
routes.get('/get-all-courses', new CourseController().getCoursesAll);
routes.get('/download-pdf/:fileName', new CourseController().downloadPdfTeachingCurriculum);

routes.use(auth);

routes.put('/create-or-update-course', uploadPdfCourse.single('pdf'), new CourseController().createOrUpdateCourse);
routes.delete('/delete-course/:id', new CourseController().courseDelete);

export default routes;
