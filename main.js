var input = document.getElementById("input-text");
var outputs = document.getElementById("outputs");
var outarr = [];
var isEditing = -1;
var fontarr = ['bangers', 'diploma', 'libre', 'neucha', 'orbitron', 'pacifico', 'patrick', 'poiret', 'square', 'tapestry', 'water'];
var imgarr = ['circle.jpeg', 'neon.jpeg', 'neon2.webp', 'paint.webp', 'colors.jpeg'];

function setRandomBg(){
    var ran = Math.floor(Math.random() * imgarr.length);
    var body = document.querySelector('body');
    body.style.backgroundImage = 'url('+imgarr[ran]+')';
}
setRandomBg();

function getRandomFont(){
    var ran = Math.floor(Math.random() * fontarr.length);
    return fontarr[ran];
}

function saveInput(){
    var inputVal = input.value;

    if(inputVal == ""){
        return;
    }

    var output = document.createElement("div");
    var edit = document.createElement("button");
    edit.innerHTML = "Edit";
    var a = outarr.length;
    edit.onclick = function (){ edito(a); };
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function (){ deleteOutput(a); };;
    var text = document.createElement("div");
    text.innerHTML = inputVal;

    text.classList.add(getRandomFont());

    output.appendChild(edit);
    output.appendChild(deleteButton);
    output.appendChild(text);

    outputs.appendChild(output);

    output.classList.add("output");
    outarr.push(inputVal);

    input.value = "";

    save();
}

function edito(index){
    if(isEditing >= 0) return;
    isEditing = index;
    var toEdit = document.getElementsByClassName("output")[index-1];
    var editInput = document.createElement("input");
    editInput.id = "editing";
    editInput.value = toEdit.lastChild.innerHTML;
    toEdit.removeChild(toEdit.lastChild);
    toEdit.appendChild(editInput);
    editInput.addEventListener("keyup", editFin);
}
function editFin(event){
    if(event.keyCode == 13){
        var editInput = document.getElementById("editing");
        var textDiv = document.createElement("div");
        textDiv.innerHTML = editInput.value;
        textDiv.classList.add(getRandomFont());
        outarr[isEditing] = editInput.value;
        var toEdit = document.getElementsByClassName("output")[isEditing-1];
        toEdit.removeChild(toEdit.lastChild);
        toEdit.appendChild(textDiv);
        save();
        isEditing = -1;
    }
}

function deleteOutput(index){
    console.log(index);
    outarr.splice(index, 1);
    reload();

    save();
}

function enter(event){
    if(event.keyCode == 13){
        saveInput();
    }
}

function reload(){
    outputs.innerHTML = "";


    for(var i = 0; i < outarr.length; i++){
        if(outarr[i].length < 1) continue;
        var output = document.createElement("div");
        var edit = document.createElement("button");
        edit.innerHTML = "Edit";
        const a = i;
        edit.onclick = function (){ edito(a); };
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.onclick = function (){ deleteOutput(a); };;
        var text = document.createElement("div");
        text.innerHTML = outarr[i];

        text.classList.add(getRandomFont());

        output.appendChild(edit);
        output.appendChild(deleteButton);
        output.appendChild(text);

        outputs.appendChild(output);

        output.classList.add("output");
    }

    
}

function save(){
    localStorage.setItem("outarr", outarr);
}

function load(){
    outarr = localStorage.getItem("outarr", outarr).split(",");
    reload();
}

input.addEventListener("keyup", enter );


localStorage.setItem("key", 100);


load();