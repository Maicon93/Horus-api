import { Router } from 'express';
import { Connection } from '../middleware/Connection';
import { Auth } from '../middleware/Auth';
import { NoticesController } from '../controllers/NoticesController';
import { upload } from '../middleware/uploadImageNotice';

const routes = Router();
const conn = new Connection().conn;
const auth = new Auth().execute;

routes.use(conn);

routes.get('/get-all-notices', new NoticesController().getNoticesAll);
routes.get('/get-notices-highlighted', new NoticesController().getHightlightedNotices);
routes.get('/get-notice/:id', new NoticesController().getNotice);

routes.use(auth);

routes.post('/save-notice', upload.single('image'), new NoticesController().saveNotice);
routes.delete('/delete-notice/:id', new NoticesController().deleteNotice);

export default routes;
