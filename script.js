//buttons
// showData();

//load event
document.addEventListener('DOMcontentloaded',getlocalstore);
getlocalstore();
// var storageArr = [];
let arr = [];
var selectedRow = null;

//sort
// function sortTable() {
//     var table, rows, switching, i, x, y, shouldSwitch;
//     table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
//     switching = true;
//     while (switching) {
//       switching = false;
//       for (i = 1; i < tr.length; i++) {
//         shouldSwitch = false;
//         x = rows[i].getElementsById("td")[4];
//         y = rows[i + 1].getElementsById("td")[4];
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       }
//       if (shouldSwitch) {
//         tr[i].parentNode.insertBefore(tr[i + 1], tr[i]);
//         switching = true;
//       }
//     }
// }

//submit
function onFormSubmit(){
    var formData = readFormData();
    if(document.getElementById("addBtn").value == 'Update'){
        document.getElementById("addBtn").value = 'Add';
        document.getElementById("headingData").innerHTML = 'Add new student';
        document.getElementById("addBtn").style.background = "#4CAF50";
    }
    if(selectedRow == null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    saveLocal(formData);
    resetForm();
    // sortTable();
}

function readFormData(){
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["uid"] = document.getElementById("uid").value;
    formData["department"] = document.getElementById("department").value;
    if(document.getElementById("addBtn").value == 'Add'){
        arr.push(formData['uid']);
    }
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = arr.length;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.fullName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.uid;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.department;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="onEdit(this)"><i class="far fa-edit fa-2x"></i></a>
    <a onClick="onDelete(this)"><i class="fas fa-trash fa-2x"></i></a>`;
}

function resetForm(){
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";  
    document.getElementById("uid").value = "";
    document.getElementById("department").value = "IT";
    selectedRow = null;
}

//update
function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("uid").value = selectedRow.cells[3].innerHTML;
    document.getElementById("department").value = selectedRow.cells[4].innerHTML;
    document.getElementById("addBtn").value = 'Update';
    document.getElementById("headingData").innerHTML = 'Update student';
    document.getElementById("addBtn").style.background = "#6699CC";
}

function updateRecord(formData){
    selectedRow.cells[1].innerHTML = formData.fullName;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.uid;
    selectedRow.cells[4].innerHTML = formData.department;
}

function onDelete(td){
    if(confirm('Are you sure you want to delete this record?')){
        row = td.parentElement.parentElement;
        document.getElementById('studentList').deleteRow(row.rowIndex);
    }
    resetForm();
    arr.pop();
}


//search
function search(){
    let filter = document.getElementById('search').value;
    var studentTable = document.getElementById('studentList');
    let tr = studentTable.getElementsByTagName('tr');

    for(let i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName('td')[3];
        if(td){
            let idvalue = td.textContent || td.innerHTML;
            if(idvalue.indexOf(filter) > -1){
                tr[i].style.display = "";
            }else{
                tr[i].style.display = "none";
            }
        }
    }
}

var storageArr=[];

function saveLocal(formData){
    storageArr = JSON.parse(localStorage.getItem('savedData')) || [];
    storageArr.push(formData);   
    localStorage.setItem('savedData',JSON.stringify(storageArr));
    console.log(storageArr);
}
const index= 1;
localStorage.setItem("index", JSON.stringify(index));

function getlocalstore(){
    var tbl = document.getElementById("studentList");
    if(localStorage.getItem('savedData') === null){
        storageArr = [];
    }
    else{
        storageArr = JSON.parse(localStorage.getItem('savedData'));
    }
    for(let i=0;i<storageArr.length;i++){
        var r = tbl.insertRow();
        var cell1 = r.insertCell();
        var cell2 = r.insertCell();
        var cell3 = r.insertCell();
        var cell4 = r.insertCell();
        var cell5 = r.insertCell();
        var cell6 = r.insertCell();

        cell1.innerHTML = i+1;
        cell2.innerHTML = storageArr[i]["fullName"];
        cell3.innerHTML = storageArr[i]["email"];  
        cell4.innerHTML = storageArr[i]["uid"];
        cell5.innerHTML = storageArr[i]["department"];
        cell6.innerHTML = `<a onClick="onEdit(this)"><i class="far fa-edit fa-2x"></i></a>
       <a onClick="onDelete(this)"><i class="fas fa-trash fa-2x"></i></a>`;
    }
}