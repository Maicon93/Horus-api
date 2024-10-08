import { Pool } from "pg";

export default {
  async getAll(conn: Pool): Promise<Courses[] | []> {
    try {
      const query = await conn.query(`select c.*, p.name as name_coordinator from courses c
        inner join persons p on (p.id = c.id_coordinator)
        order by c.name desc`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async getById(conn: Pool, id: Number): Promise<Courses[] | []> {
    try {
      const query = await conn.query(`select
          c.*,
          p.name as name_coordinator,
          p.image_name,
          (
            select json_agg(p2.name)
            from persons p2
            inner join teachers t on t.person_id = p2.id
            where t.course_id = c.id
          ) as teachers
        from courses c
        inner join persons p on p.id = c.id_coordinator
        where c.id = ${id}
        order by c.name desc`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async createOrInsert(conn: Pool, data: any) {
    try {
      if (data.id) {
        const pdfCurriculum = data.teachingCurriculumName

        const teachingCurriculum = pdfCurriculum ? `teaching_curriculum = '${pdfCurriculum}',` : ''

        const query = `
          UPDATE courses SET
            name = '${data.name}',
            id_coordinator = ${data.id_coordinator},
            description = '${data.description}',
            actuation_area = '${data.actuation_area}',
            ${teachingCurriculum}
            type = '${data.type}',  -- Campo course_type
            duration = ${data.duration}  -- Campo duration
          WHERE id = ${data.id}
          RETURNING *;`;

        const rows = await conn.query(query);
        return rows.rows[0];
      } else {
        const query = `
          INSERT INTO courses (name, id_coordinator, description, actuation_area, type, duration, teaching_curriculum)
          VALUES (
            '${data.name}',
            ${data.id_coordinator},
            '${data.description}',
            '${data.actuation_area}',
            '${data.type}',
            ${data.duration},
            '${data.teachingCurriculumName || null}'
          )
          RETURNING *;`;

        const rows = await conn.query(query);
        return rows.rows[0];
      }
    } catch (error) {
      throw new Error("Erro ao salvar curso");
    }
  },

  async delete(conn: Pool, id: Number): Promise<Boolean> {
    try {
      await conn.query(`delete from courses where id = ${id}`);

      return true
    } catch (error) {
      throw new Error("Erro ao deletar curso");
    }
  },
};
