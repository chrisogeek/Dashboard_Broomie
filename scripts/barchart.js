
/*
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ BARCHART

Primer gráfico: BarChart

Data set: daily_interactions
* Generar Fechas entre 19-20.

Pregunta:

¿Qué día de la semana te visitan más?



Requisito_Chart:

Debe mostrar:
Gráfico de barras con los días de más frecuencia semanal.

Sugerencia:

Tus tres mejores días son () aprovecha esta temporada y  promociona tu anuncio y así conseguirás más roomies.

*/

function barchart(){
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 40, left: 100},
        width = 460 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".graphics")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("https://raw.githubusercontent.com/Alejandro-sin/Dashboard_Broomie/master/dataSets/daily_interactions.csv", function(data) {

    // sort data
    data.sort(function(b, a) {
        return a.Value - b.Value;
    });

    // Add X axis
        var x = d3.scaleLinear()
        .domain([0, 13000])
        .range([ 0, width]);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    // Y axis
        var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.rooms; }))
        .padding(1);
        svg.append("g")
        .call(d3.axisLeft(y))

        // Lines
        svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
            .attr("x1", function(d) { return x(d.interactions); })
            .attr("x2", x(0))
            .attr("y1", function(d) { return y(d.rooms); })
            .attr("y2", function(d) { return y(d.rooms); })
            .attr("stroke", "grey")

        // Circles
        svg.selectAll("mycircle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return x(d.Value); })
            .attr("cy", function(d) { return y(d.rooms); })
            .attr("r", "7")
            .style("fill", "#69b3a2")
            .attr("stroke", "black")
        })

    }

barchart()