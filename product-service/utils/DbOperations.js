import { Client } from "pg";

export const singleQueryToDb = async (query, operationName) => {
  const { PG_PORT, PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASS } = process.env;

  const dbOptions = {
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASS,
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000
  };

  const client = new Client(dbOptions);
  
  try {
    await client.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (e) {
    const errorMessage = `error occured when trying to ${operationName}: ${e}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  } finally {
    await client.end();
  }
};
