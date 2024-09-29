import { NextFunction, Request, Response } from 'express';


export class Auth {
  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.headers?.token) {
        return this.error(res);
      }

      const token = req.headers.token
      const rows = await req.conn.query(`select * from session_tokens where token = '${token}'`)

      if (!rows || !rows.rows || !rows.rows.length) {
        return this.error(res);
      }

      const session = rows.rows[0]

      const dateToken = new Date(session.validate);
      const dateActual = new Date();

      if (dateActual > dateToken) {
        return this.error(res);
      }

      next()
    } catch (error) {
      return res.status(200).json({ type: 'error', msg: 'Usuário não autenticado' })
    }
  }

  async error(res: Response) {
    return res.status(200).json({ type: 'error', msg: 'Usuário não autenticado' })
  }
}