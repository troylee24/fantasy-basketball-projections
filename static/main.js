const set = new Set()

createAddHandler = function(row) {
    var data = document.getElementById("data2");
    if (set.has(row.id))
        return
    set.add(row.id)
    var newRow = row.cloneNode(true);
    data.appendChild(newRow)
    newRow.addEventListener("click", function(){
        data.removeChild(newRow);
        set.delete(newRow.id)
    });
}

function initialize() {
    var data = document.getElementById("data1");
    var rows = data.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var row = data.rows[i];
        row.setAttribute("id", i);
        row.addEventListener("click", function(row){
            return function(){createAddHandler(row)}
        }(row));
    }
}

window.onload = initialize;

function search() {
    // Declare variables
    var input = document.getElementById("searchPlayerButton");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("table1");
    var rows = table.getElementsByTagName("tr");
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < rows.length; i++) {
        var row = rows[i]
        player = row.getElementsByTagName("td")[2];
        if (player) {
            var txtValue = player.textContent || player.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
}

var tableViewButton = document.getElementById("tableViewButton");
var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var viewText = document.getElementById("viewText");
var view = true;

tableViewButton.onclick = function() {
    view = !view
    if (view) {
        viewText.innerText = "All Players";
        tableViewButton.value = "View Drafted";
        table1.style.display = "table";
        table2.style.display = "none";
    }
    else {
        viewText.innerText = "My Players";
        tableViewButton.value = "View Available";
        table1.style.display = "none";
        table2.style.display = "table";
    }
}