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
        url: "Employees.json"
        , type: "post"
        , dataType: "json"
        , success: function (data, textStatus, jqXHR) {
            if (numLoaded < Object.keys(data).length) {
                draw(data, n);
            }
        }
    });
}

// calls drawDiv an arbitrary number of times, keeps track of loaded index
function draw(data, n) {
    var start = numLoaded;
    var stop = start + n; // IE9 didn't like adding these in the for statment
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
    var name = x.name.first + " " + x.name.last;
    var position = x.position;
    var imgPath = "img/employee_images/" + x.image;

    var $employee = $("<div>").addClass("employee center-block col-md-3 col-sm-4 col-xs-6");
    var $detail = $("<div>").addClass("text-center employee-detail");
    var $wrapper = $("<div>");
    var $name = $("<p>").addClass("name").text(name);
    var $title = $("<p>").addClass("title").text(position);
    var $image = $("<img>").addClass("img-responsive")
        .attr({
            src: imgPath, 
            alt: name
        });

    $wrapper.append($name).append($title);
    $detail.append($wrapper);
    $employee.append($detail).append($image);

    setTimeout(function () {
        $("#employees").append($employee);
    }, 200 * cadence); // delay the append so the divs pop in sequentially

}