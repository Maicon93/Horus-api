import { Pool } from "pg";

export default {
  async getAll(conn: Pool): Promise<Notices[] | []> {
    try {
      const query = await conn.query('select * from notices where highlighted is true');

      return query.rows;
    } catch (error) {
      return []
    }
  },
};
