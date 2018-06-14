// Starting ajax branch
var searchInput;
var numRecords;
var startYear;
var endYear;

var searchButton;
var clearButton;

function displayResults() {
    var searchInput = $("#search-field").val().trim();
    var numRecords = $("#number-field").val().trim();
    var startYear = $("#start-field").val().trim();
    var endYear = $("#end-field").val().trim();

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=adc9afb778e24487a40604627ff52071&q=" +
        searchInput +
        "&start_date=" +
        startYear +
        "0101&end_date=" +
        endYear +
        "0101";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(JSON.stringify(response));
        console.log(JSON.stringify(response.response.docs[1]));
    })
}

$("#search-button").on("click", displayResults());