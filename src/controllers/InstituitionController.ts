import { Request, Response } from "express";
import { InstitutionService } from "../services/InstitutionService";

export class InstituitionController extends InstitutionService {
    constructor() {
        super();
    }

    async getSealsAll(req: Request, res: Response) {
        const response: ObjectResponse = await super.getAllSeals()

        return res.status(200).json(response)
    }
}
