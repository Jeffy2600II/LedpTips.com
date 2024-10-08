// Initialize Quill editor
var quill = new Quill('#editor-container', {
  theme: 'snow',
  modules: {
    toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['clean'],
            ['emoji']
        ]
  },
  placeholder: 'Compose your epic here...'
});

// Remove placeholder text when typing starts
quill.on('text-change', function(delta, oldDelta, source) {
  if (source === 'user' && quill.getText().trim() !== '') {
    quill.root.classList.remove('ql-blank');
  }
});

document.getElementById('post-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const content = quill.root.innerHTML;
  const tags = document.getElementById('tags').value;

  function getLoggedInUser() {
    return { id: 1, username: 'testuser' };
  }

  const user = getLoggedInUser();

  if (!user) {
    alert('Please log in to create a post.');
    return;
  }

  const userId = user.id;
  const createdAt = new Date().toISOString();
  const postId = generateRandomId();

  if (!title || !content || !tags) {
    alert('Please fill all required fields.');
    return;
  }

  const db = new SQL.Database();
  db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        title TEXT,
        content TEXT,
        tags TEXT,
        created_at TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

  db.run(`INSERT INTO posts (id, user_id, title, content, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [postId, userId, title, content, tags, createdAt]);

  const result = db.exec("SELECT changes() as changes")[0];
  if (result && result.values && result.values[0][0] > 0) {
    alert('Post created successfully!');
  } else {
    alert('Failed to create post. Please try again.');
  }

  document.getElementById('post-form').reset();
  quill.setText('');
});

function generateRandomId() {
  return Math.floor(Math.random() * 1000000);
}