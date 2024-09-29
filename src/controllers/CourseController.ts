import { Request, Response } from "express";
import { CourseService } from "../services/CourseService";

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

}