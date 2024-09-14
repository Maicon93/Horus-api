import { Pool } from "pg";

export default {
  async findByEmail(conn: Pool, email: string): Promise<User | null> {
    try {
      const query = await conn.query(`select * from users where email = '${email}' limit 1`);

      return query.rows[0];
    } catch (error) {
      return null
    }
  },

  async create(conn: Pool, user: CreateUser): Promise<boolean> {
    try {

      const query = `insert into users (name, email, password)
          values ('${user.name}', '${user.email}', '${user.hashedPassword}')`

      const resp = await conn.query(query)

      return true
    } catch (error) {
      return false
    }
  }
};
