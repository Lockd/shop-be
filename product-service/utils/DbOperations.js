import { Client } from 'pg';

const { PG_PORT, PG_HOST, PG_DATABASE, PG_USERNAME, PG_PASS } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASS,
  ssl: {
    rejectUnathorized: false,
  },
  connectTimeoutMillis: 5000,
};

export const singleQueryToDb = async (query, operationName) => {
  const client = new Client(dbOptions);
  try {
    await client.connect();
    const res = await client.query(query);
    return res.rows;
  } catch (e) {
    console.error(`error occured when trying to ${operationName}`, e);
  } finally {
    await client.end();
  }
}
