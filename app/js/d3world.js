/**
 * Created by zym on 2018-04-21.
 */
/* JavaScript goes here. */
// globals used in graph
var mapdata = {};
var palette = ['#FB4E2A','#A55E59','#E21A1C','#FC8D3B','#B00025','#edf933','#B7B7B7'];
var width = 1200, height = 900;
var minDocCount = 0, quantiles = {};
var projection = d3.geo.mercator()
    .scale((900 + 1)/1.5/ Math.PI + 30)
    .translate([width/2, height/2])
    .rotate([-105, 0])
    .center([60, 30])
    .precision(.1);
var path = d3.geo.path().projection(projection);//创建路径生成器path
var graticule = d3.geo.graticule();//地球方格生成
//
// var x = d3.scale.ordinal()
//     .rangeRoundBands([693, 993], .1);
var x = d3.scale.ordinal()
    .rangeRoundBands([0, 300], .1);

var y = d3.scale.linear()
    .rangeRound([250, 0]);

var color = d3.scale.ordinal()
    .range(['#CA171D','#EE3A2C','#FA6A49','#FB9271','#FBBAA0']);
var color2 = d3.scale.ordinal()
    .range(['#074593','#2070B5','#4292C5','#6BADD5','#9EC9E0']);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10)
    .tickFormat(function(d) { return parseInt(d, 10) + "%"; });
//
// SVG related definitions
// var svgr = d3.select('body').append('svg')
//     .attr({'width': width, 'height': height})
//     .append('g');
var svg = d3.select('body').append('svg')
    .attr({'width': width, 'height': height})
    .append('g');

svg.append('svg:text')
    .attr('transform', 'translate('+500+','+40+')')
    .attr('dy', '.35em')
    .attr("font-size","1.3rem")
    .text(" 2015-2016年中国与“一带一路”沿线六大区域贸易方式 ");

var filter = svg.append('defs')   //定义重复单元
    .append('filter')
    .attr({'x':0, 'y':0, 'width':1, 'height':1, 'id':'gray-background'});
filter.append('feFlood')
    .attr('flood-color', '#f2f2f2')
    .attr('result', 'COLOR');
filter.append('feMorphology')
    .attr('operator', 'dilate')
    .attr('radius', '.9')
    .attr('in', 'SourceAlpha')
    .attr('result', 'MORPHED');
filter.append('feComposite')
    .attr('in', 'SourceGraphic')
    .attr('in2', 'MORPHED')
    .attr('result', 'COMP1');
filter.append('feComposite')
    .attr('in', 'COMP1')
    .attr('in2', 'COLOR');

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

d3.json('mockelasticdata.json', function(error, mockdata) {
    if (error) return console.error(error);
    console.log('mockdata',mockdata);
    mapdata = mockdata;
    draw(mockdata)
});
var tworld = {};

function draw(data) {
    d3.json('world.json', function(error, world) {
        if (error) return console.error(error);
        console.log('world',world);
        processWorldD(world, data);
        tworld =world;
        console.log('tworld',tworld);

    });
}

function processWorldD(world, data) {
    for(var idx=0; idx < data.aggregations.world_map.buckets.length; idx++) {
        var cCode = data.aggregations.world_map.buckets[idx].key.toUpperCase(); //国家码
        var doc_count = Number(data.aggregations.world_map.buckets[idx].doc_count);  //数字
        var countryname = data.aggregations.world_map.buckets[idx].country;//国家中文名
        var region = data.aggregations.world_map.buckets[idx].region;//国家中文名
        for(var wdx=0; wdx < world.objects.subunits.geometries.length; wdx++) {//把dat的字段加到world.json里
            var cName = world.objects.subunits.geometries[wdx].id.toUpperCase();
            if (cCode === cName) {
                world.objects.subunits.geometries[wdx].properties.doc_count = doc_count;
                world.objects.subunits.geometries[wdx].properties.countryname = countryname;
                world.objects.subunits.geometries[wdx].properties.region = region;
            }
        }
    }
    var subunits = topojson.feature(world, world.objects.subunits);
    subunits.features = subunits.features.filter(function(d){ return d.id !== "ATA"; });
    console.log('subunits',subunits);

    minDocCount = d3.min(subunits.features, function(d){ return d.properties.doc_count; });//最小数字
    console.log('minDocCount',minDocCount);
    var doc_counts = subunits.features.map(function(d){ return d.properties.doc_count; });
    doc_counts = doc_counts.filter(function(d){ return d; }).sort(d3.ascending);
    //console.log('doc_counts',doc_counts);
    quantiles['0.95'] = d3.quantile(doc_counts, '0.95');
    var countries = svg.selectAll('path.subunit')
        .data(subunits.features).enter();
    countries.insert('path', '.graticule')
        .attr('class', function(d) { return 'subunit ca'+d.id; })
        .attr('country',function(d) { return d.country; })
        .style('fill', heatColor)
        .attr('d', path)
        .on('mouseover',mouseoverLegend)
        .on('mouseout',mouseoutLegend)
        .on('click', coutryclicked);

    countries.append('svg:text')
        .attr('class', function(d){ return 'subunit-label la'+d.id+d.properties.name.replace(/[ \.#']+/g,''); })
        //.attr('transform', function(d) { return 'translate('+ path.centroid(d) +')'; })
        .attr('transform', function(d) { return 'translate('+1000+','+150+')'; })
        .attr('dy', '.35em')
        .attr('filter', 'url(#gray-background)')
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dy', 5)
        .attr('dx', -40)
        .text(function(d) { return d.properties.countryname; })
        .append('svg:tspan')
        .attr('x', 0)
        .attr('dx', -40)
        .attr('dy', 20)
        .text(function(d) { return "人口:  " + (d.properties.doc_count ? d.properties.doc_count : ''); });
}

svg.append("polyline")
    .attr('class', 'polyl'+'Europe')
    .attr('points','280,260 280,80 800,80 800,180')
    .attr('fill','none');
svg.append("polyline")
    .attr('class', 'polyl'+'EasternAsia')
    .attr('points','360,370 360,200 740,200 ')
    .attr('fill','none');
svg.append("polyline")
    .attr('class', 'polyl'+'SouthernAsia')
    .attr('points','250,450 560,450 560,200 740,200')
    .attr('fill','none');
svg.append("polyline")
    .attr('class', 'polyl'+'CentralAsia')
    .attr('points','220,370 220,200 750,200')
    .attr('fill','none');
svg.append("polyline")
    .attr('class', 'polyl'+'WesternAsia')
    .attr('points','130,450 560,450 560,200 720,200')
    .attr('fill','none');
svg.append("polyline")
    .attr('class', 'polyl'+'South-EasternAsia')
    .attr('points','380,520 560,520 560,200 740,200')
    .attr('fill','none');

var svgt;
var region;
function mouseoverLegend(datum, index) {
    // d3.selectAll('polyline')
    //     .attr('opacity','0');
    d3.selectAll('.subunit-label.la'+datum.id+datum.properties.name.replace(/[ \.#']+/g,''))
        .style('display', 'inline-block');

    var reid = new Array();
    var region0 = region;
    for(var wdx=0; wdx < tworld.objects.subunits.geometries.length; wdx++) {
        //console.log('a',datum.id);
       // console.log('c',tworld.objects.subunits.geometries[wdx].id);
        if (tworld.objects.subunits.geometries[wdx].id === datum.id) {
            region = tworld.objects.subunits.geometries[wdx].properties.region;
        }
    }
    for(var wdx=0; wdx < tworld.objects.subunits.geometries.length; wdx++) {
        if(tworld.objects.subunits.geometries[wdx].properties.region === region){
            reid.push(tworld.objects.subunits.geometries[wdx].id);
        }
    }
    for(var i=0; i < reid.length;i++) {
        d3.selectAll('.subunit.ca'+reid[i])
            .style('fill', '#cc1a7e');
    }

    d3.selectAll('.subunit.ca'+datum.id)
        .style('fill', '#ac166c');

    // d3.selectAll('.polyl'+region.replace(/[ \.#']+/g,''))
    //     .attr("stroke","#ff0205")
    //     .attr("stroke-width","5")
    //     .attr('opacity','0.8')
    //     .attr('stroke-linejoin','round')
    //     .attr('stroke-linecap','round')
    //     .attr('stroke-dasharray','30 10');

    if(region0 !== region){
        d3.selectAll('.table').remove();

        svgt = svg.append('g')
            .attr("class", 'table')
            .attr("width", 1000)
            .attr("height", 800)
            .attr("transform", "translate(" + 680+ "," + 300 + ")")
            .append("g")
            .attr("transform", "translate(" + 0+ "," + 0 + ")");

        var dic = new Array(); //字典
        dic["Europe"] = "东欧";
        dic["EasternAsia"] = "东亚";
        dic["SouthernAsia"] = "南亚";
        dic["CentralAsia"] = "中亚";
        dic["WesternAsia"] = "西亚北非";
        dic["South-EasternAsia"] = "东南亚";

        if(region !== "china"){
            drawtable('app/data/'+region.replace(/[ \.#']+/g,'')+'table.csv',dic[region.replace(/[ \.#']+/g,'')]);
        }
    }
}

function mouseoutLegend(datum, index) {
    d3.selectAll('.subunit-label.la'+datum.id+datum.properties.name.replace(/[ \.#']+/g,''))
        .style('display', 'none');
    d3.selectAll('.subunit.ca'+datum.id)
        .style('fill', heatColor(datum));
    for(var wdx=0; wdx < tworld.objects.subunits.geometries.length; wdx++) {
        d3.selectAll('.subunit.ca'+tworld.objects.subunits.geometries[wdx].id)
            .style('fill', heatColor(tworld.objects.subunits.geometries[wdx]));
    }

    // d3.selectAll('polyline')
    //     .attr('opacity','0');

    // d3.selectAll('.polyl'+region.replace(/[ \.#']+/g,''))
    //     .attr('opacity','0.8');

}

function coutryclicked(datum, index) {
    //filter event for this country should be applied here
    console.log('coutryclicked datum', datum);
}
function heatColor(d) {//确定颜色
    // if (quantiles['0.95'] === 0 && minDocCount === 0) return '#F0F0F0';
    // if (!d.properties.doc_count) return '#F0F0F0';
    // if (d.properties.doc_count > quantiles['0.95']) return palette[(palette.length - 1)];
    // if (quantiles['0.95'] == minDocCount) return palette[(palette.length-1)];
    // var diffDocCount = quantiles['0.95'] - minDocCount;
    // var paletteInterval = diffDocCount / palette.length;
    // var diffDocCountDatum = quantiles['0.95'] - d.properties.doc_count;
    // var diffDatumDiffDoc = diffDocCount - diffDocCountDatum;
    // var approxIdx = diffDatumDiffDoc / paletteInterval;
    // if (!approxIdx || Math.floor(approxIdx) === 0) approxIdx = 0;
    // else approxIdx = Math.floor(approxIdx) - 1;
    // return palette[approxIdx];
    if (d.properties.region === "china") return palette[(palette.length - 1)];
    if (d.properties.region === "Eastern Asia") return palette[(palette.length - 2)];
    if (d.properties.region === "South-Eastern Asia") return palette[(palette.length - 3)];
    if (d.properties.region === "Southern Asia") return palette[(palette.length - 4)];
    if (d.properties.region === "Western Asia") return palette[(palette.length - 5)];
    if (d.properties.region === "Central Asia") return palette[(palette.length - 6)];
    if (d.properties.region === "Europe") return palette[(palette.length - 7)];

}

function drawtable(url,region){
    d3.csv(url, function(error, data) {

        color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

        data.forEach(function(d) {
            var y0 = 0;
            d.ages = color.domain().map(function(name) {
                return {
                    name: name, y0: y0, y1: y0 += +d[name],kind:d.State
                };
            });
            d.total = d.ages[d.ages.length - 1].y1;

        });

        //data.sort(function(a, b) { return b.total - a.total; });

        x.domain(data.map(function(d) {return d.State; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]);
        // console.log('t',data);

        svgt.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate("+ (-6)+"," + 250+ ")")
            .call(xAxis);

        svgt.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "translate("+0+"," + 0+ ")")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            //.text("Population");

        var state = svgt.selectAll(".state")
            .data(data)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform", function(d) { return "translate(" + x(d.State)+ ","+0+")"; });
        // console.log('m',state.selectAll().filter(function(d,i){return d.parentNode.__data__.State.indexof("出口") !== -1 ;}));
        // console.log('t',state.selectAll("rect").data(function(d) {return d.ages; }).enter().filter(function(d,i){return d.State.indexof("出口") !== -1 ;}));

        state.selectAll("rect")
            .data(function(d) {return d.ages; })
            .enter().append("rect")
            .attr("width", x.rangeBand())
            .attr("y", function(d) {return y(d.y1); })
            .attr("height", function(d) { return y(d.y0) - y(d.y1); })
            .style("fill", function(d) {
                if(d.kind.indexOf('出口') !== -1)return color(d.name);
                if(d.kind.indexOf('进口') !== -1)return color2(d.name);
            });

        // state.selectAll("text")
        //     .data(function(d) {return d.ages; })
        //     .enter().append("text")
        //     .attr("y", function(d) {return ( y(d.y1)+10); })
        //     .attr("dx", function(d,i){
        //         return x.rangeBand()/4;
        //     })
        //     .attr("text-anchor", "begin")
        //     .attr("font-size", 14)
        //     .text(function(d,i){
        //         console.log('te',d);
        //         if((100 - d.y1).toFixed(1) <= 0){
        //             return '';
        //         }
        //         else return (100 - d.y1).toFixed(1) + "%";
        //     });

        var legend = svgt.selectAll(".legend")
            .data(color.domain().slice().reverse())
            .enter().append("g")
            .attr("class", "legend")
            .style("font-color",'white')
            .attr("transform", function(d, i) { return "translate("+0+"," + i * 20 + ")"; });

        svgt.insert("text")
            .style("text-anchor", "middle")
            .attr("x",120)
            .attr("y",-90)
            .attr("dy",5)
            .attr("stroke","black")
            .attr("font-size","2rem")
            .attr("fill","none" )
            .attr("stroke-width","1")
            .text(region);

        legend.append("rect")
            .attr("x",300)
            .attr("y",-110)
            .attr("width", 40)
            .attr("height", 18)
            .style("fill", color);
        legend.append("rect")
            .attr("x",340)
            .attr("y",-110)
            .attr("width", 40)
            .attr("height", 18)
            .style("fill", color2);

        legend.append("text")
            .attr("x", 295)
            .attr("y",-103)
            .attr("dy", "0.35em")
            .style("text-anchor", "end")
            .text(function(d) { return d; });

    });
}