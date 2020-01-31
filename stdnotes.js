///If users adds a notes, add it to the localstorage
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTittle = document.getElementById("addTittle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        tittle: addTittle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTittle.value = " ";
    addTxt.value = " ";
    // console.log(notesObj);
    showNotes();
})

///function to show elements from localstorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
         <div class="noteCard my-2 mx-2" style="width: 18rem;">
            <div class="card-body">
                <h5 style="color: darkgreen; class="card-title">${index+1,element.tittle}</h5>
                      <p class="card-text">${element.text}</p>
                  <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete</button>
            </div >
        </div > `
    });
    let notesElem = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = ` Please enter your notes! to use "Add a notes" `
    }
}

///Function to delete a note
function deleteNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice("index", 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

///function to search for element
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})
