import { Request, Response } from "express";
import { AdminService } from "../services/AdminService";

export class AdminController extends AdminService {
    constructor() {
        super();
    }

    async auth(req: Request, res: Response) {
        const response: ObjectResponse = await super.authenticator(req.conn, req.body)

        return res.status(200).json(response)
    }

    async login(req: Request, res: Response) {
        const response: ObjectResponse = await super.makeLogin(req.conn, req.body)

        return res.status(200).json(response)
    }

    async insertUser(req: Request, res: Response) {
        const response: ObjectResponse = await super.create(req.conn, req.body)

        return res.status(201).json(response)
    }
}