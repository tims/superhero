var ScoreChart = function (game) {
  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
  this.ticks = 0;

  var parseDate = d3.time.format("%d-%b-%y").parse;

  this.data = [];

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

  var line = d3.svg.line()
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.balance); });

  var svg = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Price ($)");

  svg.append("path")
    .attr("class", "line");

  this.update = function () {
    this.ticks++;
    if (this.ticks % 100 === 0) {
      this.data.push({
        date: new Date(),
        balance: game.score.score
      });
    }
  };

  this.draw = function () {
    x.domain(d3.extent(this.data, function (d) { return d.date; }));
    y.domain(d3.extent([{balance: 0}].concat(this.data), function (d) { return d.balance; }));

    xAxis.scale(x);
    svg.select("g.x.axis")
      .call(xAxis);

    yAxis.scale(y);
    svg.select("g.y.axis")
      .call(yAxis);

    if (!_.isEmpty(this.data)) {
      svg.select("path.line")
        .datum(this.data)
        .attr("d", line);
    }
  };
};
