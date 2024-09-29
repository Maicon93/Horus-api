import fs from 'fs';
import path from 'path';

export class InstitutionService {

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
