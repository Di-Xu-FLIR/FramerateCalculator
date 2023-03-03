import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "10.195.100.158",
    database: "frame_rate_calculator",
    password: "password",
    port: 5000,
});

export const getDatabaseTable = async () => {
    const result = await pool.query(`SELECT * FROM adc_enum`);
    const data = [];
    for (const row of result.rows) {
        const tableName = row.table_name;
        const tableResult = await pool.query(`SELECT * FROM ${tableName}`);
        data.push(...tableResult.rows);
        console.log("data:", data); // log the data to the console
    }
    pool.end();
    return data;
};

export const testConnection = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query("SELECT $1::text as message", ["Hello world!"]);
        console.log(result.rows[0].message);
    } catch (error) {
        console.error(error);
    } finally {
        client.release();
        pool.end();
    }
};
