import { UtilsService } from './UtilsService';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import NoticesRepository from '../repositorys/NoticesRepository';
import CoursesRepository from '../repositorys/CoursesRepository';
import PersonsRepository from '../repositorys/PersonsRepository';

export class InstitutionService {
  async findNotice(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      const utilsService = new UtilsService()

      const rows: Notices[] | null = await NoticesRepository.getById(conn, data.id)

      const notices = rows.map((row: Notices) => {
        return {
          ...row,
          created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
          image_url: `http://localhost:3000/images/notices/${row.image_name}`
        };
      });

      return { type: 'success', body: notices };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async NoticeSave(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      await NoticesRepository.createOrInsert(conn, data);

      return { type: 'success', msg: 'Notícia salva com sucesso!' };
    } catch (error: any) {
      console.error(error);
      return { type: 'error', msg: 'Erro ao salvar notícia!' };
    }
  }

  async getAllNotices(conn: Pool, courseId: number | null): Promise<ObjectResponse> {
    try {
      const utilsService = new UtilsService()

      const rows: Notices[] | null = await NoticesRepository.getAll(conn, courseId)

      const notices = rows.map((row: Notices) => {
        return {
          ...row,
          created_date: utilsService.formatDateToDDMMYYYY(row.created_at),
          image_url: `http://localhost:3000/images/notices/${row.image_name}`
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
          image_url: `http://localhost:3000/images/notices/${row.image_name}`
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

  async getAllCourses(conn: Pool): Promise<ObjectResponse> {
    try {
      const rows: Courses[] | null = await CoursesRepository.getAll(conn)

      return { type: 'success', body: rows };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async updateOrCreateCourse(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      const course = await CoursesRepository.createOrInsert(conn, data)
      const resp = { type: 'success', msg: 'salvo com sucesso', body: [] }

      !data.id && (resp.body = course);

      return resp;
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao salvar curso!' };
    }
  }

  async deleteCourse(conn: Pool, id: Number): Promise<ObjectResponse> {
    try {
      await CoursesRepository.delete(conn, id)

      return { type: 'success', msg: 'Curso deletado com sucesso' };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao deletar curso!' };
    }
  }

  async findAllPersons(conn: Pool): Promise<ObjectResponse> {
    try {
      const rows: Persons[] | null = await PersonsRepository.getAll(conn)

      return { type: 'success', body: rows };
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

  async updateOrCreatePerson(conn: Pool, data: any): Promise<ObjectResponse> {
    try {
      const person = await PersonsRepository.createOrInsert(conn, data);
      const resp = { type: 'success', msg: 'Pessoa salva com sucesso', body: [] };

      !data.id && (resp.body = person);

      return resp;
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao salvar pessoa!' };
    }
  }

  async deletePerson(conn: Pool, id: Number): Promise<ObjectResponse> {
    try {
      await PersonsRepository.delete(conn, id);

      return { type: 'success', msg: 'Pessoa deletada com sucesso' };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao deletar pessoa!' };
    }
  }
}
