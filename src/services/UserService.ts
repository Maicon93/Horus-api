import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Pool } from 'pg';
import SessionTokenRepository from '../repositorys/SessionTokenRepository';
import UserRepository from '../repositorys/UserRepository';

export class UserService {
    async makeLogin(conn: Pool, body: CreateUser): Promise<ObjectResponse> {
        try {
            const user = await UserRepository.findByEmail(conn, body.email)

            const sessionHash = randomBytes(16).toString('hex');

            if (user) {
                const isMatch = !user.password ? false : await bcrypt.compare(body.password, user.password);

                if (isMatch) {
                    delete user.password
                    user.sessionHash = sessionHash

                    await SessionTokenRepository.insert(conn, user)
                    return { type: 'success', body: user }
                }
            }

            return { type: 'error', msg: 'Usuário ou senha incorreto!' }
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao realizar solicitação!' }
        }
    }

    async create(conn: Pool, body: CreateUser): Promise<ObjectResponse> {
        const salt = await bcrypt.genSalt(10)
        body.hashedPassword = body.password ? await bcrypt.hash(body.password, salt) : null

        const create = await UserRepository.create(conn, body)

        if (create) {
            return { type: 'success', msg: 'Inserido com sucesso' }
        }

        return { type: 'error', msg: 'Email já cadastrado' }
    }
}