// my-sql.js
// Include the sql.js library
import initSqlJs from 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/sql-wasm.js';

const config = {
    locateFile: filename => `https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/${filename}`
};

initSqlJs(config).then(SQL => {
    const db = new SQL.Database();

    // Mock login function - replace with actual login logic
    function getLoggedInUser() {
        return { id: 1, username: 'testuser', email: 'testuser@gmail.com', phone_number: '+66912345678', created_at: '2024-01-01T00:00:00Z', status: 'active' }; // Replace with actual user data
    }

    const user = getLoggedInUser();

    if (!user) {
        alert('Please log in to create a post.');
        document.getElementById('post-form').style.display = 'none';
        return;
    }

    // Generate a random post ID
    function generateRandomId() {
        return Math.floor(Math.random() * 1000000);
    }

    // Create tables if not exists
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT,
        phone_number TEXT,
        created_at TEXT,
        status TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        general_settings TEXT,
        language_settings TEXT,
        other_settings TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        tags TEXT,
        created_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        post_id INTEGER,
        user_id INTEGER,
        content TEXT,
        created_at TEXT,
        FOREIGN KEY (post_id) REFERENCES posts(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    document.getElementById('post-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = quill.root.innerHTML; // Get HTML content from Quill editor
        const tags = document.getElementById('tags').value;
        const createdAt = new Date().toISOString();
        const postId = generateRandomId();
        const userId = user.id;

        // Validate form data
        if (!title || !content || !tags) {
            alert('Please fill all required fields.');
            return;
        }

        // Insert data into the database
        db.run(`INSERT INTO posts (id, user_id, title, content, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
            [postId, userId, title, content, tags, createdAt]);

        const result = db.exec("SELECT changes() as changes")[0];
        if (result && result.values && result.values[0][0] > 0) {
            alert('Post created successfully!');
        } else {
            alert('Failed to create post. Please try again.');
        }

        document.getElementById('post-form').reset();
        quill.setText(''); // Clear Quill editor
    });
});