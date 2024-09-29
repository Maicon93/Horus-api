import { Pool } from "pg";
import CoursesRepository from "../repositorys/CoursesRepository";
import TeachesRepository from "../repositorys/TeachesRepository";

export class CourseService {

    async getAllCourses(conn: Pool): Promise<ObjectResponse> {
        try {
            const rows: Courses[] | null = await CoursesRepository.getAll(conn)

            return { type: 'success', body: rows };
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao consultar noticias!' };
        }
    }

    async findCourseById(conn: Pool, courseId: Number): Promise<ObjectResponse> {
        try {
            const rows: Courses[] | null = await CoursesRepository.getById(conn, courseId)

            return { type: 'success', body: rows };
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao consultar noticias!' };
        }
    }

    async updateOrCreateCourse(conn: Pool, data: any): Promise<ObjectResponse> {
        try {
            const course = await CoursesRepository.createOrInsert(conn, data)

            await TeachesRepository.deleteByCourseId(conn, course.id)

            data.teachers.forEach(async (a: Number) => {
                await TeachesRepository.insert(conn, course.id, a)
            });

            const resp = { type: 'success', msg: 'salvo com sucesso', body: [] }
            !data.id && (resp.body = course);

            return resp;
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao salvar curso!' };
        }
    }

    async deleteCourse(conn: Pool, id: Number): Promise<ObjectResponse> {
        try {
            await TeachesRepository.deleteByCourseId(conn, id)
            await CoursesRepository.delete(conn, id)

            return { type: 'success', msg: 'Curso deletado com sucesso' };
        } catch (error: any) {
            return { type: 'error', msg: 'Erro ao deletar curso!' };
        }
    }
}