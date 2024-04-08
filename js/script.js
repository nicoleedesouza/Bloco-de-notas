//Principais objetos//
let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let btnCloseModal =  document.querySelector('#btn-close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#close-modal-view");//icone para fechar modal de edição de nota.
//Eventos//

//Adicionar nova anotação//
addNote.addEventListener('click',
(evt)=>{
  evt.preventDefault();
  modal.style.display="block";
  addNote.style.display = "none";
  notes.style.display = "none";
});

//Botão fechar//
btnCloseModal.addEventListener("click",(evt) =>{
  evt.preventDefault();
  modal.style.display="none";
  addNote.style.display = "block";
  notes.style.display = "flex";
})

//Salvar anotação//
btnSaveNote.addEventListener("click", (evt) =>{
  evt.preventDefault();
  data = { 
    id: document.querySelector("#input-id").value,
    title: document.querySelector("#input-title").value,
    content: document.querySelector("#input-content").value
  }
  saveNote(data);

});

btnCloseNote.addEventListener("click", (evt) =>{
  evt.preventDefault();
  modal.style.display="none";
  addNote.style.display = "block";
  notes.style.display = "flex";
  modalView.style.display = 'none';
})

//Funções//
const saveNote = (note) => {
  let notes = loadNotes();
  note.lastTime = new Date().getTime();
    if(note.id.trim().length < 1) {
      note.id = new Date().getTime();
      notes.push(note);
      document.querySelector('#input-id').value = note.id;
    }
    else{
      notes.forEach((item, i) =>{
      if(item.id == note.id){
        notes[i] = note;
      }
    });
    }
  
    console.log(note);
   
    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);

    listNotes();
  };
  
  
  const loadNotes = () => {
    let notes = localStorage.getItem('notes');
    if(!notes) {
      notes = [];
    }
    else{
      notes = JSON.parse(notes);
    }
    return notes;
  }
  
  
  const listNotes = ( ) => {
    notes.innerHTML = '';
      let listNotes = loadNotes();
      listNotes.forEach((note) => {
          let divCard = document.createElement('div');
          divCard.className = 'card';
          divCard.style.width = '25rem';
          let divCardBody = document.createElement('div');
          divCardBody.className = 'card-body';
          divCard.appendChild(divCardBody);
          let h5 = document.createElement('h5');
          h5.innerText = note.title;
          divCardBody.appendChild(h5);
  
  
          notes.appendChild(divCard);
  
  
          let p = document.createElement('p');
          p.innerText = note.content;
          divCardBody.appendChild(p);
  
  
          let plastTime = document.createElement('p')
          plastTime.innerText = "Atualizado em: "+dateFormat(note.lastTime);
          divCardBody.appendChild(plastTime);
  
  
          notes.appendChild(divCard);

          divCard.addEventListener('click', (evt) => {
            showNote(note);

          


          });
      });
    }
     
  
    const showNote = (note) =>{
      document.querySelector('#controls-note').innerHTML = '';
      notes.style.display = 'none';
      addNote.style.display = 'none';
      modalView.style.display = 'block';
      document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
      document.querySelector('#content-note').innerHTML = `<p>${note.content}</p> <p>Última Alteração : ${dateFormat(note.lastTime)}</p>`
      let divEdit = document.createElement("div");
      let iEdit = document.createElement("i");
      iEdit.className = 'bi bi-pen';
      iEdit.style.color = 'rgb(124, 60, 124)';
      divEdit.appendChild(iEdit);
      document.querySelector("#controls-note").appendChild(divEdit);
  
  
      divEdit.addEventListener("click", (evt)=> {
        evt.preventDefault();
        document.querySelector("#input-id").value = note.id;
        document.querySelector("#input-title").value = note.title;
        document.querySelector("#input-content").value = note.content;
        modal.style.display="block";
        addNote.style.display = "none";
        notes.style.display = "none";
        modalView.style.display = 'none';
      })
  
    //Ícone para excluir
    let divDelete = document.createElement("div");
    let iDelete = document.createElement("i");
    iDelete.className = 'bi bi-trash3';
    iDelete.style.color = 'rgb(124, 60, 124)';
    divDelete.appendChild(iDelete);
    document.querySelector("#controls-note").appendChild(divDelete);

    divDelete.addEventListener("click", (evt) => {
      evt.preventDefault();
      deleteNote(note.id);
      modalView.style.display = 'none';
      addNote.style.display = 'block';
      notes.style.display = 'flex';
    });
    const deleteNote = (noteId) => {
      let notes = loadNotes();
      notes = notes.filter(note => note.id !== noteId); // Corrigido aqui, usando '!=='
      notes = JSON.stringify(notes);
      localStorage.setItem('notes', notes);
      listNotes();
    }
    }

  const dateFormat = (timestamp) =>{
  let date = new Date(timestamp); //converte para data
  date = date.toLocaleDateString("pt-BR");
  return date;
  }

  listNotes();