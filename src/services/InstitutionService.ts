import { UtilsService } from './UtilsService';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export class InstitutionService {
    async getAllNotices(): Promise<ObjectResponse> {
        try {
            const utilsService = new UtilsService()
            const notices = await prisma.notice.findMany({ where: { highlighted: true } })

            const rows = notices.map((row: any) => {
                return {
                    ...row,
                    created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
                    image_url: `http://localhost:3000/images/${row.link_image}` // ajusta o link da imagem
                };
            });

            return { type: 'success', body: rows };
        } catch (error: any) {
            console.log(error.message)
            return { type: 'error', msg: 'Erro ao consultar noticias!' };
        }
    }

    async getAllSeals(): Promise<ObjectResponse> {
        try {
            const sealsDir = path.join(__dirname, '../images/seals')

            const seals = fs.readdirSync(sealsDir)

            const rows = seals.map(a => {
                return `http://localhost:3000/images/seals/${a}`
            });

            return { type: 'success', body: rows };
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao consultar selos!' };
        }

    }
}
