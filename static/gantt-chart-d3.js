/**
 * @author Dimitry Kudrayvtsev
 * @version 2.1
 */
d3.gantt = function () {
	var FIT_TIME_DOMAIN_MODE = "fit";
	var FIXED_TIME_DOMAIN_MODE = "fixed";

	var margin = {
		top: 10,
		right: 30,
		bottom: 10,
		left: 120
	};
	var selector = '#Gant';
	var timeDomainStart = d3.time.day.offset(new Date(), -3);  //默认图表没有数据的初始时间 天数往前3天
	var timeDomainEnd = d3.time.hour.offset(new Date(), +3);  //默认图表没有数据的结束时间  小时数往后3小时
	var timeDomainMode = FIT_TIME_DOMAIN_MODE;// fixed or fit
	var taskTypes = [];
	var taskStatus = [];
	var heights = $("#Gant").height();
	var width = $("#Gant").width();

	var end;//test
	// var heights = document.getElementById('Gant').offsetHeight;
	// var width = document.getElementById('Gant').offsetWidth;
	// var heights = document.getElementById('Gant').clientHeight;
	// var width = document.getElementById('Gant').clientWidth;
	// console.log(heights, width);
	// var height = document.body.clientHeight - margin.top - margin.bottom-5;
	// var width = document.body.clientWidth - margin.right - margin.left-5;
	var height = heights - margin.top - margin.bottom - 30;  // 200 div的高度
	var width = width - margin.right - margin.left -50;  //600 div的宽度
	var tickFormat = "%H:%M";


	var keyFunction = function (d) {
		return d.startDate + d.taskName + d.endDate;
	};

	var rectTransform = function (d) {
		return "translate(" + x(d.startDate) + "," + y(d.taskName) + ")";
	};


	var x = d3.time.scale().domain([timeDomainStart, timeDomainEnd]).range([0, width]).clamp(true);

	var y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([0, height - margin.top - margin.bottom], .1);

	var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(3)
		.tickSize(8).tickPadding(8);
	//初始化x轴的 标尺刻度以及长度
	var yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

	var oldEnd; //旧时间存储

	//初始化y轴的 标尺刻度以及长度
	var initTimeDomain = function (tasks) {
		if (timeDomainMode === FIT_TIME_DOMAIN_MODE) {
			if (tasks === undefined || tasks.length < 1) {
				timeDomainStart = d3.time.day.offset(new Date(), -3);
				timeDomainEnd = d3.time.hour.offset(new Date(), +3);
				return;
			}
			tasks.sort(function (a, b) {
				return a.endDate - b.endDate;
			});
			timeDomainEnd = tasks[tasks.length - 1].endDate;
			oldEnd  = timeDomainEnd;
			tasks.sort(function (a, b) {
				return a.startDate - b.startDate;
			});
			timeDomainStart = tasks[0].startDate;
			end = tasks[0].end;
		}
	};

	var initAxis = function () {

		//实时
		// var timevalue = [];//下标设置
		// timeDomainEnd = d3.time.hour.offset(timeDomainStart, 3);//设置结束刻度
		// var temptime = timeDomainStart;
		// var steps = 45;  //加45分钟
		// var num = 0;
		// var tickSubdivide = 3;  //刻度三
		// while (temptime <= timeDomainEnd) {
		// 	// statement
		// 	timevalue[num] = temptime;
		// 	num++;
		// 	temptime = d3.time.minute.offset(temptime, steps);
		// }

		var timevalue = [];//下标设置
		timeDomainEnd = d3.time.minute.offset(timeDomainStart, 10);//设置结束刻度

		if(oldEnd >= timeDomainEnd){
			console.log('连续接数据');
			timeDomainEnd = oldEnd;
		}

		// console.log(timeDomainEnd,'结束时间');
		var temptime = timeDomainStart;
		var steps = 1;  //加1分钟
		var num = 0;
		var tickSubdivide = 1;  //刻度三
		while (temptime <= timeDomainEnd) {
			// statement
			timevalue[num] = temptime;
			num++;
			temptime = d3.time.minute.offset(temptime, steps);
		}

		// 仿真
		if (end) {
			// 结束时间
			timevalue = []; //下标设置
			timeDomainEnd = end;
			temptime = timeDomainStart;
			steps = 1;  //加一分钟
			var nums = 0;
			tickSubdivide = 3; // 刻度1
			while (temptime <= timeDomainEnd) {
				timevalue[nums] = temptime;
				nums++;
				temptime = d3.time.minute.offset(temptime, steps);
			}
			temptime[nums] = timeDomainEnd;
			// console.log(temptime)	
		}



		x = d3.time.scale().domain([timeDomainStart, timeDomainEnd]).range([0, width]).clamp(true);
		y = d3.scale.ordinal().domain(taskTypes).rangeRoundBands([0, height - margin.top - margin.bottom], .1);
		xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format(tickFormat)).tickSubdivide(tickSubdivide)
			.tickSize(8).tickPadding(8)
			.tickValues(timevalue);

		yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);
	};

	function gantt(tasks) {

		initTimeDomain(tasks);
		initAxis();
		// console.log(tasks)
		var svg = d3.select(selector)
			.append("svg")
			.attr("class", "chart")
			.attr("width", width + margin.left + margin.right)   //SVG 大小设置
			.attr("height", height + margin.top + margin.bottom)
			.append("g")
			.attr("class", "gantt-chart")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

		svg.selectAll(".chart")
			.data(tasks, keyFunction).enter()
			.append("rect")
			.attr("rx", 5)
			.attr("ry", 5)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) { return "bar"; }
				return taskStatus[d.status];
			})
			.attr("y", 0)
			.attr("transform", rectTransform)
			.attr("height", function (d) { return y.rangeBand(); })
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});


		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0, " + (height - margin.top - margin.bottom) + ")")
			.transition()
			.call(xAxis);

		// svg.append("g").attr("class", "y axis").transition().call(yAxis);
		// svg.append("g")
		// .call(yAxis)
		// .append("text")
		// .text(d3.time.format("%H:%M")(timeDomainStart))
		// .attr("transform","translate("+0+","+(height-20)+")")
		// .attr("text-anchor","end")

		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.text("传感器")
		.attr("transform","translate(20,-10)")
		.attr("text-anchor","end")
		.attr("dy","1em")
		.transition()
		

		return gantt;

	};

	gantt.redraw = function (tasks) {

		initTimeDomain(tasks);
		initAxis();

		var svg = d3.select(".chart");

		var ganttChartGroup = svg.select(".gantt-chart");
		var rect = ganttChartGroup.selectAll("rect").data(tasks, keyFunction);

		rect.enter()
			.insert("rect", ":first-child")
			.attr("rx", 5)
			.attr("ry", 5)
			.attr("class", function (d) {
				if (taskStatus[d.status] == null) { return "bar"; }
				return taskStatus[d.status];
			})
			.transition()
			.attr("y", 0)
			.attr("transform", rectTransform)
			.attr("height", function (d) { return y.rangeBand(); })
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});

		rect.transition()
			.attr("transform", rectTransform)
			.attr("height", function (d) { return y.rangeBand(); })
			.attr("width", function (d) {
				return Math.max(1, (x(d.endDate) - x(d.startDate)));
			});

		rect.exit().remove();

		svg.select(".x").transition().call(xAxis);
		svg.select(".y").transition().call(yAxis);

		return gantt;
	};

	gantt.margin = function (value) {
		if (!arguments.length)
			return margin;
		margin = value;
		return gantt;
	};

	gantt.timeDomain = function (value) {
		if (!arguments.length)
			return [timeDomainStart, timeDomainEnd];
		timeDomainStart = +value[0], timeDomainEnd = +value[1];
		return gantt;
	};

    /**
     * @param {string}
     *                vale The value can be "fit" - the domain fits the data or
     *                "fixed" - fixed domain.
     */
	gantt.timeDomainMode = function (value) {
		if (!arguments.length)
			return timeDomainMode;
		timeDomainMode = value;
		return gantt;

	};

	gantt.taskTypes = function (value) {
		if (!arguments.length)
			return taskTypes;
		taskTypes = value;
		return gantt;
	};

	gantt.taskStatus = function (value) {
		if (!arguments.length)
			return taskStatus;
		taskStatus = value;
		return gantt;
	};

	gantt.width = function (value) {
		if (!arguments.length)
			return width;
		width = +value;
		return gantt;
	};

	gantt.height = function (value) {
		if (!arguments.length)
			return height;
		height = +value;
		return gantt;
	};

	gantt.tickFormat = function (value) {
		if (!arguments.length)
			return tickFormat;
		tickFormat = value;
		return gantt;
	};

	gantt.selector = function (value) {
		if (!arguments.length)
			return selector;
		selector = value;
		return gantt;
	};

	return gantt;
};
