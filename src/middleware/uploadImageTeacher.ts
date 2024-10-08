import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const dir = './src/assets/teachers';
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);

    } catch (error: any) {
      console.log(error.message)
    }
  },

  filename: (req, file, cb) => {
    try {
      const extension = path.extname(file.originalname);

      const fileName = `${req.body.imageName}${extension}`;
      req.body.imageName = fileName

      if (req.body.old_image_name) {
        const oldImagePath = path.join(__dirname, '../assets/teachers', req.body.old_image_name);

        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) {
              console.error(`Error deleting old image: ${err}`);
            }
          });
        }
      }

      cb(null, fileName);

    } catch (error: any) {
      console.log(error.message)
    }
  }
});

export const uploadImageTeacher = multer({ storage });
