var idleTimeout
function idled() { idleTimeout = null; }
const padding = { top: 10, bottom: 40, left: 40, right: 40 }
var vis = 'hidden'
var w = 1200,
    h = 1200,
    value = "",
datasetSlice = [],
diameter = 960,
margin = 20,
timeRange = ['2020-10-08 09:00','2020-10-08 10:30'],
timestep = ['2020-10-08 09:00', '2020-10-08 09:01', '2020-10-08 09:03', '2020-10-08 09:05', '2020-10-08 09:08', '2020-10-08 09:09', '2020-10-08 09:10', '2020-10-08 09:11', '2020-10-08 09:12', '2020-10-08 09:13', '2020-10-08 09:14', '2020-10-08 09:15', '2020-10-08 09:17', '2020-10-08 09:19', '2020-10-08 09:20', '2020-10-08 09:21', '2020-10-08 09:22', '2020-10-08 09:23', '2020-10-08 09:24', '2020-10-08 09:25', '2020-10-08 09:27', '2020-10-08 09:28', '2020-10-08 09:29', '2020-10-08 09:30', '2020-10-08 09:31', '2020-10-08 09:32', '2020-10-08 09:33', '2020-10-08 09:34', '2020-10-08 09:36', '2020-10-08 09:38', '2020-10-08 09:39', '2020-10-08 09:40', '2020-10-08 09:42', '2020-10-08 09:43', '2020-10-08 09:45', '2020-10-08 09:46', '2020-10-08 09:47', '2020-10-08 09:48', '2020-10-08 09:50', '2020-10-08 09:52', '2020-10-08 09:53', '2020-10-08 09:55', '2020-10-08 09:56', '2020-10-08 09:57', '2020-10-08 09:59', '2020-10-08 10:00', '2020-10-08 10:02', '2020-10-08 10:03', '2020-10-08 10:04', '2020-10-08 10:05', '2020-10-08 10:06', '2020-10-08 10:07', '2020-10-08 10:08', '2020-10-08 10:10', '2020-10-08 10:11', '2020-10-08 10:13', '2020-10-08 10:14', '2020-10-08 10:15', '2020-10-08 10:16', '2020-10-08 10:17', '2020-10-08 10:18', '2020-10-08 10:19', '2020-10-08 10:20', '2020-10-08 10:21', '2020-10-08 10:23', '2020-10-08 10:24', '2020-10-08 10:26', '2020-10-08 10:27']
var ywid = 200
var svg_yxis = d3.select('#select_time').append("svg").attr('width', ywid).attr('height',h)
let yxis = svg_yxis.append("g").attr("class", "yxis")
var svg = d3.select('#vis_circle_pack').append("svg").attr('width', w).attr('height',h)


var tooltip = d3.select("body")
            .append("div")
            .attr('height','auto')
            .style("position", "absolute")
            .style("background-color", "snow")
            .style("padding", "2px")
            .style("visibility", "hidden")
            .style("font-size", "5px")
var strokecolor = {0: '#5470c6', 1: '#73c0de', 2: '#fac858', 3: '#3ba272', 4: '#ee6666', 5: '#91cc75'}
function circle_pack(){

    var root = {'name':'', 'children':datasetSlice}
    root = d3.hierarchy(root)
        .sum(function(d) { return d.size; })
        .sort(function(a, b) { return b.value - a.value; });
    console.log(root)
    var focus = root,
        nodes = pack(root).descendants(),
        view,
        margin = 20,
        diameter = 960,
        g = svg.append("g").attr('id','circle').attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");

//    var g2 = d3.select('#vis_circle_pack').append("svg").attr('id', 'line_svg').attr('width', w).attr('height',h).attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")")
//    var g2 = svg.append("g").attr('id','line');
    console.log(nodes)

    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) {
            return d.children ? color(d.depth) : null;
        })
        .attr('stroke', function(d){
            if(d.depth != 3&&ball_color.map(d => d.key).indexOf(d.data.name)>-1){
//                console.log(ball_color.filter(t => t.key == d.data.name)[0].value)
                return strokecolor[ball_color.filter(t => t.key == d.data.name)[0].value]
            }
            else{
                return null
            }
        })
        .attr("stroke-width", "2")
        .on("click", function(d) { if (focus !== d && d.children) zoom(d), d3.event.stopPropagation(); })

    var forcenode =  _.cloneDeep(nodes);
    console.log(forcenode)
//					.call(d3.zoom()
//							.scaleExtent([0.1, 10])
//							.on("zoom", zoomed))
// var arc1 = g.append('g').selectAll("arc").data(nodes)
//            .enter().append("path")
//            .attr("class", "arc")
//  circle.append('title').text(function(d) { return d.data.name + "\n" + d.value; });
    console.log(dataconnect)
    var text = g.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("text-anchor", "middle")
        .style("opacity", function(d) { return d.parent === root ? 1 : 0; })
        .attr("font-size", function(d) { return 11})
//      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
        .text(function(d) { return d.data.name; })
        .on('mouseover', function (d) {
            if(d.depth < 2){
                tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value);
            }
            else{
                tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value + "\n" + "COUNT: " + d.data.count);
            }

        })
        .on("mousemove", function(){return tooltip.style("top", (event.pageY-12)+"px").style("left",(event.pageX+12)+"px");})
        .on('mouseleave', function (d) {
            tooltip.style("visibility", "hidden")
        }).on("click", function(d) { if (focus !== d && d.children) zoom(d), d3.event.stopPropagation(); });


    var diag = d3.linkHorizontal()

    var node = g.selectAll("circle,text");

    svg.on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
        var focus0 = focus; focus = d;

        var transition = d3.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", function(d) {
                var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                return function(t) {
                    zoomTo(i(t));
                };
            });

        transition.select('#label').selectAll("text")
            .on("start", function(d) { if (d.parent === focus) this.style.opacity = 1; })
            .on("end", function(d) { if (d.parent !== focus) this.style.opacity = 0; });
//      .filter(function(d) { return d.parent === focus || this.style.opacity == 1 })
//        .style("opacity", function(d) {
//            k = diameter / v[2]
//            if (d.r/4* k>9 ){
//                return 0.8;
//            }
//            else if(d.parent === focus){
//                return 1
//            }
//            else{
//                return 0
//            }
//        })
    }

    function zoomTo(v) {
        d3.select('#line_svg').remove()
        d3.select('#forcedirect_links').remove()
        d3.select('#forcedirect_nodes').remove()
        var k = diameter / v[2]; view = v;
//        svg2 = d3.select('#vis_circle_pack').append("svg").attr('id', 'line_svg').attr('width', w).attr('height',h)
        g2 = svg.append('g').attr('id', 'line_svg').attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        g_force = svg.append("g").attr("id", "forcedirect_links").attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        g_forcenodes = svg.append("g").attr("id", "forcedirect_nodes").attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
//        console.log(line)
        const drag = d3.drag()
        .on('start', dragstarted)
        .on('end', dragended)
        .on('drag', dragged)

        function zoomed() {
            g_forcenodes.attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")"+"scale(" + d3.event.transform.k+","+ d3.event.transform.k + ")");
            g_force.attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")"+"scale(" + d3.event.transform.k+","+ d3.event.transform.k + ")");
        }

        function dragstarted() {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d3.event.subject.fx = d3.event.subject.x;
            d3.event.subject.fy = d3.event.subject.y;
          }

        function dragged() {
            d3.event.subject.fx = d3.event.x;
            d3.event.subject.fy = d3.event.y;
        }

        function dragended(event) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d3.event.subject.fx = null;
            d3.event.subject.fy = null;
        }
//        console.log(dataconnect.filter(d => d.depth==focus.depth+1&&d.freq>5))
        line = g2.selectAll('line')
            .data(dataconnect.filter(d => d.depth==focus.depth+1&&d.freq>5))
            .enter()
            .append('path')
            .attr('id','line')
            .attr('d', function (d, i) {
                // console.log(d)
                return diag(diagonal(d, i))
            })
            .attr('fill',"None")
            .attr('opacity',0.3)
            .attr("stroke", "black")
            .attr("stroke-width", d => d.freq)
            .on('mouseover', function (d) {
                line.style('opacity', function(t){
                    if(d==t){
                        return 0.7
                    }
                    else{
                        return 0.1
                    }

                })
                tooltip.style("visibility", "visible").text(d.freq);
//                    console.log('in')
                    circle.style('opacity', function(t){
                        if((d.source == t.data.name||d.target == t.data.name)&&d.parent==t.parent.data.name){
//                            console.log('in')
                            return 0.5
                        }
                        else if(d.common.indexOf(t.data.name)>-1&&(d.source == t.parent.data.name||d.target == t.parent.data.name)&&d.depth==t.depth-1){
                            return 1
                        }
                        else{
                            return 0.1
                        }
                    })
                    text.style('opacity', function(t){
                        if((d.source == t.data.name||d.target == t.data.name)&&d.parent==t.parent.data.name){
                            return 0.5
                        }
                        else if(d.common.indexOf(t.data.name)>-1&&(d.source == t.parent.data.name||d.target == t.parent.data.name)&&d.depth==t.depth-1){
                            return 1
                        }
                        else{
                            return 0
                        }
                    })
                })


            .on("mousemove", function(){return tooltip.style("top", (event.pageY-12)+"px").style("left",(event.pageX+12)+"px");})
            .on('mouseleave', function (d) {
                tooltip.style("visibility", "hidden")
                line.style('opacity',0.3)
                circle.style('opacity', 1)
                text.style("opacity", function(t) {
                    if (t === focus||t == focus.parent){return 0}
                    if (t.data.name == value||t.parent === focus){
                        return 1;
                    }
                    else if(t.r/4* k>9){
                        return 0.5
                    }
                    else{
                        return 0
                    }
                })
            });


        function diagonal(d, i) {
//            console.log(d)
            var result = {
                source: [],
                target: []
            }
            n = nodes.filter(t => t.depth==d.depth&&t.data.name==d.source&&t.parent.data.name==d.parent)
            result.source = [(n[0].x - v[0])* k,(n[0].y - v[1]) * k]
            n = nodes.filter(t => t.depth==d.depth&&t.data.name==d.target&&t.parent.data.name==d.parent)
            result.target = [(n[0].x - v[0])* k,(n[0].y - v[1]) * k]

    //            console.log(result)
            return result
        }
        d3.selectAll("#line").style('visibility', vis)
        if(tick.indexOf(focus.data.name)==-1 && focus.data.name != ''){

            force_n = forcenode.filter(d => d.parent != null &&d.parent.parent != null &&d.parent.parent.data.name==focus.parent.data.name&&d.parent.data.name==focus.data.name&& d.depth == 3)
            force_e = edges.filter(d=>d.time == focus.parent.data.name && focus.data.name==d.parent)
            link = g_force
                    .selectAll("line")
                    .data(force_e)
                    .enter().append("line")
                    .attr("stroke", "grey")
                    .attr("stroke-width", 1);


            svg_nodes = g_forcenodes.selectAll("circle")
                        .data(force_n)
                        .enter()
                        .append("circle")
                        .attr('r',d=>d.r*1.5)
    					.attr("stroke","black")
                        .attr("fill","white")
                        .on('mouseover', function(d) {
                            tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value + "\n" + "COUNT: " + d.data.count);
                            id = force_e.filter(t => t.source.data.id==d.data.id).map(d => d.target.data.id)
                            id = id.concat(force_e.filter(t => t.target.data.id==d.data.id).map(d => d.source.data.id))
                            nodetext.style("opacity",function (nodes) {
                                if(id.indexOf(nodes.data.id)>-1){
                                        return 1;
                                }
                                else if(nodes.data.id == d.data.id){
                                    return 1;
                                }
                                else
                                    return 0.1;

                            });

                            svg_nodes.style("opacity",function (nodes) {

                                if(id.indexOf(nodes.data.id)>-1){
                                        return 1;
                                }
                                else if(nodes.data.id == d.data.id){
                                    return 1;
                                }
                                else
                                    return 0.1;

                            });

                            link.style("opacity", function (link) {
                                if (link.source == d || link.target == d) {
                                    return 1;
                                }
                                if (link.source != d && link.target != d) {
                                    return 0.1;
                                }
                            });
               		})
                	.on("mousemove", function(){return tooltip.style("top", (event.pageY-12)+"px").style("left",(event.pageX+12)+"px");})
                	.on("mouseout", function(){tooltip.style("visibility", "hidden");link.style("opacity", 1);svg_nodes.style("opacity", 1);nodetext.style("opacity", 1)})
                        .call(drag)
                        .call(d3.zoom()
							.scaleExtent([0.1, 10])
							.on("zoom", zoomed))

            nodetext = g_forcenodes.selectAll("text")
                    .data(force_n)
                    .enter().append("text")
                      .attr("class", "forcetext")
                      .style("text-anchor", "middle")
                      .attr("font-size", function(d) { return d.r/4* k})
                //      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
                      .text(function(d) { return d.data.name; }).call(drag)


            var simulation = d3.forceSimulation(force_n)
                    .force("link", d3.forceLink(force_e).id(d => d.data.id))
                    .force("charge",d3.forceManyBody().strength(-1000).distanceMax(focus.r*k*2))
                    .force("center",d3.forceCenter((focus.x - v[0])* k,(focus.y - v[1]) * k))
                    .force("collide", d3.forceCollide().radius(d=>d.r*1.5))
                    .force("x", d3.forceX())
                    .force("y", d3.forceY())
                    .on("tick", () => {
                        link
                            .attr("x1", d => d.source.x)
                            .attr("y1", d => d.source.y)
                            .attr("x2", d => d.target.x)
                            .attr("y2", d => d.target.y);

                        nodetext.attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
                        svg_nodes
                            .attr("cx", d => d.x)
                            .attr("cy", d => d.y)
                        });
            circle.style('opacity',function(d){
                        if(d.parent==focus){return 0}
                        else{return 1}
                   })
                   .on('mouseover', function (d) {
                        if(d.depth < 2){
                            tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value);
                        }
                        else{
                            tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value + "\n" + "COUNT: " + d.data.count);
                        }
                   })
                   .on("mousemove", function(){return tooltip.style("top", (event.pageY-12)+"px").style("left",(event.pageX+12)+"px");})
                   .on('mouseleave', function (d) {
                        tooltip.style("visibility", "hidden")
                   })
                   .attr("r", function(d) { return d.r * k; });
            text.attr("font-size", function(d) {
                        if(d.parent===root){
                            return 11
                        }
                        if (d.r/4* k<9){
                            return 9
                        }
                        else{
                            return d.r/4* k
                        }
                    }).style("opacity", function(d) {
                        if (d.data.name == 'ALL'||d == focus.parent||d.parent==focus){return 0}
                        else if(d === focus||d.r/4* k>9){
                            return 0.5
                        }
                        else{
                            return 0
                        }
                    })
        }
        else{
        circle.attr("r", function(d) { return d.r * k; })
            .on('mouseover', function (d) {
                if(d.depth < 2){
//                    console.log('in')
                    tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value);
                }
                else{
                    tooltip.style("visibility", "visible").text(d.data.name + "\n" + "TF-IDF: " + d.value + "\n" + "COUNT: " + d.data.count);
                }
                if(timeRange.toString() != ['2020-10-08 09:00','2020-10-08 10:30'].toString()){
                if(d.data.name != ''&&tick.indexOf(d.data.name)==-1){
//                    console.log('in')
                    circle.style('opacity', function(t){
                        if(d.data.name == t.data.name){
                            return 1
                        }
                        else{
                            return 0.1
                        }
                    })
                    text.style('opacity', function(t){
                        if(d.data.name == t.data.name){
                            return 1
                        }
                        else{
                            return 0
                        }
                    })
                }
                }
            })
            .on("mousemove", function(){return tooltip.style("top", (event.pageY-12)+"px").style("left",(event.pageX+12)+"px");})
            .on('mouseleave', function (d) {
                tooltip.style("visibility", "hidden")
                circle.style('opacity', 1)
                text.style("opacity", function(t) {
                    if (t === focus||t == focus.parent){return 0}
                    if (t.data.name == value||t.parent === focus){
                        return 1;
                    }
                    else if(t.r/4* k>9){
                        return 0.5
                    }
                    else{
                        return 0
                    }
                })
            });
        text.attr("font-size", function(d) {
            if(d.parent===root){
                return 11
            }
            if (d.r/4* k<9){
                return 9
            }
            else{
                return d.r/4* k
            }
        }).style("opacity", function(d) {
            if (d === focus||d.data.name == 'ALL'||d == focus.parent){return 0}
            if (d.data.name == value||d.parent === focus){
                return 1;
            }
            else if(d.r/4* k>9){
                return 0.5
            }
            else{
                return 0
            }
        })
        }
    }
}
function chartByLabel(label) {
//    d3.select('#button3').attr('stroke','black')
    namelist = ball_color.filter(d => d.value==label).map(d => d.key)
    datasetSlice = initialDataset['children'].filter(d => namelist.indexOf(d.name)>-1)
    t = datasetSlice.map(d => d.name)
    dataconnect = ball_connect.filter(d => t.indexOf(d.parent)>-1||(t.indexOf(d.source)>-1&&t.indexOf(d.target)>-1))
    selecttime = datasetSlice.map(d => d.time)
    yxis.selectAll('text')
        .style('fill', function(d) {
            Y = d.getFullYear() + '-';
            M = (d.getMonth()+1 < 10 ? '0'+(d.getMonth()+1) : d.getMonth()+1) + '-';
            D = '0'+d.getDate() + ' ';
            hour = (d.getHours() < 10 ? '0'+d.getHours() : d.getHours())+ ':';
            mm = (d.getMinutes() < 10 ? '0'+d.getMinutes() : d.getMinutes());
            x = Y+M+D+hour+mm
            if (selecttime.indexOf(x)>-1){
                return strokecolor[label]
            }
            else{
                return 'black'
            }
             })
    d3.select('#circle').remove()
//    yxis.selectAll('text').style('fill', 'black')
    circle_pack()
}

function genData() {
    buttonlDate = new Date(timeRange[0])
    button2Date = new Date(timeRange[1])
    datasetSlice = initialDataset['children'].filter(d => buttonlDate <= new Date(d.time) && button2Date >= new Date(d.time))
    t = datasetSlice.map(d => d.name)
    dataconnect = ball_connect.filter(d => t.indexOf(d.parent)>-1||(t.indexOf(d.source)>-1&&t.indexOf(d.target)>-1))
    d3.select('#circle').remove()
    yxis.selectAll('text').style('fill', 'black')
    circle_pack()
}

function wordSelect() {
    datasetSlice = []
    yxis_color = {}
    buttonlDate = new Date(timeRange[0])
    button2Date = new Date(timeRange[1])
    for (i = 0; i < initialDataset['children'].length; i++) {
        yxis_color[new Date(initialDataset['children'][i].time)] = 'black'
        if (buttonlDate <= new Date(initialDataset['children'][i].time) &&
            button2Date >= new Date(initialDataset['children'][i].time)) {
            if(initialDataset['children'][i]['children'].map(d => d.name).indexOf(value)>-1){
                yxis_color[new Date(initialDataset['children'][i].time)] = 'red'
                datasetSlice.push(initialDataset['children'][i])
            }
            else if(initialDataset['children'][i]['children'].map(d => d.children).filter(d => d.map(d => d.name).indexOf(value)>-1).length != 0){
                yxis_color[new Date(initialDataset['children'][i].time)] = 'blue'
                datasetSlice.push(initialDataset['children'][i])
            }
        }
    }

    t = datasetSlice.map(d => d.name)
    dataconnect = ball_connect.filter(d => t.indexOf(d.parent)>-1||(t.indexOf(d.source)>-1&&t.indexOf(d.target)>-1))
    console.log(dataconnect)
    d3.select('#circle').remove()
    yxis.selectAll('text').style('fill', function(d) {
    return yxis_color[d]})
    d3.select('#circle').remove()
    circle_pack()
}


var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.pack()
    .size([h - margin, h - margin])
    .padding(2);

d3.json("./tw_cooccur_word.json", function(error, root) {
    initialDataset = root
    if (error) throw error;
    console.log(root)

    for (let i = 0; i < timestep.length; i++) {
        timestep[i] = new Date(timestep[i])
    }

    var y = d3.scaleTime()
        .domain([new Date(2020, 9, 8, 9,0,0), new Date(2020, 9, 8, 10,30,0)])
        .range([0, h-padding.top]);//定义x轴范围

    var formatMonth = d3.axisRight(y)
        .tickValues(timestep).tickFormat((d, i) => {
            return tick[i]
        })
    yxis.attr('transform', "translate(0"  + "," + (padding.top) + ")")
    let yAxisMonth = yxis.call(formatMonth).selectAll("text").style("text-anchor", "start");
    var brushY = d3.brushY()
        .extent([[0, 0], [ywid, h-padding.top]])
        // 初始化刷选区域
        .on("end", updateChart)
    // 每次刷选后激活updateChart函数

    //创建刷子的框选区域大小
    svg_yxis.append("g")
        .attr("class", "brush").attr('transform', "translate(0"   + "," + (padding.top) + ")")
        .attr('width', ywid)
        .call(brushY); // 每次刷选后激活updateChart函数

    // brush以后激活的函数

    function updateChart(event) {
        //获取选中的坐标

        extent = d3.event.selection;

        // 如果没选中返回初始坐标，否则更新坐标
        if (!extent) {
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
            timeRange = [min, max]
        }
        else {
            timeRange = [y.invert(extent[0]), y.invert(extent[1])]
            svg.select(".brushY").call(brushY.move, null)
        }

        genData()
    }
    genData()
})

