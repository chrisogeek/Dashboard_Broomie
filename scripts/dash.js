
//import {highInteractions} from  "./transformation_data.js"

var dataLoad = []
var  svg, bandScale

function dataload(){
    d3.csv("dataSets/data.csv").then(function(d){
        dataLoad = d;
        dataLoad.forEach(function(d,i){
            d.order = i
        });
        console.log(dataLoad)
        barchart();
    });
}

dataload()

function piechart(){


}



function barchart(){
    var w = 500, h = 300;
    var bandWidth = w/dataLoad.length
    var names = dataLoad.map(function(d){
        return d.name;
});
bandScale = d3.scaleBand()
              .domain(names)
              .range([0,w])

var heightScale =  d3.scaleLinear()
                    .domain([0,2000])
                    .range([0,h])

    svg = d3.select('.graphics')
        .append('svg')
        .attr('class','barchart')
        .attr("width", w)
        .attr("height", h);

    svg.selectAll('rect')
        .data(dataLoad)
        .enter()
        .append('rect')
        .attr('class','rect_svg')
        .append("title")
        .text(function(d){ return d.name; })
        .attr("y", function(d){
            return h - heightScale(d.interactions);
        })
        .attr("x", function(d,i){
            return i * bandWidth + i;
        })
        .attr("width",bandWidth)
        .attr("height", function(d){
        return heightScale(d.interactions);
        });
}


/* //El evento
d3.select('input')
        .on("change" , toggleSort);

function toggleSort(){
    var sortBY;

    if (this.checked){
    sortBY = function(a,b){
        return b.interactions - a.interactions;
    }
} else {
    sortBY = function(a,b){
        return  a.order - b.order ;
    }
}
    dataLoad.sort(sortBY)
    const chartOrder =  dataLoad.map(function(d){
        return d.interactions;
    })
    bandScale.domain(chartOrder);
    svg.transition()
        .duration(3000)
        .selectAll("rect")
        .delay(function(d,i){
            return i*100;   
        })
        .attr("x", function(d){
            return bandScale(d.name)
        })
}
 */