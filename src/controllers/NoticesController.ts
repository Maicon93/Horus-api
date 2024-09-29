import { Request, Response } from "express";
import { NoticesService } from "../services/NoticesService";

export class NoticesController extends NoticesService {
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

    async getNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.findNotice(req.conn, req.params)

        return res.status(200).json(response)
    }

    async saveNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.NoticeSave(req.conn, req.body)

        return res.status(200).json(response)
    }

    async deleteNotice(req: Request, res: Response) {
        const response: ObjectResponse = await super.noticeDelete(req.conn, +req.params.id)

        return res.status(200).json(response)
    }

}