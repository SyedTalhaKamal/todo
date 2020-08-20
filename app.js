var list = document.getElementById("list");
firebase.database().ref('todos').on('child_added', function (data) {
    var li = document.createElement('li');
    li.setAttribute("class", "taskItems");
    var litext = document.createTextNode(data.val().value);
    li.appendChild(litext);



    var delBtn = document.createElement('button');
    var delBtnText = document.createTextNode('Delete');
    delBtn.setAttribute("class", "todoItems");
    delBtn.setAttribute("class", "delbutton");
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteTask(this)");
    delBtn.appendChild(delBtnText);
    li.appendChild(delBtn);


    var editBtn = document.createElement('button');
    var editBtnText = document.createTextNode('Edit');
    editBtn.setAttribute("onclick", "editTask(this)");
    editBtn.setAttribute("class", "editbutton");
    editBtn.setAttribute("id", data.val().key);
    editBtn.appendChild(editBtnText);
    li.appendChild(editBtn);


    list.appendChild(li);
})
function addItem() {
    var task = document.getElementById('task');
    var database = firebase.database().ref('todos')
    var key = database.push().key;
    var todo = {
        value: task.value,
        key: key
    }
    database.child(key).set(todo)

    task.value = "";
}

function deleteTask(e) {
    firebase.database().ref('todos').child(e.id).remove()
    e.parentNode.remove();

}
function editTask(e) {

    var val = prompt("Enter Updated Task", e.parentNode.firstChild.nodeValue);
    var updatedTask = {
        value: val,
        key: e.id
    }
    firebase.database().ref('todos').child(e.id).set(updatedTask)
    e.parentNode.firstChild.nodeValue = val;
}
function delAll() {
    firebase.database().ref('todos').remove()
    list.innerHTML = "";
}
