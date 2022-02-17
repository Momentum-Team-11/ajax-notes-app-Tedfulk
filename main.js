const url = "http://localhost:3000/notes";
// grab the value from the input

// send it to the server by POST to create a new note
const form = document.getElementById('note-form')
const notesList = document.getElementById('notes-list')
let currentTime 

function listNotes() {
  document.getElementById('notes-list').innerHTML = ''
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
const title = document.querySelector('#title').value
currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: title,
    text: noteText,
    created_at: currentTime,
  })
})
  .then((res) => res.json())
  .then((data) => {
    renderNoteItem(data)
  })
  form.reset()
});

function renderNoteItem(noteObj) {
  const itemEl = document.createElement('p')
  itemEl.id = noteObj.id
  itemEl.innerHTML = `<div class="dib w-12">${noteObj.title}</div><br>
  <span class="dib w-12">${noteObj.text}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i><br><p>${noteObj.created_at}</p>`
  notesList.appendChild(itemEl)
  }
  
  
  
  listNotes()
  
  notesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete')) {
    deleteNote(event.target)
  }
  if (event.target.classList.contains('edit')) {
    editNote(event.target)
  }
  if (event.target.classList.contains('cancel')) {
    clearInputs(event.target)
  }
  if (event.target.classList.contains('save')) {
    updateNote(event.target)
  }
  })

  function deleteNote(element) {
    const noteId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${noteId}`, {
      method: 'DELETE',
    })
    .then(function () {
    element.parentElement.remove()
    })
  }
  
  function editNote(element) {
  showEditInput(element.parentElement)
  }
  
  function showEditInput(noteItem) {
    const editId = noteItem.id
    fetch(`http://localhost:3000/notes/${editId}`)
    .then((res) => res.json())
    .then((data) => {
  noteItem.innerHTML = `<div id="${data.id}">
  <input id="editTitle" class="edit-text input-reset ba b--black-20 pa2 mb2 w-60" type="text" value="${data.title}">
  <input id="editText" class="edit-text input-reset ba b--black-20 pa2 mb2 w-60" type="text" value="${data.text}">
  <button class='save bn f6 link br1 ph2 pv1 ml1 dib white bg-green' data-note=${noteItem.id}>save</button>
  <button class='cancel bn f6 link br1 ph2 pv1 ml2 dib black bg-light-gray'>cancel</button>
  </div>`
  })
}

  function clearInputs(element) {
    const cancelId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${cancelId}`)
    .then((res) => res.json())
    .then((data) => {
      element.parentElement.innerHTML = 
      `<div class="dib w-10">${data.title}</div><br>
    <span class="dib w-12">${data.text}</span><i class="ml2 dark-red fas fa-times delete"></i><i class="ml3 fas fa-edit edit"></i><br><p>${data.created_at}</p>`
    })
  }


function updateNote(element) {
const saveId = element.parentElement.id
const noteText = document.querySelector('#editText').value
const title = document.querySelector('#editTitle').value
updatedTime = moment().format('MMMM Do YYYY, h:mm:ss a')
fetch(url+ "/" + saveId, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: title,
    text: noteText,
    created_at: updatedTime,
  })
})
  .then((res) => res.json())
  .then((data) => {
    element.parentElement.innerHTML = ''
    renderNoteItem(data)
  })
}