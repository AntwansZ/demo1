var alldata = {};

var co2data = [];
var co2labels = [];
var co2graph = {};
var co2mindata = [];
var co2maxdata = [];
var co2activedata = [];
var co2activelabels = [];

var vehiclesdata = [];
var vehicleslabels = [];
var vehiclesgraph = {};
var firstDistributionSide = true;
var activevehiclesdata = [];
var activevehicleslabels = [];

var xMileage = [];
var yCO2 = [];
var xMileageactive = [];
var yCO2active =[];

var datasetarray = [];

/**
* Callback for click on bar
**/
function selectBrand(brandArg) {
	// console.log(brandArg);
	co2activedata = [];
	co2activelabels = [];
	var formatted = {};

	alldata.forEach( function(element, index) {
		if(element.brand == brandArg) {
			if (element.year in formatted) {
				formatted[element.year].push(Number(element.CO2));
			} else {
				formatted[element.year] = [];
				formatted[element.year].push(Number(element.CO2));
			}
		}
	});

	for (var key in formatted) {
		var tmplength = formatted[key].length;
		formatted[key] = [formatted[key].reduce( function (x, y) { return x + y } )];
		formatted[key][0] /= tmplength;
		formatted[key].push(tmplength);
	}

	for (var key in formatted) {
		co2activedata.push(formatted[key][0]);
		co2activelabels.push(key);		
	}

	newdataset = {
		backgroundColor: 'rgba(0, 0, 0, 1)',
		borderColor: 'rgba(0, 0, 0, 1)',
		data : co2activedata,
		label: "CO2",
		fill: false
	}

	// window.co2graphcanvas.config.data.labels = co2activelabels;
	window.co2graphcanvas.config.options.title.text = "Mean of CO2 emission for all brands and " + brandArg;
	if(window.co2graphcanvas.config.data.datasets.length == 1) {
		window.co2graphcanvas.config.data.datasets.push(newdataset);	
	}
	else {
		// console.log(window.co2graphcanvas.config.data.datasets);
		window.co2graphcanvas.config.data.datasets[1].data = co2activedata;	
	}
	window.co2graphcanvas.update();	




}

/**
* builds data for the CO2 graph
**/
function buildCo2Data(data) {
	alldata = data;
	var formatted = {};

	data.forEach( function(element, index) {
		if (element.year in formatted) {
			formatted[element.year].push(Number(element.CO2));
		} else {
			formatted[element.year] = [];
			formatted[element.year].push(Number(element.CO2));
		}
	});

	for (var key in formatted) {
		co2mindata.push(formatted[key].reduce( function (x, y) {
			if (x != 0) {
				if (y != 0) {
					return Math.min(x, y);
				}
				else {
					return x;
				}
			}
			else {
				return y;
			}
		}));
		co2maxdata.push(Math.max(...formatted[key]));
		var tmplength = formatted[key].length;
		formatted[key] = [formatted[key].reduce( function (x, y) { return x + y } )];
		formatted[key][0] /= tmplength;
		formatted[key].push(tmplength);
	}

	for (var key in formatted) {
		co2data.push(formatted[key][0]);
		co2labels.push(key);		
	}
	co2activedata = co2data;
	co2activelabels = co2labels;
	// console.log("labels then data");
	// console.log(co2labels);
	co2graph = {
			labels: co2activelabels,
			datasets: [{
				backgroundColor : randomColor("0.8"),
				data : co2activedata,
				label: "CO2",
				fill: true
			}
			]
		};
}

/**
* Draws C02 graph
**/
function drawCo2Graph(ctx) {

	return new Chart(ctx, {
    type: 'line',
    data: co2graph,
    options: {
    	title:{
    		display: true,
    		text: "Mean of CO2 emission for all brands"
    	},
    	    annotation: {
    				drawTime: 'afterDatasetsDraw', // (default)
    				events: ['click'],
    				dblClickSpeed: 350, // ms (default)
    				annotations: [{
    					drawTime: 'afterDraw', // overrides annotation.drawTime if set
    					id: 'a-line-2', // optional
    					type: 'line',
    					mode: 'vertical',
    					scaleID: 'x-axis-0',
    					value: '2001',
    					borderColor: 'black',
    					borderWidth: 1,
    					label: {
    						enabled: true,
    						content: 'Euro III'
    					}
    				},
    				{
    					drawTime: 'afterDraw', // overrides annotation.drawTime if set
    					id: 'a-line-3', // optional
    					type: 'line',
    					mode: 'vertical',
    					scaleID: 'x-axis-0',
    					value: '2006',
    					borderColor: 'black',
    					borderWidth: 1,
    					label: {
    						enabled: true,
    						content: 'Euro IV'
    					}
    				},
    				{
    					drawTime: 'afterDraw', // overrides annotation.drawTime if set
    					id: 'a-line-4', // optional
    					type: 'line',
    					mode: 'vertical',
    					scaleID: 'x-axis-0',
    					value: '2011',
    					borderColor: 'black',
    					borderWidth: 1,
    					label: {
    						enabled: true,
    						content: 'Euro V'
    					}
    				},
    				{
    					drawTime: 'afterDraw', // overrides annotation.drawTime if set
    					id: 'a-line-5', // optional
    					type: 'line',
    					mode: 'vertical',
    					scaleID: 'x-axis-0',
    					value: '2015',
    					borderColor: 'black',
    					borderWidth: 1,
    					label: {
    						enabled: true,
    						content: 'Euro VIb'
    					}
    				}]
    			}
    }   
	});
}

/**
* Builds a dict with car brands
**/
function allVehicles(data) {

	var res = {};
	data.forEach( function(element, index) {
		if(element.brand in res){
			res[element.brand] += 1;
		} else {
			res[element.brand] = 1;
		}
	});
	return res;
}

/**
* Builds vehicle data for plotting
**/
function buildVehiclesData(data) {
	var tempdata = allVehicles(data);
	var tempdata2 = []
	
	for (var key in tempdata){
		tempdata2.push([key, tempdata[key]]);
	}
	
	tempdata2.sort((a, b) => b[1] - a[1]);

	tempdata2.forEach( function(element, index) {
		vehicleslabels.push(element[0]);
		vehiclesdata.push(element[1]);
	});
	activevehiclesdata = vehiclesdata;
	activevehicleslabels = vehicleslabels;
	vehiclesgraph = {
		labels: activevehicleslabels,
		datasets: [{
			backgroundColor: randomColor("0.8"),
			data: activevehiclesdata,
			fill: true,
			label: "brands"
		}]
	};
}

/**
* Creates the render object of vehicle distribution
**/
function drawVehiclesGraph(ctx) {
	return new Chart(ctx, 
		{
			type: 'bar',
			data: vehiclesgraph,
			options: {
				'onClick': function(evt, item) {
					if(item.length != 0)
					selectBrand(activevehicleslabels[item[0]._index]);
				},
				title: {
					display: true,
					text: "Number of vehicle entries by brand"
				},
				scales: {
					yAxes: [{
						type: 'linear'
					}],
			    xAxes: [{
			      ticks: {
			        autoSkip: false
			      }
			    }]
  			}
			}
		});
}

/**
* Returns a random color
**/
function randomColor(opacity) {
	var r = Math.floor(Math.random() * Math.floor(255));
	var g = Math.floor(Math.random() * Math.floor(255));
	var b = Math.floor(Math.random() * Math.floor(255));
	return "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + opacity + ")";
}


function switchDistributionGraph() {

	// console.log("button pressed");

	if (firstDistributionSide) {
		firstDistributionSide = false;
		var splitindex = Math.floor(vehiclesdata.length/2);
		activevehiclesdata = vehiclesdata.slice(0, splitindex);
		activevehicleslabels = vehicleslabels.slice(0, splitindex);
	}
	else {
		firstDistributionSide = true;
		var splitindex = Math.floor(vehiclesdata.length/2);
		activevehiclesdata = vehiclesdata.slice(splitindex, vehiclesdata.length);
		activevehicleslabels = vehicleslabels.slice(splitindex, vehiclesgraph.length);
	}
	window.vehiclesgraphcanvas.config.data.labels = activevehicleslabels;
	window.vehiclesgraphcanvas.config.data.datasets[0].data = activevehiclesdata;
	
	window.vehiclesgraphcanvas.update();
}

function buildCO2MileageData(data) {

	co2mileagetmp = {}
	data.forEach( function(element, index) {
		if(element.CO2 != "" && element.combined != "") {
			if (element.combined in co2mileagetmp) {
				co2mileagetmp[(element.combined)].push(element.CO2);
			} else {
				co2mileagetmp[(element.combined)] = [];
				co2mileagetmp[(element.combined)].push(element.CO2);
			}
		}
	});


	for (var key in co2mileagetmp) {
		var tmplength = co2mileagetmp[key].length;
		co2mileagetmp[key] = [co2mileagetmp[key].reduce( function (x, y) { return x + y } )];
		co2mileagetmp[key][0] /= tmplength;
	}
	tosort = []
	for (var key in co2mileagetmp) {
		tosort.push([parseFloat(key)	, co2mileagetmp[key][0]]);
	}
	tosort.sort((a, b) => a[0] - b[0]);


	var lastX;
	var lastY;
	var lastSlope = 0;
	var count = 0;

	/**
	
	The loop here only adds elements that are "close" to the 
	mean slope which is 22. This allows to clear unwanted data

	**/
	tosort.forEach( function(element, index) {	
		if( Math.abs(element[1]/element[0]-22) < 7 ) {
			yCO2active.push(element[1]);
			xMileageactive.push(element[0]);
		}
		else {
			console.log(element);
			console.log(Math.abs(element[1]/element[0]-22));
			console.log("\n");
		}
	});
}

function drawCO2MileageGraph(ctx) {

	var linetop = [];
	var linebot = [];

	// make lines that surround dataset with pente de 22 - 23

	xMileageactive.forEach( function(element, index) {
		linetop.push(23*element);
		linebot.push(22*element);
	});

	co2mileage= {
		labels: xMileageactive,
		datasets: [{
			backgroundColor : randomColor("0.8"),
			data : yCO2active,
			label: "CO2 emissions by mixed consumption",
			fill: true
		}

		]
	}

return new Chart(ctx, {
    type: 'line',
    data: co2mileage,
    options: {
    	title:{
    		display: true,
    		text: ""
    	},
    	scales: {
    		yAxes: [{
    			display: true,
					scaleLabel: {
						display: true,
						labelString: 'CO2 Emissions (g/km)'
					}
    		}],
    		xAxes: [{
    			display: true,
					scaleLabel: {
						display: true,
						labelString: 'Consumption (L/100)'
					}
    		}]
    	}
    }   
	});	

}

// function getTransmissions(data) {
// 	var trlist = [];

// 	var regex = /((A|D|M)[0-9])|([0-9](A|D|M))/g;

// 	data.forEach( function(element, index) {
// 		if (! trlist.includes(element.transmission) && element.transmission.length <= 5) {
// 			trlist.push(element.transmission);
// 		}
// 	});

// 	var keep = []

// 	trlist.forEach( function(element, index) {
// 		if(element.match(regex)) {
// 			keep.push(element);
// 		}
// 	});

// 	trdict = {};

// 	var regexDrive = /M|A|D/;
// 	var regexGear = /[0-9]/; 

// 	keep.forEach( function(element, index) {
// 		temp = {};
// 		if(element.match(regexDrive) != 'none' && element.match(regexGear) != 'none') {
// 			if (element.match(regexDrive)[0] == 'D') {
// 				temp['drive'] = 'A';	
// 			}
// 			else {
// 				temp['drive'] = element.match(regexDrive)[0];
// 			}
// 			temp['gears'] = element.match(regexGear)[0];
// 			trdict[element] = temp;
// 		}
// 	});

// 	data.forEach( function(element, index) {
// 		if(keep.includes(element.transmission))
// 			console.log("pouet");
// 	});

// 	console.log(trdict);
// 	return keep;
// }

function getTransmissions(data) {
	okM = ["M4", "4M", "5M", "M5" , "6M", "M6", "7M", "M7"]
	okA = ["A4", "A5", "A6", "A7", "A8", "A9", "A10", "4A", "5A", "6A", "7A", "8A", "9A", "10A" ]

	var regexgears = /[0-9]/;

	var manuals = [[],[],[],[]]
	var autos = [[],[],[],[],[],[]]

	var autosmean = [];
	var manualsmean = []

	data.forEach( function(element, index) {
		if(okM.includes(element.transmission)) {
			manuals[element.transmission.match(regexgears)[0]-4].push(element.CO2);
		}
		else if(okA.includes(element.transmission)) {
			autos[element.transmission.match(regexgears)[0]-4].push(element.CO2);
		}
	});

	// console.log(autos);
	// console.log(manuals);
	autos.forEach( function(element, index) {
		var total = 0;
		element.forEach( function(element, index) {
			total += element;
		});
		total /= element.length;
		autosmean.push(total);
	});

	manuals.forEach( function(element, index) {
		var total = 0;
		element.forEach( function(element, index) {
			total += element;
		});
		total /= element.length;
		manualsmean.push(total);
	});

	manualsmean.push(0);
	manualsmean.push(0);

	console.log(autosmean);
	console.log(manualsmean);

	// datasetarray = [];

	for (var i = 0; i < autosmean.length; ++i) {

		datasetarray.push(
			{
				label: (i+4).toString()+' Gears Gearboxes',
				backgroundColor: randomColor("0.8"),
				data: [manualsmean[i], autosmean[i]]
			}			
			)
	}
	console.log(datasetarray);
}

function drawTransmission(ctx) {

	return new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Manual', 'Automatic'],
					datasets: datasetarray
				},
				options: {
					title: {
						display: true,
						text: 'Transmission impact'
					},
					tooltips: {
						mode: 'index',
						intersect: false
					},
					responsive: true,
					scales: {
						xAxes: [{
							stacked: false,
						}],
						yAxes: [{
							stacked: false
						}]
					}
				}
			});
}