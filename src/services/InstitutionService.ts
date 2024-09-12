import { Pool } from 'pg';
import { UtilsService } from './UtilsService';
import fs from 'fs';
import path from 'path';


export class InstitutionService {
    async getAllNotices(conn: Pool): Promise<ObjectResponse> {
        try {
            const utilsService = new UtilsService()

            const query = 'select * from notices where highlighted is true';
            const rows = await conn.query(query);

            const notices = rows.rows.map((row: any) => {
                return {
                    ...row,
                    created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
                    image_url: `http://localhost:3000/images/${row.link_image}` // ajusta o link da imagem
                };
            });

            return { type: 'success', body: notices };
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao consultar noticias!' };
        }
    }

    async getAllSeals(conn: Pool): Promise<ObjectResponse> {
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
