import { Request, Response } from "express";
import { PersonsService } from "../services/PersonsService";

export class PersonsController extends PersonsService {
    constructor() {
        super();
    }

    async getAllPersons(req: Request, res: Response) {
        const response: ObjectResponse = await super.findAllPersons(req.conn)

        return res.status(200).json(response)
    }

    async getTeachersByCourse(req: Request, res: Response) {
        const response: ObjectResponse = await super.findTeachersByCourse(req.conn, +req.params.id)

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

}