import Database from "better-sqlite3";

// Open or create DB file
const db = new Database("finabot.db");

// Create the table if not exists

try {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    telegram_id TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    joined_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    telegram_id TEXT UNIQUE NOT NULL,
    type TEXT CHECK(type IN('income', 'expense')) NOT NULL,
    amount INTEGER,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )
`);
  console.log("table is created or already exists!");
} catch (error) {
  console.error("failed to create", error);
}

const addUser = db.prepare(`
    INSERT INTO users(telegram_id, username) 
    VALUES(?, ?)
  `);

const newUser = [
  ["001", "tarayavanets"],
  ["002", "patriarch_opel"],
  ["003", "point_coffee"],
  ["004", "moklet_telkom"],
];

for (const [telegram_id, username] of newUser) {
  try {
    addUser.run(telegram_id, username),
      console.log("id and username are successfully added!");
  } catch (error) {
    console.error("adding unsuccessful", error.message);
  }
}

// console.log("inserted last time out", returnResult.lastInsertRowid);
// Show list of tables
const users = db.prepare(`SELECT * FROM users`).all();

const transactions = db.prepare(`SELECT * FROM transactions`).all();

console.table(users);
console.log(transactions);

db.close();
