import { UtilsService } from './UtilsService';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import NoticesRepository from '../repositorys/NoticesRepository';

export class InstitutionService {
    async getAllNotices(conn: Pool): Promise<ObjectResponse> {
        try {
            const utilsService = new UtilsService()

            const rows: Notices[] | null = await NoticesRepository.getAll(conn)

            const notices = rows.map((row: Notices) => {
                return {
                    ...row,
                    created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
                    image_url: `http://localhost:3000/images/${row.link_image}`
                };
            });

            return { type: 'success', body: notices };
        } catch (error: any) {
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
