import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class AdminController extends UserService {
    constructor() {
        super();
    }

    async login(req: Request, res: Response) {
        const response: ObjectResponse = await super.makeLogin(req.conn, req.body)

        return res.status(200).json(response)
    }

    async getAllUsers(req: Request, res: Response) {
        const query = await req.conn.query('select * from users');
        const resp = { type: 'success', msg: 'Successo', data: query.rows }

        return res.status(200).json(resp)
    }

    async insertUser(req: Request, res: Response) {
        const response: ObjectResponse = await super.create(req.conn, req.body)

        return res.status(201).json(response)
    }

    async deleteById(req: Request, res: Response) {
        if (!req.body.id) {
            return res.status(201).json({ type: 'error', msg: 'ID não informado' })
        }

        const response: ObjectResponse = await super.delete(req.conn, req.body.id)
        const status = response.type == 'error' ? 500 : 201

        return res.status(201).json(response)
    }
}