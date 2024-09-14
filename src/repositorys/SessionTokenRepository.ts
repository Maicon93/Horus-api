import { Pool } from "pg";

export default {
  async insert(conn: Pool, user: any): Promise<void> {
    try {
      await this.deleteByUser(conn, user.id)

      const query = (`insert into session_tokens (
          user_id, token, validate
        ) values (
          ${user.id}, '${user.sessionHash}', NOW() + INTERVAL '1 hour'
        )`
      )
      await conn.query(query);
      return
    } catch (error) {
      return
    }
  },

  async deleteByUser(conn: Pool, userId: Number): Promise<void> {
    try {
      const query = (`delete from session_tokens where user_id = ${userId}`)
      await conn.query(query);
      return
    } catch (error) {
      return
    }
  }
};
