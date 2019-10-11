const toDoForm = document.querySelector(".js-toDoForm"),
 toDoInput = toDoForm.querySelector("input"),
 toDoList = document.querySelector(".js-toDoList");

 const TODOS_LS = "toDos";

 let toDos = [];

 function deleteToDo(event) {
     const btn = event.target;
     const li = btn.parentNode;
     toDoList.removeChild(li);
     const cleanToDos = toDos.filter(function(toDO) {
         return toDoList.id !== parseInt(li.id);
     });
     toDos = cleanToDos;
     saveToDos(); 
 }

 function saveToDos() {
     localStorage.setItme(TODOS_LS, JOSN.stringify(toDos));
 }

 function paintToDo(text) {
     const li = document.createElement("li");
     const delBtn = document.createElement("button");
     const span = document.createElement("span");
     const newId = toDos.length + 1;
     delBtn.innerText = "X";
     delBtn.addEventListener("click", deleteToDo);
     span.innerText = text;
     li.appendChild(delBtn);
     li.appendChild(span);
     li.id = newId;
     toDoList.appendChild(li);
     const toDoObject = {
         text: text,
         id: newId
     };
     toDos.push(toDoObject);
     saveToDos();
 }

 function handleSubmit(event) {
     event.preventDefault();
     const currentValue = toDoInput.value;
     paintToDo(currentValue);
     toDoInput.value = "";
 }

 function loadToDos() {
     const loadedToDos = localStorage.getItem(TODOS_LS);
     if (loadedToDos !== null) {
         const parsedToDos = JSON.parse(loadedToDos);
         parsedToDos.forEach(function(toDO) {
             paintToDo(toDo.text);
         });
     }
 }

 function init() {
     loadToDos();
     toDoForm.addEventListener("submit", handleSubmit);
 }

 init();