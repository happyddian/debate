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
tick = ['09:00 PAGE', '09:01 PAGE', '09:03 HARRIS', '09:05 PAGE PENCE', '09:08 PAGE HARRIS PENCE', '09:09 HARRIS PAGE PENCE', '09:10 PAGE', '09:11 PENCE', '09:12 PAGE PENCE HARRIS', '09:13 PAGE HARRIS', '09:14 HARRIS PAGE', '09:15 PENCE PAGE', '09:17 PAGE PENCE HARRIS', '09:19 PAGE', '09:20 PENCE', '09:21 PENCE PAGE HARRIS',  '09:23 PENCE PAGE', '09:24 PENCE PAGE HARRIS', '09:25 HARRIS', '09:27 PAGE PENCE HARRIS', '09:28 PAGE PENCE', '09:29 PAGE HARRIS PENCE', '09:30 HARRIS', '09:31 PAGE HARRIS PENCE', '09:32 PAGE PENCE', '09:33 PAGE PENCE', '09:34 HARRIS PENCE PAGE', '09:36 PAGE HARRIS', '09:38 PAGE', '09:39 PENCE', '09:40 PAGE PENCE HARRIS', '09:42 PAGE PENCE', '09:43 HARRIS PAGE', '09:45 PAGE PENCE', '09:46 PAGE HARRIS', '09:47 PENCE HARRIS', '09:48 PAGE HARRIS', '09:50 PAGE PENCE', '09:52 PAGE PENCE', '09:53 PAGE HARRIS PENCE', '09:55 PAGE PENCE', '09:56 PAGE PENCE', '09:57 PENCE', '09:59 PAGE PENCE', '10:00 HARRIS', '10:02 PAGE', '10:03 PENCE', '10:04 HARRIS', '10:05 HARRIS', '10:06 PAGE PENCE HARRIS', '10:07 PAGE PENCE', '10:08 HARRIS', '10:10 PAGE', '10:11 PENCE', '10:13 PAGE PENCE HARRIS', '10:14 PAGE HARRIS', '10:15 PAGE PENCE', '10:16 PAGE', '10:17 HARRIS PAGE', '10:18 PAGE', '10:19 HARRIS', '10:20 PAGE', '10:21 PENCE', '10:23 PAGE', '10:24 PENCE', '10:26 PAGE HARRIS', '10:27 PAGE'],
timestep = ['2020-10-08 09:00', '2020-10-08 09:01', '2020-10-08 09:03', '2020-10-08 09:05', '2020-10-08 09:08', '2020-10-08 09:09', '2020-10-08 09:10', '2020-10-08 09:11', '2020-10-08 09:12', '2020-10-08 09:13', '2020-10-08 09:14', '2020-10-08 09:15', '2020-10-08 09:17', '2020-10-08 09:19', '2020-10-08 09:20', '2020-10-08 09:21', '2020-10-08 09:23', '2020-10-08 09:24', '2020-10-08 09:25', '2020-10-08 09:27', '2020-10-08 09:28', '2020-10-08 09:29', '2020-10-08 09:30', '2020-10-08 09:31', '2020-10-08 09:32', '2020-10-08 09:33', '2020-10-08 09:34', '2020-10-08 09:36', '2020-10-08 09:38', '2020-10-08 09:39', '2020-10-08 09:40', '2020-10-08 09:42', '2020-10-08 09:43', '2020-10-08 09:45', '2020-10-08 09:46', '2020-10-08 09:47', '2020-10-08 09:48', '2020-10-08 09:50', '2020-10-08 09:52', '2020-10-08 09:53', '2020-10-08 09:55', '2020-10-08 09:56', '2020-10-08 09:57', '2020-10-08 09:59', '2020-10-08 10:00', '2020-10-08 10:02', '2020-10-08 10:03', '2020-10-08 10:04', '2020-10-08 10:05', '2020-10-08 10:06', '2020-10-08 10:07', '2020-10-08 10:08', '2020-10-08 10:10', '2020-10-08 10:11', '2020-10-08 10:13', '2020-10-08 10:14', '2020-10-08 10:15', '2020-10-08 10:16', '2020-10-08 10:17', '2020-10-08 10:18', '2020-10-08 10:19', '2020-10-08 10:20', '2020-10-08 10:21', '2020-10-08 10:23', '2020-10-08 10:24', '2020-10-08 10:26', '2020-10-08 10:27']
var ywid = 200
var brushY = d3.brushY()
    .extent([[0, 0], [ywid, h-padding.top]])
var svg_yxis = d3.select('#select_time').append("svg").attr('width', ywid).attr('height',h)
let yxis = svg_yxis.append("g").attr("class", "yxis")
var svg = d3.select('#vis_circle_pack').append("svg").attr('width', w).attr('height',h)

var tooltip = d3.select("body")
            .append("div")
            .style("position", "absolute")
            .style("background-color", "snow")
            .style("padding", "2px")
            .style("visibility", "hidden")
            .style("font-size", "5px")

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
    var forcenode =  _.cloneDeep(nodes);
    console.log(nodes)


    var circle = g.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
        .style("fill", function(d) {
            return d.children ? color(d.depth) : null;
        })
        .on("click", function(d) { if (focus !== d && d.children) zoom(d), d3.event.stopPropagation(); })


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
             tooltip.style("visibility", "visible").text(d.data.name + "\n" + d.value);
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
        var k = diameter / v[2]; view = v;
//        svg2 = d3.select('#vis_circle_pack').append("svg").attr('id', 'line_svg').attr('width', w).attr('height',h)
        g2 = svg.append('g').attr('id', 'line_svg').attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
        g_force = svg.append("g").attr("id", "forcedirect_links").attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        g_forcenodes = svg.append("g").attr("id", "forcedirect_nodes").attr("transform", "translate(" + diameter / 1.5 + "," + h / 2.5 + ")");
        const drag = d3.drag()
                .on('start', dragstarted)
                .on('end', dragended)
                .on('drag', dragged)
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
//        console.log(line)
        console.log(dataconnect.filter(d => d.depth==focus.depth+1&&d.freq>1))
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
            var result = {
                source: [],
                target: []
            }
            n = nodes.filter(t => t.depth==d.depth&&t.data.name==d.source&&t.parent.data.name==d.parent)
            result.source = [(n[0].x - v[0])* k,(n[0].y - v[1]) * k]
            n = nodes.filter(t => t.depth==d.depth&&t.data.name==d.target&&t.parent.data.name==d.parent)
            result.target = [(n[0].x - v[0])* k,(n[0].y - v[1]) * k]
//                console.log(result)
            return result
        }
        d3.selectAll("#line").style('visibility', vis)


//    var arc = d3.arc()
//            .innerRadius(function(d){
//            if (d.r*k < 4){
//                return d.r*k
//            }
////<!--            console.log(d.r)-->
//            else{
//                return d.r*k-2
//            }
//            })
//            .outerRadius(d => d.r*k)
//            .startAngle(0)
//            .endAngle(2*180)
//
//    arc1.attr("d", arc)
//            .attr("fill","red").style("opacity", function(d) { return d.parent === focus || d===focus ? 1 : 0; })
//            .attr("transform", d => "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k  + ")")
        circle.attr("r", function(d) { return d.r * k; })
            .on('mouseover', function (d) {
                tooltip.style("visibility", "visible").text(d.data.name + "\n" + d.value);
//
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
                        else if(t.depth==2&&t.children.map(d=>d.data.name).indexOf(d.data.name)>-1){
                            return 0.5
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


function genData() {
    datasetSlice = []

    buttonlDate = new Date(timeRange[0])
    button2Date = new Date(timeRange[1])
    for (i = 0; i < initialDataset['children'].length; i++) {
        if (buttonlDate <= new Date(initialDataset['children'][i].time) &&
            button2Date >= new Date(initialDataset['children'][i].time)) {
            datasetSlice.push(initialDataset['children'][i])
        }
    }
    t = datasetSlice.map(d => d.name)
//    dataconnect = connect.filter(d => t.indexOf(d.time)>-1)
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
//    dataconnect = connect.filter(d => t.indexOf(d.time)>-1)
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
//let grid = svg.append("g").attr("class", "grid")
//let axis = svg.append("g").attr("class", "axis")
//let separateLine = svg.append("line").attr("class", "separate-line")

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
brushY
    // 初始化刷选区域
    .on("end", updateChart)
// 每次刷选后激活updateChart函数

//创建刷子的框选区域大小
svg_yxis.append("g")
    .attr("class", "brush").attr('transform', "translate(0"   + "," + (padding.top) + ")")
    .attr('width', ywid)
    .call(brushY); // 每次刷选后激活updateChart函数
//创建x轴值域映射域
//<!--var x = d3.scaleTime()-->
//<!--    .domain([new Date(2020, 9, 8, 9,0,0), new Date(2020, 9, 8, 10,30,0)])-->
//<!--    .range([0, w - padding.left - padding.right]);//定义x轴范围-->
//
//<!--formatMonth = d3.axisBottom(x)-->
//<!--    .tickValues(timestep).tickFormat((d, i) => {-->
//<!--&lt;!&ndash;        console.log(tick[i])&ndash;&gt;-->
//<!--        return tick[i]-->
//<!--    })-->
//<!--console.log(x)-->
//
//<!--axis.attr('transform', "translate(" + padding.left + "," + (h / 10 - padding.bottom) + ")")-->
//<!--let xAxisMonth = axis.call(formatMonth).selectAll("text")-->
//<!--.attr("transform","rotate(-300)") .style("text-anchor", "start");-->
//
//<!--// 绘制x网格-->
//<!--const lineGroup = grid.attr("transform", "translate("+padding.left+",0)")-->
//<!--    .selectAll("g")-->
//<!--    .data(timestep)-->
//<!--    .enter().append("g")-->
//<!--lineGroup.append("line")-->
//<!--    .attr("x1", d => { return x(new Date(d)) })-->
//<!--    .attr("x2", d => { return x(new Date(d)) })-->
//<!--    .attr("y1", padding.top)-->
//<!--    .attr("y2", h / 10 - padding.bottom)-->
//<!--    .attr("class", "grid-line")-->
//<!--    .style("stroke", "#DCDCDC")-->
//<!--    .style("stroke-dasharray", 6)-->
//
//<!--// 添加坐标轴与拓扑图分隔线-->
//<!--separateLine.style("stroke", "#DCDCDC")-->
//<!--    .style("stroke-width", 2)-->
//<!--    .attr("x1", 0)-->
//<!--    .attr("x2", w)-->
//<!--    .attr("y1", h / 10 - padding.bottom)-->
//<!--    .attr("y2", h / 10 - padding.bottom)-->
//
//<!--//创建刷子-->
//<!--var brush = d3.brushX()-->
//<!--    .extent([[0, 0], [w - padding.right - padding.left, h / 8]])-->
//<!--    // 初始化刷选区域-->
//<!--    .on("end", updateChart)-->
//<!--// 每次刷选后激活updateChart函数-->
//
//<!--//创建刷子的框选区域大小-->
//<!--svg.append("g")-->
//<!--    .attr("class", "brush").attr('transform', "translate(" + padding.left + ","  + "0)")-->
//<!--    .attr('height', h / 8)-->
//<!--    .call(brush); // 每次刷选后激活updateChart函数-->
//
//// Add a clipPath: 这个区域不会被选中
//<!--var clip = svg.append("defs").append("svg:clipPath")-->
//<!--    .attr("id", "clip")-->
//<!--    .append("svg:rect")-->
//<!--    .attr("width", w)-->
//<!--    .attr("height", h / 8)-->
//<!--    .attr("x", 0)-->
//<!--    .attr("y", 0);-->

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
        svg.select(".brushY").call(brushY.move, timeRange)
    }

    genData()
}
  genData()
})

//readTextFile('./connect.json', function (data) {
//    histChart(JSON.parse(data))
//})