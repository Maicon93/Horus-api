import { Pool } from "pg";

export default {
  async getAll(conn: Pool): Promise<Courses[] | []> {
    try {
      const query = await conn.query(`select c.*, p.name as name_coordinator from courses c
        inner join persons p on (p.id = c.id_coordinator)`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async createOrInsert(conn: Pool, data: any) {
    try {
      if (data.id) {
        const query = `update courses set
            name = '${data.name}',
            id_coordinator = ${data.id_coordinator}
          where id = ${data.id}`
        return await conn.query(query)
      } else {
        const query = `insert into courses (name, id_coordinator)
          values('${data.name}', ${data.id_coordinator})
          returning *`;

        const rows = await conn.query(query)
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
