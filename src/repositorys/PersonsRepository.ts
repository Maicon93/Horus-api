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
    if (data.id) {
      const updates = [];

      data.name && (updates.push(`name = '${data.name}'`));

      data.email ? updates.push(`email = '${data.email}'`) : updates.push(`email = null`);

      if (data.imageName) {
        updates.push(`image_name = '${data.imageName}'`);
      }

      const query = updates.length > 0 ? `UPDATE persons SET ${updates.join(', ')} WHERE id = ${data.id}` : null;

      if (query) {
        const rows = await conn.query(query);
        return rows.rows[0];
      }

      return null

    } else {
      const fields = ['name'];
      const values = [`'${data.name}'`];

      if (data.email) {
        fields.push('email');
        values.push(`'${data.email}'`);
      }

      if (data.imageName) {
        fields.push('image_name');
        values.push(`'${data.imageName}'`);
      }

      const query = `INSERT INTO persons (${fields.join(', ')}) VALUES (${values.join(', ')}) returning *`;

      const rows = await conn.query(query);
      return rows.rows[0];
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
