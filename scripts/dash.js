
import {highInteractions} from  "./transformation_data.js"

var dataLoad = []
var  svg, bandScale

function dataload(){
    //Esto es una llamada asincorna, cuando termine la parsea
    d3.csv("dataSets/data.csv").then(function(d){
        dataLoad = d;
        //Creo un {indice para todos mis números}
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

//Para la vista generals de los host
//La idea es que la grafica se organice

function barchart(){

/* Como le digo que estos valroes de 500 y 300 varien en función de una
propiedad de CSS */
//Esta variable h es donde empeiza el grafico a aparecer, la w dodne se despalza
    var w = 500, h = 300;


// Hacemos un bandwith
//Es un ajuste que hago para relacionar el ancho de mi svg con el largo de mi arreglo
    var bandWidth = w/dataLoad.length

//Tambien puedo hacer n Band Scale

    var names = dataLoad.map(function(d){
        return d.name;
});
bandScale = d3.scaleBand()
                    .domain(names)
                    .range([0,w])

//Hago mi escala
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
        .attr("y", function(d){
            
            return h - heightScale(d.interactions);
        })
        //Indice i de los datos
        .attr("x", function(d,i){
            return i * bandWidth + i;
        })
        .attr("width",bandWidth)
        .attr("height", function(d){
        return heightScale(d.interactions);
        });
}

//■ depurar esta función
d3.select('input')
        .on("change" , toggleSort);

function toggleSort(){
    var sortBY;
    if (this.checked){    
//Ordenar de mayor a ºmenor
    sortBY = function(a,b){
        return b.interactions - a.interactions;
    }
} else{
//Ascending sort original order
    sortBY = function(a,b){
        return  a.interactions - b.interactions ;
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

/*
Notas generales:

PARA D ES EL VALRO DODNE SE CARGAN LOS DATOS, DEBO HACER UN .nombre d ela columna d emis datos para poder llamarlos y graficarlos.



Escalas:
En D3 es un inputo domain y un oput range

input = domain
ouput = range


*/