import { Pool } from "pg";
import NoticesRepository from "../repositorys/NoticesRepository";
import { UtilsService } from "./UtilsService";

export class NoticesService {
  async getAllNotices(conn: Pool, courseId: number | null): Promise<ObjectResponse> {
    try {
      const utilsService = new UtilsService()

      const rows: Notices[] | null = await NoticesRepository.getAll(conn, courseId)

      const notices = rows.map((row: Notices) => {
        return {
          ...row,
          created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
          image_url: `http://localhost:3000/assets/notices/${row.image_name}`
        };
      });

      return { type: 'success', body: notices };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async getNoticesHighlighted(conn: Pool): Promise<ObjectResponse> {
    try {
      const utilsService = new UtilsService()

      const rows: Notices[] | null = await NoticesRepository.getHightlighted(conn)

      const notices = rows.map((row: Notices) => {
        return {
          ...row,
          created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
          image_url: `${process.env.URL_LOCAL}/images/notices/${row.image_name}`
        };
      });

      return { type: 'success', body: notices };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async noticeSave(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      await NoticesRepository.createOrInsert(conn, data);

      return { type: 'success', msg: 'Notícia salva com sucesso!' };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao salvar notícia!' };
    }
  }

  async findNotice(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      const utilsService = new UtilsService()

      const rows: Notices[] | null = await NoticesRepository.getById(conn, data.id)

      const notices = rows.map((row: Notices) => {
        return {
          ...row,
          created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
          image_url: `${process.env.URL_LOCAL}/assets/notices/${row.image_name}`
        };
      });

      return { type: 'success', body: notices };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async noticeDelete(conn: Pool, id: Number): Promise<ObjectResponse> {
    try {
      await NoticesRepository.delete(conn, id)

      return { type: 'success', msg: 'Curso deletado com sucesso' };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao deletar curso!' };
    }
  }

}