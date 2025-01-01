"use strict";
$(document).ready(function() {
    $("#toggle-sidebar-btn").click(function() {
        $("body").toggleClass("toggle-sidebar");
    });

    $("#filterInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tbody tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    const quill = new Quill('.quill-editor-full', {
      theme: 'snow'
    });
});
    



function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[n];
        y = rows[i + 1].getElementsByTagName("td")[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
    // Toggle sort icons
    var header = table.getElementsByTagName("th")[n];
    var icon = header.getElementsByClassName("bi")[0];
    if (dir === "asc") {
      icon.classList.remove("bi-sort-down");
      icon.classList.add("bi-sort-up");
    } else {
      icon.classList.remove("bi-sort-up");
      icon.classList.add("bi-sort-down");
    }
  }
