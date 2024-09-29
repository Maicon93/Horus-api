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
    const fileName = req.body.imageName;

    if (req.body.old_image_name) {
      const oldImagePath = path.join(__dirname, '../images/notices', req.body.old_image_name);

      if (fs.existsSync(oldImagePath)) {
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err}`);
          }
        });
      }
    }

    cb(null, fileName);
  }
});

export const upload = multer({ storage });
