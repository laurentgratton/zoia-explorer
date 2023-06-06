var zoia;
var currPage = 0;
function gridData() {
  var data = [];
  var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  var width = 30;
  var height = 30;
  var click = 0;

  // iterate for rows
  for (var row = 0; row < 5; row++) {
    data.push( [] );

    // iterate for cells/columns inside rows
    for (var column = 0; column < 8; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        click: click,
        id: column + row * 8,
        info: {}
      })
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width + 12;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height + 12;
  }
  if(zoia){
    zoia.pages[currPage].modules.map(module => {
      module.blocks = zoiaTemplate.modules[module.type].calcBlocks({
        "id": module.id,
        "blocks":zoiaTemplate.modules[module.type].blocks,
        "options": module.options
      })
      data[Math.floor(module.position / 8)][module.position % 8].info = {
        "id": module.id,
        "color" : zoiaTemplate.colors[module.color].hexColor,
        "module": zoiaTemplate.modules[module.type],
        "block": module.blocks[0],
        "options": module.options,
        "moduleName": module.moduleName
      }

      if(module.blocks.length > 1) {
        var startX = (module.position  + 1) % 8;
        var currY = Math.floor(module.position / 8);
        var startY = currY;
        var totalBlocks = 0;
        currX = startX;
        while (totalBlocks < module.blocks.length){
          data[currY][currX].info = {
            "id": module.id,
            "color" : zoiaTemplate.colors[module.color].hexColor,
            "module": zoiaTemplate.modules[module.type],
            "block": module.blocks[currX - startX + ((currY- startY) * 8)],
            "options": module.options
          }
          totalBlocks++;
          currX++;
          if(currX === 8){
            currX = 0;
            currY++;
          }
          if(currY === 5) {
            break;
          }
        }
      }
    })
    var pageText = zoia.pages[currPage].name || "Page# " + (currPage + 1);
    pageText += " (" + (currPage + 1) + " of " + zoia.pages.length + ")";
    document.getElementById('page-name').textContent = pageText;
  }
  return data;
}

var pageData;
function initd3() {
  var dispatcher = d3.dispatch('nodeSelectGrid', 'nodeSelectGraph');
  var grid = d3.select("#grid")
    .append("svg")
    .attr("width","340px")
    .attr("height","220px");
  pageData = gridData();
  var row = grid.selectAll(".row")
    .data(pageData)
    .enter().append("g")
    .attr("class", "row");

  var column = row.selectAll(".square")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("class", function(d) {var classList = "square "; classList += "grid"+d.info.id; return classList})
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("width", function(d) { return d.width; })
    .attr("height", function(d) { return d.height; })
    .style("fill", function(d) { return d.info.color ? d.info.color : "#fff"})
    .style("stroke", "#222")
    .on('click', function(d) {
      showModule(d);
      dispatcher.call('nodeSelectGrid', this, d);
    });
  d3.select(".left-panel").append("button")
    .text("Next Page")
    .on("click", function(){
      if(zoia){
        currPage = (currPage + 1) % zoia.pages.length;
        row = grid.selectAll(".row");
        column = row.selectAll(".square");
        pageData = gridData();
        column.remove();
        row.remove();
        row = grid.selectAll(".row")
          .data(pageData)
          .enter().append("g")
          .attr("class", "row");

        column = row.selectAll(".square")
          .data(function(d) { return d; })
          .enter().append("rect")
          .attr("class", function(d) {var classList = "square "; classList += "grid"+d.info.id; return classList})
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.info.color ? d.info.color : "#fff"})
          .style("stroke", "#222")
          .on('click', function(d) {
            showModule(d);
            dispatcher.call('nodeSelectGrid', this, d);
          });
      }
    })



  networkWidth = 800;
  networkHeight = 800;
  var modules = zoia.pages.map(p => p.modules).flat();
  var svg = d3.select("#network-graph")
    .append('svg');
  var net = svg
    .attr('width',networkWidth)
    .attr('height', networkHeight)
    .append('g');

  var linkNode = net
    .selectAll("line")
    .data(zoia.connections)
    .enter()
    .append("g");
  var link = linkNode
    .append("line")
    .style("stroke", "#aaa")
    //.style("stroke-width", d => d.strength / 1000)
    .style("stroke-dasharray", ("5, 3"))
    .style("transition", "stroke-dashoffset 0s")
    .style("stroke-dashoffset", "0")
    .attr('data-to', d => 'graph' + d.origin.id)
    .attr('data-from', d => 'graph' + d.destination.id)
    .style('stroke-width', d => d.strength / 5000)

  var node = net
    .selectAll("circle")
    .data(modules)
    .enter()
    .append("g");

  var circles = node
    .append("circle")
    .attr("r", "10")
    .style("fill", function(d) {return zoiaTemplate.colors[d.color].hexColor;})
    .attr("id", function(d) {return "graph" + d.id})
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .on('click', function(d) {
      showModule(d);
      document.querySelectorAll("[data-to='graph" + d.id +"']").forEach(c => {
        c.classList.add('animateTo');
        setTimeout(() => {c.classList.remove('animateTo')}, 3000);
      });
      document.querySelectorAll("[data-from='graph" + d.id +"']").forEach(c => {
        c.classList.add('animateFrom');
        setTimeout(() => {c.classList.remove('animateFrom')}, 3000);
      });
      dispatcher.call('nodeSelectGraph', this, d);
    });

  var labels = node
    .append("text")
    .attr("class", "node-labels")
    .text(function(d) { return d.typeName})
    .attr('x', 12)
    .attr('y', 3)

  var simulation = d3.forceSimulation(modules)
    .force("link", d3.forceLink()
      .id(function(d) { return d.id})
      .links(zoia.connections)
    )
    .force("charge", d3.forceManyBody().strength(-500))
    .force("center", d3.forceCenter(networkWidth / 2, networkHeight / 2))
    .on("tick", ticked);

  var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

  drag_handler(node);

  var zoom = d3.zoom();
  var zoom_handler = zoom
    .on("zoom", zoom_actions);

  zoom_handler(svg);

  function ticked(){
    link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    })
  }
  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  function drag_start(d) {
    d3.select(this)
      .attr("cx", d.x = d3.event.x  )
      .attr("cy", d.y = d3.event.y  );
  }

  //make sure you can't drag the circle outside the box
  function drag_drag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function drag_end(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  function zoom_actions(){
    net.attr("transform", d3.event.transform)
  }


  dispatcher.on('nodeSelectGrid', function(item){
    document.querySelectorAll('.highlighted').forEach(node => node.classList.toggle('highlighted'));
    document.querySelectorAll('#graph'+item.info.id).forEach(node => node.classList.toggle('highlighted'));

  })
  dispatcher.on('nodeSelectGraph', function(item){
    console.log(item)
    currPage = zoia.pages.findIndex(c => c.id === item.page);
    row = grid.selectAll(".row");
    column = row.selectAll(".square");
    pageData = gridData();
    column.remove();
    row.remove();
    row = grid.selectAll(".row")
      .data(pageData)
      .enter().append("g")
      .attr("class", "row");

    column = row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class", function(d) {var classList = "square "; classList += "grid"+d.info.id; return classList})
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", function(d) { return d.info.color ? d.info.color : "#fff"})
      .style("stroke", "#222")
      .on('click', function(d) {
        showModule(d);
        dispatcher.call('nodeSelectGrid', this, d);
      });

    document.querySelectorAll('.highlighted').forEach(node => node.classList.toggle('highlighted'));
    document.querySelectorAll('.grid' + item.id).forEach(node => node.classList.toggle('highlighted'));

    var pageText = zoia.pages[currPage].name || "Page# " + (currPage + 1);
    pageText += " (" + (currPage + 1) + " of " + zoia.pages.length + ")";
    document.getElementById('page-name').textContent = pageText;
  })
}
