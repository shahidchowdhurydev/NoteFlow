const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const saveBtn = document.getElementById("saveBtn");
const notesGrid = document.getElementById("notesGrid");

let notes = JSON.parse(localStorage.getItem("noteflow-notes")) || [];
let editIndex = null;

const noteColors = [
  "note1",
  "note2",
  "note3",
  "note4",
  "note5",
  "note6",
];

function saveToLocalStorage() {
  localStorage.setItem("noteflow-notes", JSON.stringify(notes));
}

function renderNotes() {
  notesGrid.innerHTML = "";

  if (notes.length === 0) {
    notesGrid.innerHTML = `
      <p class="empty-text">No notes yet. Start writing your ideas ✨</p>
    `;
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement("div");

    const colorClass = noteColors[index % noteColors.length];

    card.className = `note-card ${colorClass}`;

    card.innerHTML = `
      <h3>${note.title || "Untitled Note"}</h3>
      <p>${note.text}</p>

      <div class="card-actions">
        <button onclick="editNote(${index})">
          <i class="fa-solid fa-pen"></i>
        </button>

        <button onclick="deleteNote(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `;

    notesGrid.appendChild(card);
  });
}

function addOrUpdateNote() {
  const title = noteTitle.value.trim();
  const text = noteText.value.trim();

  if (title === "" && text === "") {
    return;
  }

  const noteData = {
    title,
    text,
  };

  if (editIndex === null) {
    notes.unshift(noteData);
  } else {
    notes[editIndex] = noteData;
    editIndex = null;
    saveBtn.innerHTML = `
      <i class="fa-solid fa-plus"></i>
      Save Note
    `;
  }

  saveToLocalStorage();
  renderNotes();

  noteTitle.value = "";
  noteText.value = "";
}

function editNote(index) {
  const note = notes[index];

  noteTitle.value = note.title;
  noteText.value = note.text;

  editIndex = index;

  saveBtn.innerHTML = `
    <i class="fa-solid fa-floppy-disk"></i>
    Update Note
  `;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveToLocalStorage();
  renderNotes();
}

saveBtn.addEventListener("click", addOrUpdateNote);

renderNotes();