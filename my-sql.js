// my-sql.js
const config = {
  locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/${filename}`
};

initSqlJs(config).then(SQL => {
  const db = new SQL.Database();

  // Create users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT,
        phone_number TEXT,
        created_at TEXT
    )`);

  // Create settings table
  db.run(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        general_settings TEXT,
        language_settings TEXT,
        other_settings TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

  // Create posts table
  db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        content TEXT,
        created_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

  // Insert sample data
  db.run(`INSERT INTO users (username, email, phone_number, created_at) VALUES 
        ('testuser', 'testuser@gmail.com', '+66928134206', '2024-10-04 16:57')`);
  db.run(`INSERT INTO settings (user_id, general_settings, language_settings, other_settings) VALUES 
        (1, '{"theme": "dark"}', '{"language": "en"}', '{"notification": "enabled"}')`);
  db.run(`INSERT INTO posts (user_id, content, created_at) VALUES 
        (1, 'Hello World!', '2024-10-04 17:00')`);

  // Query data
  const resUsers = db.exec('SELECT * FROM users');
  console.log('Users:', resUsers);

  const resSettings = db.exec('SELECT * FROM settings');
  console.log('Settings:', resSettings);

  const resPosts = db.exec('SELECT * FROM posts');
  console.log('Posts:', resPosts);

  db.close();
});