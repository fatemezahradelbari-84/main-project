import mysql from "mysql2/promise";

export const connectMySql = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB
    });

    console.log("MySQL Connected Successfully");

    return connection;
  } catch (err) {
    console.error("MySQL connection failed:", err);
    process.exit(1);
  }
};
