const config = {
  locateFile: filename => `https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/${filename}`
};

initSqlJs(config).then(SQL => {
  const db = new SQL.Database();

  // Mock login function - replace with actual login logic
  function getLoggedInUser() {
    return { id: 1, username: 'testuser' }; // Replace with actual user data
  }

  // Generate a random post ID
  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  const user = getLoggedInUser();

  if (!user) {
    alert('Please log in to create a post.');
    document.getElementById('post-form').style.display = 'none';
    return;
  }

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
                ['clean']
            ]
    }
  });

  document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const userId = user.id;
    const content = quill.root.innerHTML; // Get HTML content from Quill editor
    const tags = document.getElementById('tags').value;
    const createdAt = new Date().toISOString();
    const postId = generateRandomId();

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