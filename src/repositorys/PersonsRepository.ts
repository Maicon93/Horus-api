import { Pool } from "pg";

export default {
  async getAll(conn: Pool): Promise<Persons[] | []> {
    try {
      const query = await conn.query(`select * from persons`);

      return query.rows;
    } catch (error) {
      return []
    }
  },

  async createOrInsert(conn: Pool, data: any) {
    try {
      if (data.id) {
        const query = `update persons set
            name = '${data.name}',
            email = '${data.email}'
          where id = '${data.id}'`;
        await conn.query(query);

      } else {

        const query = `insert into persons (name, email)
          values ('${data.name}', '${data.email}')
          returning *`;
        const rows = await conn.query(query);
        return rows.rows[0];
      }
    } catch (error) {
      throw new Error('Erro ao salvar pessoa');
    }
  },

  async delete(conn: Pool, id: Number): Promise<Boolean> {
    try {
      await conn.query(`delete from persons where id = ${id}`);
      return true;
    } catch (error) {
      throw new Error('Erro ao deletar pessoa');
    }
  }
};
