var selectedRow = null;

function onFormSubmit(event) {
    event.preventDefault();
    var formData = readFormData();
    
    if (!isUniqueUSN(formData.usn)) {
        alert("USN must be unique. This USN is already in use.");
        return;
    }
    
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
        selectedRow = null;
    }
    resetForm();
}

function readFormData() {
    var formData = {};
    formData["usn"] = document.getElementById("usn").value;
    formData["name"] = document.getElementById("name").value;
    formData["age"] = document.getElementById("age").value;
    formData["cgpa"] = parseFloat(document.getElementById("cgpa").value).toFixed(2);
    
    if (formData["cgpa"] > 10 || formData["cgpa"] < 0) {
        alert("CGPA must be between 0 and 10.");
        return;
    }
    
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.usn;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.name;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.age;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.cgpa;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

function resetForm() {
    document.getElementById("usn").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("cgpa").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("usn").value = selectedRow.cells[0].innerHTML;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("age").value = selectedRow.cells[2].innerHTML;
    document.getElementById("cgpa").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.usn;
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.age;
    selectedRow.cells[3].innerHTML = formData.cgpa;
}

function onDelete(td) {
    if (confirm("Are you sure about deleting the data?")) {
        var row = td.parentElement.parentElement;
        document.getElementById("storeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function isUniqueUSN(usn) {
    var table = document.getElementById("storeList").getElementsByTagName("tbody")[0];
    var rows = table.rows;
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].cells[0].innerHTML === usn && rows[i] !== selectedRow) {
            return false;
        }
    }
    return true;
}
