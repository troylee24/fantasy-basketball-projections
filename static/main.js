const set = new Set()

var tableViewButton = document.getElementById("tableViewButton");
var viewText = document.getElementById("viewText");
var input = document.getElementById("searchPlayerButton");

var body = document.getElementsByTagName("body")[0];
var table1 = document.getElementById("table1");
var table2 = document.getElementById("table2");
var data1 = document.getElementById("data1");
var data2 = document.getElementById("data2");

function createPopUp(e, text){
    var popup = document.createElement("SPAN");
    var span_width = 250;
    var span_height = 100;
    var span_x = e.clientX - (span_width/2);
    var span_y = e.clientY - (span_height/2);
    popup.style.width = span_width;
    popup.style.position = "fixed";
    popup.style.left = span_x + "px";
    popup.style.top = span_y + "px";
    popup.innerText = text
    popup.className = 'popup';
    popup.classList.toggle("show");
    setTimeout(() => {
        popup.classList.toggle("hide");
        popup.addEventListener("animationend", function(){
            popup.remove();
        }, false);
    }, 300);
    return popup
}

createAddHandler = function(e, row) {
    var player = row.cells[2].innerText;

    if (set.has(row.id)){
        var popup = createPopUp(e, "Already added " + player);
        body.appendChild(popup);
        return
    }
    else {
        var popup = createPopUp(e, "Added " + player)
    }
    set.add(row.id);
    var newRow = row.cloneNode(true);
    data2.appendChild(newRow)
    newRow.addEventListener("click", function(e){
        data2.removeChild(newRow);
        set.delete(newRow.id)
        var popup = createPopUp(e, "Deleted " + player)
        body.appendChild(popup)
    });
    body.appendChild(popup);
}

function initialize() {
    var rows = data1.getElementsByTagName("tr");
    for (i = 0; i < rows.length; i++) {
        var row = data1.rows[i];
        row.setAttribute("id", i);
        row.addEventListener("click", function(row){
            return function(e){createAddHandler(e, row)}
        }(row));
    }
}

window.onload = initialize;

function search() {
    // Declare variables
    var filter = input.value.toUpperCase();
    var rows = table1.getElementsByTagName("tr");
  
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

var view = true;
tableViewButton.onclick = function() {
    popups = document.getElementsByClassName("popup");
    while (popups.length > 0){
        popups[0].remove();
    }
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