// appends bar below headings
$("h2").after("<hr>");

var numLoaded = 0;

// calls loadMore() a number of times based on device width
$(document).ready(function() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (w <= 500) {
        loadMore(2);
    } else if (w > 500 && w < 1024) {
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
            if (numLoaded < Object.keys(data).length){
            draw(data, n);
            }
        }
    });
}

// calls drawDiv a certain number of times and keeps track of where to start
function draw(data, n) {
    var x = numLoaded;
    for (var i = x; i < x + n; i++) {
        drawDiv(data[i]);
    }
}

// parses and appends the json data 
function drawDiv(x) {
    var firstName = x.name.first;
    var lastName = x.name.last;
    var position = x.position;
    var img = x.image;

    $("#employeesDiv").append('<div class="employee center-block col-md-3 col-sm-4 col-xs-12"><div class="text-center employee-detail"><div><p class="name">' + firstName + ' ' + lastName + '</p><p class="title">' + position + '</p></div></div><img class="img-responsive" src="img/employee_images/' + img + '" alt="' + firstName + ' ' + lastName + '"></div>');
    
    numLoaded++;
}