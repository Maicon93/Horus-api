import { Pool } from 'pg';
import { NextFunction, Request, Response } from 'express';


export class Connection {
  conn(req: Request, res: Response, next: NextFunction) {
    try {
      const conn = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
      });
      req.conn = conn;

      res.on('finish', () => {
        if (req.conn) {
          req.conn.end();
        }
      });

      next()
    } catch (error) {
      const response = { type: 'error', msg: 'Erro ao criar conexão com banco de dados' }
      return res.status(500).json(response)
    }
  }
}