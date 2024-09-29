import { Router } from "express";
import { Connection } from "../middleware/Connection";
import { Auth } from "../middleware/Auth";
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { CourseController } from "../controllers/CourseController";
import { NoticesController } from "../controllers/NoticesController";
import { PersonsController } from "../controllers/PersonsController";
import { InstituitionController } from "../controllers/InstituitionController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './src/images/notices';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const fileName = req.body.imageName

    if (req.body.old_image_name) {
      const oldImagePath = path.join(__dirname, '../images/notices', req.body.old_image_name)

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => { })
      }
    }

    cb(null, fileName);
  }
});

const upload = multer({ storage });

const routes = Router();
const conn = new Connection().conn;
const auth = new Auth().execute;

routes.use(conn);

routes.get('/get-course/:id', new CourseController().getCourseById);
routes.get('/get-all-courses', new CourseController().getCoursesAll);

routes.get('/get-all-notices', new NoticesController().getNoticesAll);
routes.get('/get-notices-highlighted', new NoticesController().getHightlightedNotices);
routes.get('/get-notice/:id', new NoticesController().getNotice);

routes.get('/get-all-persons', new PersonsController().getAllPersons);
routes.get('/get-teachers-by-course/:id', new PersonsController().getTeachersByCourse);

routes.get('/get-all-seals', new InstituitionController().getSealsAll);

routes.use(auth);

routes.put('/create-or-update-course', new CourseController().createOrUpdateCourse);
routes.delete('/delete-course/:id', new CourseController().courseDelete);

routes.post('/save-notice', upload.single('image'), new NoticesController().saveNotice);
routes.delete('/delete-notice/:id', new NoticesController().deleteNotice);

routes.put('/create-or-update-person', new PersonsController().createOrUpdatePerson);
routes.delete('/delete-person/:id', new PersonsController().personDelete);


export default routes;
