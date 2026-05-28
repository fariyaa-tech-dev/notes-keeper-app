let notes = JSON.parse(localStorage.getItem("notes")) || [];

/* LOGIN */
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("user", user);
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");
    displayNotes();
  } else {
    alert("Enter login details");
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("user");
  location.reload();
}

/* ADD NOTE */
function addNote() {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteContent").value;

  if (!title || !content) {
    alert("Fill all fields!");
    return;
  }

  notes.push({
    id: Date.now(),
    title,
    content
  });

  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";

  saveNotes();
}

/* SAVE */
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

/* DISPLAY */
function displayNotes(filtered = notes) {
  const container = document.getElementById("notesContainer");
  container.innerHTML = "";

  filtered.forEach(note => {
    const div = document.createElement("div");
    div.className = "note";

    div.innerHTML = `
      <h4 contenteditable="true" onblur="editNote(${note.id}, this.innerText, 'title')">${note.title}</h4>
      <p contenteditable="true" onblur="editNote(${note.id}, this.innerText, 'content')">${note.content}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

/* EDIT */
function editNote(id, value, field) {
  notes = notes.map(note =>
    note.id === id ? { ...note, [field]: value } : note
  );
  saveNotes();
}

/* DELETE */
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
}

/* SEARCH */
function searchNotes() {
  const keyword = document.getElementById("search").value.toLowerCase();

  const filtered = notes.filter(note =>
    note.title.toLowerCase().includes(keyword) ||
    note.content.toLowerCase().includes(keyword)
  );

  displayNotes(filtered);
}

/* AUTO LOGIN */
window.onload = () => {
  if (localStorage.getItem("user")) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("appPage").classList.remove("hidden");
    displayNotes();
  }
};