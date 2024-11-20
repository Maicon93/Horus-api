import { Pool } from "pg";

export default {
  async getByCourse(conn: Pool, courseId: Number): Promise<Persons[] | []> {
    try {
      const query = await conn.query(`select p.* from teachers t
        inner join persons p on (t.person_id = p.id)
        where t.course_id = ${courseId}`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async insert(conn: Pool, courseId: Number, personId: Number) {
    try {
      const query = `insert into teachers (course_id, person_id) values ('${courseId}', '${personId}')`;

      await conn.query(query)

      return
    } catch (error) {
      throw new Error('Erro ao salvar professor');
    }
  },

  async deleteByCourseId(conn: Pool, id: Number): Promise<Boolean> {
    try {
      await conn.query(`delete from teachers where course_id = ${id}`);
      return true;
    } catch (error) {
      throw new Error('Erro ao deletar professor');
    }
  }
};
