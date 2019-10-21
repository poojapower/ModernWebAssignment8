var employee_list = [["Jack", "Vice Principal", "022"], ["Jones", "Director", "006"], ["Harry", "Manager", "009"], ["Tommon", "Assistant", "010"], ["Drake", "Associate", "012"]]
var $ = function (id) {
  "use strict";
  return document.getElementById(id);
}

function refreshTable() {
  var table = $("employee_info");

  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  //Iterating over elements in employee array to add rows to table
  for (var element of employee_list) {
    table.insertRow();

    //Iterating over elements in inner array to add cells to row
    for (var cell of element) {
      var newCell = table.rows[table.rows.length - 1].insertCell();
      newCell.textContent = cell;
    }

    //Adding delete button in extra cell
    var deleteCell = table.rows[table.rows.length - 1].insertCell();
    var button = document.createElement("input");
    button.type = "button";
    button.value = "Delete";
    button.addEventListener('click', function () {
      deleteItem(event);
    });
    deleteCell.appendChild(button);
    deleteCell.className = "deleteCell";
  }

  updateEmployeeCount();
}


function updateEmployeeCount() {
  $("employeeCount").innerHTML = employee_list.length;
}

function deleteItem(e) {
  //Getting row index of the delete button parent tr
  var index = e.target.closest("tr").rowIndex-1;
  employee_list.splice(index, 1);
  refreshTable();
}

function addItem(e) {
  employee_list.push(e);
  refreshTable();
}

function validateSubmit() {
  var valid = true;

  if ($("name").value.length < 1) {
    $("errName").innerHTML = "Enter name";
    valid = false;
  } else {
    $("errName").innerHTML = "";
  }

  if ($("title").value.length < 1) {
    $("errTitle").innerHTML = "Enter title";
    valid = false;
  } else {
    $("errTitle").innerHTML = "";
  }


  if ($("extension").value.length < 1) {
    $("errExtension").innerHTML = "Enter extension";
    valid = false;
  } else {
    $("errExtension").innerHTML = "";
  }

  if (valid) {
    addItem([$("name").value, $("title").value, $("extension").value]);
    $("add_form").reset();
  }
}

window.addEventListener("load", function () {
  "use strict";
  refreshTable();
});
