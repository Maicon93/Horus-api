import { Router } from "express";
import { InstituitionController } from "../controllers/InstituitionController";
import { Connection } from "../middleware/Connection";
import multer from 'multer';
import fs from 'fs';
import path from 'path';

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

routes.use(conn);

routes.get('/get-all-notices', new InstituitionController().getNoticesAll);
routes.get('/get-notices-highlighted', new InstituitionController().getHightlightedNotices);
routes.get('/get-all-seals', new InstituitionController().getSealsAll);
routes.get('/get-all-courses', new InstituitionController().getCoursesAll);
routes.get('/get-notice/:id', new InstituitionController().getNotice);
routes.get('/get-all-persons', new InstituitionController().getAllPersons);
routes.get('/get-teachers-by-course/:id', new InstituitionController().getTeachersByCourse);
routes.get('/get-course/:id', new InstituitionController().getCourseById);


//TODO criar autenticação para ver se ta logado e se o token é válido
routes.post('/save-notice', upload.single('image'), new InstituitionController().saveNotice);
routes.delete('/delete-notice/:id', new InstituitionController().deleteNotice);
routes.put('/create-or-update-course', new InstituitionController().createOrUpdateCourse);
routes.delete('/delete-course/:id', new InstituitionController().courseDelete);
routes.put('/create-or-update-person', new InstituitionController().createOrUpdatePerson);
routes.delete('/delete-person/:id', new InstituitionController().personDelete);


export default routes;
