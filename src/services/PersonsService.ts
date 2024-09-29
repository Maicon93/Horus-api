import { Pool } from "pg";
import PersonsRepository from "../repositorys/PersonsRepository";
import TeachesRepository from "../repositorys/TeachesRepository";

export class PersonsService {
  async findAllPersons(conn: Pool): Promise<ObjectResponse> {
    try {
      const rows: Persons[] | null = await PersonsRepository.getAll(conn)

      return { type: 'success', body: rows };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
    }
  }

  async findTeachersByCourse(conn: Pool, courseId: Number): Promise<ObjectResponse> {
    try {
      const rows: Persons[] | null = await TeachesRepository.getByCourse(conn, courseId)

      return { type: 'success', body: rows };
    } catch (error: any) {
      return { type: 'error', msg: 'Erro ao consultar noticias!' };
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