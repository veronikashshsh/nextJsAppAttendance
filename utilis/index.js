import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

import { sql } from "drizzle-orm";

async function addStudentWithDrizzle(name, age) {
  try {
    await db.execute(
      sql`INSERT INTO students (name, age) VALUES (${name}, ${age})`
    );
    console.log("Student added successfully!");
  } catch (error) {
    console.error("Error adding student:", error);
  }
}


// Створення пулу підключень
const poolConnection = mysql.createPool({
  host: "srv1757.hstgr.io",
  user: "u842076577_buildapp",
  database: "u842076577_buildapp",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  password: 'builddApp23452',
  port: 3306,
  keepAliveInitialDelay: 30000,
  enableKeepAlive: true,
  connectTimeout: 10000, // тайм-аут для з'єднання
});

// Функція для додавання даних
async function addData() {
  const connection = await poolConnection.getConnection();
  try {
    await connection.beginTransaction();

    // Додаємо дані в базу даних
    await connection.query("INSERT INTO students (name, age) VALUES (?, ?)", ['John Doe', 25]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error("Error during transaction:", error);
  } finally {
    connection.release(); // Обов'язково звільняйте з'єднання після завершення
  }
}

// Ініціалізація drizzle з пулом підключень
const db = drizzle(poolConnection);

export { db, addData };
