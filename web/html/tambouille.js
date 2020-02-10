function show_hide_div(div_id){
  var x = document.getElementById(div_id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


function update_ph_data(graph, new_data) {
  graph.config.data.datasets[0].data.push(new_data.data[0]);
  graph.config.data.labels.push(new_data.time.split("T")[1].split(".")[0]);
  // console.log(graph_data);  
}

function draw_ph_graph(ctx, init_data, init_labels, station) {
  var text = "PH of water station" + station.toString();
  console.log(text);
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: init_labels,
      datasets: [{
        label: 'PH',
        backgroundColor: "FF0000",
        borderColor: "FF0000",
        data: init_data,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: text
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'PH Value'
          },
          ticks: {
            min :0, 
            max :14
          }
        }]
      }
    }
  });
}