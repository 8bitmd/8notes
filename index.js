const newNoteBtn = document.getElementById('new-note');
const newNoteModal = document.getElementById('new-note-modal');
const newNoteForm = document.getElementById('new-note-form');
const closeModal = document.getElementById('close-modal');
const notes = document.getElementById('notes');

let allNotes = [];

function saveNotesToStorage(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotesFromStorage() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function renderNote(note) {
    const div = document.createElement('div');
    div.classList.add('note');
    div.dataset.id = note.id;

    const deleteNoteBtn = document.createElement('button');
    deleteNoteBtn.innerHTML = ("<span class=\"material-symbols-outlined\">delete</span>");
    deleteNoteBtn.classList.add('delete-note');

    deleteNoteBtn.addEventListener('click', e => {
        deleteNote(e, div);
    });

    const noteTitle = document.createElement('h1');
    noteTitle.innerText = note.title;
    const noteBody = document.createElement('p');
    noteBody.innerText = note.body;

    div.appendChild(deleteNoteBtn);
    div.appendChild(noteTitle);
    div.appendChild(noteBody);
    notes.appendChild(div);
}

window.onload = () => {
    allNotes = getNotesFromStorage();
    allNotes.forEach(renderNote);
};

newNoteForm.addEventListener('submit', e => {
    e.preventDefault();

    const noteId = Date.now().toString();
    const newNoteTitle = document.getElementById('new-note-title').value;
    const newNoteBody = document.getElementById('new-note-body').value;

    if (newNoteTitle && newNoteBody !== null) {
        const newNote = {
            id: noteId,
            title: newNoteTitle,
            body: newNoteBody,
        };

        allNotes.push(newNote);
        saveNotesToStorage(allNotes);
        renderNote(newNote);

        newNoteModal.classList.add("hidden");
        newNoteForm.reset();
    } else {
        alert("One or more fields are empty.");
    }
});

function deleteNote(e, div) {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this note?')) {
        const noteId = div.dataset.id;
        allNotes = allNotes.filter(note => note.id !== noteId);
        saveNotesToStorage(allNotes);
        div.remove();
    }
}

newNoteBtn.addEventListener('click', () => {
    newNoteModal.classList.remove("hidden");
});

closeModal.addEventListener('click', () => {
    newNoteModal.classList.add("hidden");
});
