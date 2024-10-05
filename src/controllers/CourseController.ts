import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";
import path from "path";
import fs from 'fs';

export class CourseController extends CourseService {

    async getCoursesAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllCourses(req.conn)

        return res.status(200).json(response)
    }

    async getCourseById(req: Request, res: Response) {
        const response: ObjectResponse = await super.findCourseById(req.conn, +req.params.id)

        return res.status(200).json(response)
    }

    async createOrUpdateCourse(req: Request, res: Response) {
        const response: ObjectResponse = await super.updateOrCreateCourse(req.conn, req.body)

        return res.status(200).json(response)
    }

    async courseDelete(req: Request, res: Response) {
        const response: ObjectResponse = await super.deleteCourse(req.conn, +req.params.id)

        return res.status(200).json(response)
    }

    async downloadPdfTeachingCurriculum(req: Request, res: Response) {
        const fileName = req.params.fileName;
        const filePath = path.resolve('src/assets/pdfs', fileName);

        try {
            await fs.promises.access(filePath, fs.constants.F_OK);
        } catch (err) {
            console.error('Arquivo não encontrado:', fileName);
            return res.status(404).send('Arquivo não encontrado');
        }

        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
                return res.status(500).send('Erro ao fazer o download do arquivo');
            }
        });
    }

}