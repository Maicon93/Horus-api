import { Pool } from "pg";

export default {
  async getById(conn: Pool, id: Number): Promise<Notices[] | []> {
    try {
      const query = await conn.query(`select n.*, c.name, n.image_name as old_image_name from notices n
        left join courses c on (c.id = n.id_course) where n.id = ${id}`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async getAll(conn: Pool, courseId: number | null): Promise<Notices[] | []> {
    try {
      const where = courseId ? ` where c.id = ${courseId}` : ''
      const query = `select n.*, c.name, n.image_name as old_image_name
          from notices n
          left join courses c on (c.id = n.id_course)
          ${where}
          order by create_at `

      const rows = await conn.query(query);

      return rows.rows;
    } catch (error) {
      return []
    }
  },

  async getHightlighted(conn: Pool): Promise<Notices[] | []> {
    try {
      const query = await conn.query(`select n.*, c.name from notices n
        inner join courses c on (c.id = n.id_course)
        where n.highlighted is true`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async createOrInsert(conn: Pool, data: any) {
    try {
      if (data.id) {
        const imageName = data.imageName ? `image_name = '${data.imageName}',` : ''

        const query = `UPDATE notices SET
            title = '${data.title}',
            text = '${data.text}',
            preview = '${data.preview}',
            id_course = ${data.id_course},
            ${imageName}
            highlighted = ${data.highlighted}
          WHERE id = ${data.id}`;

        return await conn.query(query);
      } else {
        const query = `INSERT INTO notices (title, text, preview, highlighted, id_course, image_name)
          VALUES
            ('${data.title}',
            '${data.text}',
            '${data.preview}',
            ${data.highlighted},
            ${data.id_course},
            '${data.imageName}')
          RETURNING *`;

        return await conn.query(query);
      }
    } catch (error) {
      throw new Error("Erro ao salvar notícia");
    }
  },

  async delete(conn: Pool, id: Number): Promise<Boolean> {
    try {
      await conn.query(`delete from notices where id = ${id}`);

      return true
    } catch (error) {
      throw new Error("Erro ao deletar notícia");
    }
  },
};
