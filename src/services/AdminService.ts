import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Pool } from 'pg';
import SessionTokenRepository from '../repositorys/SessionTokenRepository';
import UserRepository from '../repositorys/UserRepository';

export class AdminService {
    async authenticator(conn: Pool, data: { token: string }): Promise<ObjectResponse> {
        const auth: SessionTokens | null = await SessionTokenRepository.findByToken(conn, data.token)

        if (auth) {
            const currentDate = new Date();
            const validateDate = new Date(auth.validate);

            if (currentDate <= validateDate) {
                return { type: 'success' }
            }
        }

        return { type: 'error', msg: 'Usuário não autenticado!' }
    }

    async makeLogin(conn: Pool, data: CreateUser): Promise<ObjectResponse> {
        try {
            const user = await UserRepository.findByEmail(conn, data.email)

            const sessionHash = randomBytes(16).toString('hex');

            if (user) {
                const isMatch = !user.password ? false : await bcrypt.compare(data.password, user.password);

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

    async create(conn: Pool, data: CreateUser): Promise<ObjectResponse> {
        const salt = await bcrypt.genSalt(10)
        data.hashedPassword = data.password ? await bcrypt.hash(data.password, salt) : null

        const create = await UserRepository.create(conn, data)

        if (create) {
            return { type: 'success', msg: 'Inserido com sucesso' }
        }

        return { type: 'error', msg: 'Email já cadastrado' }
    }
}