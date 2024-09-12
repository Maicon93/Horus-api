import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstituitionController extends InstitutionService {
    constructor() {
        super();
    }

    async getNoticesAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllNotices(req.conn)

        return res.status(200).json(response)
    }

    async getSealsAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllSeals(req.conn)

        return res.status(200).json(response)
    }
}
