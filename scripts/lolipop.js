/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ LOLIPOP
    * Data set: typeofrooms
    * Pregunta: ¡¿Conoces a tus roomies?
    * Requisito_Chart: Mostrar un lolipop según variables que pertencen a las preferencias de los usuarios
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

*/

function dataload(){
    //Esto es una llamada asincorna, cuando termine la parsea
    d3.csv("/dataSets/typeofRoomies.csv").then(function(d){
        data = d;
        console.log(data)
        lolipop()
    });
}

dataload()

function lolipop(){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 90, left: 40},
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#lolipop")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

 
    // X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d.room; }))
    .padding(1);

    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([0, 1000])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Lines
    svg.selectAll("myline")
    .data(data)
    .enter()
    .append("line")
        .attr("x1", function(d) { return x(d.room); })
        .attr("x2", function(d) { return x(d.room); })
        .attr("y1", function(d) { return y(d.gym); })
        .attr("y2", y(0))
        .attr("stroke", "grey")

    // Circles
    svg.selectAll("mycircle")
    .data(data)
    .enter()
    .append("circle")
        .attr("class","lolipopCircle")
        .attr("cx", function(d) { return x(d.room); })
        .attr("cy", function(d) { return y(d.gym); })
        .attr("r", "10")
        .style("fill", "#900C3F")
        .attr("stroke", "black")

}

