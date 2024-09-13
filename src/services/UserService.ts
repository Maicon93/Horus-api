import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class UserService {
    async makeLogin(body: CreateUser): Promise<ObjectResponse> {
        try {
            const user = await prisma.user.findUnique({ where: { email: body.email } })

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

    async create(body: CreateUser): Promise<ObjectResponse> {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = body.password ? await bcrypt.hash(body.password, salt) : null

            await prisma.user.create({
                data: {
                    name: body.name,
                    email: body.email,
                    password: hashedPassword,
                },
            });

            return { type: 'success', msg: 'Inserido com sucesso' }
        } catch (error: any) {
            console.log(error.message)
            return { type: 'error', msg: 'Email já cadastrado!' }
        }
    }
}