import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './src/assets/pdfs';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },

  filename: (req, file, cb) => {
    const fileName = req.body.teachingCurriculumName || file.originalname;

    if (req.body.old_image_name) {
      const oldPdfCurriculumPath = path.join(__dirname, '../assets/pdfs', req.body.old_pdf_curriculum_name);

      if (fs.existsSync(oldPdfCurriculumPath)) {
        fs.unlink(oldPdfCurriculumPath, (err) => {
          if (err) {
            console.error(`Error deleting old image: ${err}`);
          }
        });
      }
    }

    cb(null, fileName);
  }
});


export const uploadPdfCourse = multer({ storage });
