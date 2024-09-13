import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AdminController extends UserService {
    constructor() {
        super();
    }

    async login(req: Request, res: Response) {
        const response: ObjectResponse = await super.makeLogin(req.body)

        return res.status(200).json(response)
    }

    async insertUser(req: Request, res: Response) {
        const response: ObjectResponse = await super.create(req.body)

        return res.status(201).json(response)
    }
}