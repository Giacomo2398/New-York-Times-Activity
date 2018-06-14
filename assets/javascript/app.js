$(document).ready(function(){

    var searchButton = $("#search-button");
    var clearButton = $("#clear-button");

    function displayResults() {
        var searchInput = $("#search-field").val().trim();
        var numRecords = $("#number-field option:selected").text();
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
            var results = response.response.docs;
            for(i = 0; i < numRecords; i++) {
                var entry = $("<li>");
                var link = $("<a>").attr("href", results[i].web_url)
                link.attr("target", "_blank")
                link.text(results[i].headline.main);
                var date = results[i].pub_date;
                date = date.slice(0, -10);
                var displayDate = $("<p>").text(date);
                entry.append(link);
                entry.append(displayDate);
                $("#article-container").append(entry);
            }
        })
    }

    function clearResults() {
        $("#article-container").empty();
    }

    searchButton.on("click", function() {
        displayResults();
    });
    clearButton.on("click", function() {
        clearResults();
    })

})