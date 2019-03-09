// from data.js
var tableData = data;

// Select the submit button
var submit = d3.select("#submit");

submit.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Clean the table
    d3.select("tbody").html("");
    
    // Select the input element and get the raw HTML node
    var inputElementDate = d3.select("#datetime");
    var inputElementCity = d3.select("#city");
    var inputElementState = d3.select("#state");
    var inputElementCountry = d3.select("#countryid");
    var inputElementShape = d3.select("#shapeid");
  
    // Get the value property of the input element
    var inputValueDate = inputElementDate.property("value");
    var inputValueCity = inputElementCity.property("value");
    var inputValueState = inputElementState.property("value");
    var inputValueCountry = inputElementCountry.property("value");
    var inputValueShape = inputElementShape.property("value");
    
    // Create array for inner joining conditioning
    var inputAll=[inputValueDate,inputValueCity,inputValueState,inputValueCountry,inputValueShape]
    var conditionIndex=["datetime","city","state","country","shape"]
    console.log(inputAll);
    
    // Conditioning with 5 parameters. ttableData is to avoid cache for second filter.
    var ttableData=tableData;
    for (var i = 0; i < conditionIndex.length; i++) {
      if (inputAll[i] != ""){
        filteredData = ttableData.filter(data => (data[conditionIndex[i]] === inputAll[i]));
        ttableData=filteredData;
      }
    }
    console.log(filteredData);
  
    // Fetch the filter results
    var dateUfo = filteredData.map(i => i.datetime);
    var cityUfo= filteredData.map(i => i.city);
    var stateUfo = filteredData.map(i => i.state);
    var countryUfo = filteredData.map(i => i.country);
    var shapeUfo= filteredData.map(i => i.shape);
    var durationUfo = filteredData.map(i => i.durationMinutes);
    var commentsUfo = filteredData.map(i => i.comments);
    var outputtable = [dateUfo,cityUfo,stateUfo,countryUfo,shapeUfo,durationUfo,commentsUfo];
    console.log(outputtable);

    // Put the results into the table
    for (var i = 0; i < dateUfo.length; i++) {
      d3.select(".summary").append("tr");
      for (var j = 0; j < outputtable.length; j++) {   
      d3.select(".summary")
      .append("td").text(`${outputtable[j][i]}`);
      }
    }
    
  });