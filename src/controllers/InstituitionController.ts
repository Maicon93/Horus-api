import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstituitionController extends InstitutionService {
    constructor() {
        super();
    }

    async getNoticesAll(req: Request, res: Response) {
        const courseId = req.query?.course ? +req.query.course : null
        const response: ObjectResponse = await super.getAllNotices(req.conn, courseId)

        return res.status(200).json(response)
    }

    async getHightlightedNotices(req: Request, res: Response) {
        const response: ObjectResponse = await super.getNoticesHighlighted(req.conn)

        return res.status(200).json(response)
    }

    async saveNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.NoticeSave(req.conn, req.body)

        return res.status(200).json(response)
    }

    async getSealsAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllSeals()

        return res.status(200).json(response)
    }

    async getCoursesAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllCourses(req.conn)

        return res.status(200).json(response)
    }

    async getNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.findNotice(req.conn, req.params)

        return res.status(200).json(response)
    }

    async deleteNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.noticeDelete(req.conn, +req.params.id)

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

    async getAllPersons(req: Request, res: Response) {
        const response: ObjectResponse = await super.findAllPersons(req.conn)

        return res.status(200).json(response)
    }

    async personDelete(req: Request, res: Response) {
        const response: ObjectResponse = await super.deletePerson(req.conn, +req.params.id)

        return res.status(200).json(response)
    }

    async createOrUpdatePerson(req: Request, res: Response) {
        const response: ObjectResponse = await super.updateOrCreatePerson(req.conn, req.body)

        return res.status(200).json(response)
    }

    async getTeachersByCourse(req: Request, res: Response) {
        const response: ObjectResponse = await super.findTeachersByCourse(req.conn, +req.params.id)

        return res.status(200).json(response)
    }

    async getCourseById(req: Request, res: Response) {
        const response: ObjectResponse = await super.findCourseById(req.conn, +req.params.id)

        return res.status(200).json(response)
    }
}
