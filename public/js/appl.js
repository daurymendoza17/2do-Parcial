var selectedRow = null

function onFormSubmit(e) {
    event.preventDefault();
    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
}


function readFormData() {
    var formData = {};
    formData["nombre"] = document.getElementById("nombre").value;
    formData["apellido"] = document.getElementById("apellido").value;
    formData["correo"] = document.getElementById("correo").value;
    return formData;
}

//Insert 
function insertNewRecord(data) {
    var table = document.getElementById("Listado").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.nombre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.apellido;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.correo;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>
    `;
}

//Edit 
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nombre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("apellido").value = selectedRow.cells[1].innerHTML;
    document.getElementById("correo").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nombre;
    selectedRow.cells[1].innerHTML = formData.apellido;
    selectedRow.cells[2].innerHTML = formData.correo;
}

//Delete
function onDelete(td) {
    if (confirm('Estas seguro de eliminar ?')) {
        row = td.parentElement.parentElement;
        document.getElementById('Listado').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Refrescar 
function resetForm() {
    document.getElementById("nombre").value = '';
    document.getElementById("apellido").value = '';
    document.getElementById("correo").value = '';
    selectedRow = null;
}

function Mensaje() {

    window.location = "./views/mensaje.ejs";

}