const url = "http://localhost:3000/notes";
// grab the value from the input

// send it to the server by POST to create a new note
const form = document.getElementById('note-form')
const notesList = document.getElementById('notes-list')

function listNotes() {
 fetch(url)
 .then((res) => res.json())
 .then((data) => {
  for (let noteObj of data) {
   renderNoteItem(noteObj)
  }
 })
};

form.addEventListener('submit', (event) => {
event.preventDefault()
const noteText = document.querySelector('#note-text').value
fetch(url, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
    item: noteText,
 }),
})
  .then((res) => res.json())
  .then((data) => {
   renderNoteItem(data)
  })
});

function renderNoteItem(noteObj) {
 const itemEl = document.createElement('p')
 itemEl.id = noteObj.id
 itemEl.classList.add(
  'title',
  'body'
 )
 itemEl.innerHTML = `<div>${noteObj.item}<br>${noteObj.body}</div>`
 notesList.appendChild(itemEl)
 }
 listNotes()