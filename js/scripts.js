// appends bar below headings
$("h2").after("<hr>");

var numLoaded = 0;

// calls loadMore() a number of times based on device width
$(document).ready(function () {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w < 768) {
        loadMore(4);
    } else if (w >= 768 && w < 1024) {
        loadMore(6);
    } else {
        loadMore(8);
    }
});

// loads and draws employess from the json file as long as there are unloaded ones left
function loadMore(n) {
    $.ajax({
        url: "Employees.json", 
        type: "post", 
        dataType: "json", 
        success: function (data, textStatus, jqXHR) {
            if (numLoaded < Object.keys(data).length) {
                draw(data, n);
            }
        }
    });
}

// calls drawDiv an arbitrary number of times, keeps track of loaded index
function draw(data, n) {
    var start = numLoaded;
    var stop = x + n; // IE9 didn't like adding these in the for statment
    var count = 0;

    for (var i = start; i < stop; i++) {
        try {
            drawDiv(data[i], count);
            numLoaded++;
            count++;
        }
        // when the error is caught we've run out of objects in the json array
        catch (err) {
            $("#loadMore").hide();
        }
    }
}

function drawDiv(x, cadence) {
    var firstName = x.name.first;
    var lastName = x.name.last;
    var position = x.position;
    var img = x.image;
    setTimeout(function () {
        $("#employees").append('<div class="employee center-block col-md-3 col-sm-4 col-xs-6"><div class="text-center employee-detail"><div><p class="name">' + firstName + ' ' + lastName + '</p><p class="title small">' + position + '</p></div></div><img class="img-responsive" src="img/employee_images/' + img + '" alt="' + firstName + ' ' + lastName + '"></div>');
    }, 200 * cadence); // delay the append so the divs pop in sequentially
}