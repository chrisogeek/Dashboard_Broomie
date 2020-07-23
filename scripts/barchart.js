
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ BARCHART
    * Data set: daily_interactions
    * Pregunta: ¿Qué día de la semana te visitan más?
    * Requisito_Chart: Gráfico de barras con tooltip para  mostrar interacciones
            de los usuarios en los mil primeros días.
        Oportunidad de mejora: Que me los muestre por mis n habitaciones según Host.
    * Ayuda al usario:host: Idea  de como se comportaron las visitas a mis cuartos
    consejos de mejorar la publicación o amplair los servicios.
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

*/

function dataload(){
    //Esto es una llamada asincorna, cuando termine la parsea
    d3.csv("/dataSets/daily_interactions.csv").then(function(d){
        data = d;
        //Creo un {indice para todos mis números}
        data.forEach(function(d,i){
            d.order = i
        });
        console.log(data)
        barchart();
    });
}

dataload()


function barchart(){

// set the dimensions and margins of the graph
// Ajusto las dimensiones del gráfico respecto a las márgenes.
var margin = {top: 10, right: 30, bottom: 30, left: 40},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


// Hago la selección vacía del id y allí pongo mi etiquta svg 
    var svg = d3.select("#barchart")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // Eje x: Escala
    var x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return + d.id})])     // Doy el dominio como la totalidad de los días por id
        .range([0, width]);
    // Hago el grupo para el transform
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  // Ajusto los parámetros del histograma vacío.
  /*
  1. Necesito un valor para el vector
  2. Luego atribuirle el dominio de la gráfica
  3. Y bindear los datos, y ajustarle el  treshold para que sea visualmente representativo

  */
    var histogram = d3.histogram()
        .value(function(d) { return d.interactions; })   
        .domain(x.domain())  
        .thresholds(x.ticks(30)); 

    // And apply this function to data to get the bins
    var bins = histogram(data);

    // Y axis: scale and draw:
    var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);
        // d3.hist has to be called before the Y axis obviously
    svg.append("g")
        .call(d3.axisLeft(y));

  // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
  // Its opacity is set to 0: we don't see it by default.
    var tooltip = d3.select("#barchart")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "black")
        .style("color", "white")
        .style("border-radius", "5px")
        .style("padding", "10px")

  // A function that change this tooltip when the user hover a point.
  // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    var showTooltip = function(d) {
        tooltip
        .transition()
        .duration(100)
        .style("opacity", 1)
        tooltip
        .html("Entre : " + d.x0 + " - " + d.x1+ " interacciones por día")
        .style("left", (d3.mouse(this)[0]+20) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var moveTooltip = function(d) {
        tooltip
        .style("left", (d3.mouse(this)[0]+20) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    var hideTooltip = function(d) {
        tooltip
        .transition()
        .duration(100)
        .style("opacity", 0)
    }

    // append the bar rectangles to the svg element
    svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
            // Show tooltip on hover
            .on("mouseover", showTooltip )
            .on("mousemove", moveTooltip )
            .on("mouseleave", hideTooltip )

    }

