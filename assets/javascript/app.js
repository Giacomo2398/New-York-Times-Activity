// Starting ajax branch
$(document).ready(function(){
    var searchInput;
    var numRecords;
    var startYear;
    var endYear;

    var searchButton = $("#search-button");
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
            var results = response.response.docs;
            for(i = 0; i < numRecords; i++) {
                var entry = $("<li>");
                var link = $("<a>").attr("href", results[i].web_url)
                link.attr("target", "_blank")
                link.text(results[i].headline.main);
                var author = $("<p>").text(results[i].byline.original);
                entry.append(link);
                entry.append(author);
                $("#article-container").append(entry);
            }
        })
    }

    searchButton.on("click", function() {
        displayResults()
    });
})