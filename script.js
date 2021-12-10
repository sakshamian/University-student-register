//buttons
// showData();
// var storageArr = [];
let arr = [];
var selectedRow = null;
function onFormSubmit(){
    var formData = readFormData();
    if(document.getElementById("addBtn").value == 'Update'){
        document.getElementById("addBtn").value = 'Add';
        document.getElementById("headingData").innerHTML = 'Add new student';
    }
    if(selectedRow == null){
        insertNewRecord(formData);
    }
    else{
        updateRecord(formData);
    }
    resetForm();
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

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("uid").value = selectedRow.cells[3].innerHTML;
    document.getElementById("department").value = selectedRow.cells[4].innerHTML;
    document.getElementById("addBtn").value = 'Update';
    document.getElementById("headingData").innerHTML = 'Update student data';

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

showData();
function saveData(){
    let name, email, uid, department;
    name = document.getElementById("fullName").value;
    email = document.getElementById("email").value; 
    uid = document.getElementById("uid").value;
    department = document.getElementById("department").value;
    let studentRecord = [];
    studentRecord = JSON.parse(localStorage.getItem('student'))?JSON.parse(localStorage.getItem('student')):[];
    if(studentRecord.some((v)=> {return v.uid = uid})){
        alert("Duplicate Data");
    }
    else{
        studentRecord.push({
            "name": name,
            "email": email,
            "uid": uid,
            "department": department
        });
        localStorage.setItem("student",JOSN.stringify(studentRecord));
    }
    showData();
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

// //show data
// function showData(){
//     getData();
//     // studentTable var tbl = document.getElementById("studentList");

//     var x = studentList.rows.length;
//     while(x--){
//         studentList.deleteRow(x);
//     }

//     for(let i=0;i<storageArr.length;i++){
//         var table = document.getElementById("studentList").getElementsByTagName('tbody')[0];
//         var newRow = table.insertRow(table.length);
//         cell1 = newRow.insertCell(0);
//         cell1.innerHTML = arr.length;
//         cell2 = newRow.insertCell(1);
//         cell2.innerHTML = storageArr[i].fullName;
//         cell3 = newRow.insertCell(2);
//         cell3.innerHTML = storageArr[i].email;
//         cell4 = newRow.insertCell(3);
//         cell4.innerHTML = storageArr[i].uid;
//         cell5 = newRow.insertCell(4);
//         cell5.innerHTML = storageArr[i].department;
//         cell6 = newRow.insertCell(5);
//         cell6.innerHTML = `<a onClick="onEdit(this)"><i class="far fa-edit fa-2x"></i></a>
//         <a onClick="onDelete(this)"><i class="fas fa-trash fa-2x"></i></a>`;
//     }
// }

// function addData(){
//     getData();
//     storageArr.push({
//         fullName:document.getElementById("fullName").value,
//         email:document.getElementById("email").value,
//         uid:document.getElementById("uid").value,
//         department:document.getElementById("department").value
//     });
//     localStorage.setItem("localData",JSON.stringify(storageArr));
//     showData();
// }

// function getData(){
//     var str =  localStorage.getItem("localData");
//     if(str != null){
//          storageArr = JSON.parse(str); 
//     }
// }
// function deleteData(){
//     localStorage.clear();
// }