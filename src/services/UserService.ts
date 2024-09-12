import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

export class UserService {
    async makeLogin(conn: Pool, body: CreateUser): Promise<ObjectResponse> {
        try {
            const query = await conn.query(`select * from users where email = '${body.email}'`);
            const user = query.rows[0];

            const sessionHash = randomBytes(16).toString('hex');

            if (user) {
                const isMatch = await bcrypt.compare(body.password, user.password);

                if (isMatch) {
                    delete user.password
                    user.sessionHash = sessionHash
                    return { type: 'success', body: user }
                }
            }

            return { type: 'error', msg: 'Usuário ou senha incorreto!' }
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao realizar solicitação!' }
        }
    }

    async create(conn: Pool, body: CreateUser): Promise<ObjectResponse> {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(body.password, salt)

            const query = `insert into users (name, email, password)
                values ('${body.name}', '${body.email}', '${hashedPassword}')`

            await conn.query(query);

            return { type: 'success', msg: 'Inserido com sucesso' }
        } catch (error: any) {
            return { type: 'error', msg: 'Email já cadastrado!' }
        }
    }

    async delete(conn: Pool, id: Number): Promise<ObjectResponse> {
        try {
            const query = `delete from users where id = ${id}`

            const execute = await conn.query(query);
            if (!execute.rowCount) {
                return { type: 'info', msg: 'Usuário não encontrado' }
            }

            return { type: 'success', msg: 'Usuário deletado com sucesso' }
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao deletar usuário!' }
        }
    }
}