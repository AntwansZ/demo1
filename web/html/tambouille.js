graph_data = [];
graph_labels = [];
raw_data = [];

var ph_graph;

function update_ph_data(new_data) {
  new_data.forEach(
    function(element) {
      graph_data.push(element.data[0]);
      graph_labels.push(element.time.split("T")[1].split(".")[0]);
      raw_data.push(element);
    });
  console.log(graph_data);  
}

function update_ph_graph() {
  window.ph_graph.update();
}

function draw_ph_graph(ctx) {

  ph_graph = new Chart(ctx, {
    type: 'line',
    data: {
      labels: graph_labels,
      datasets: [{
        label: 'PH',
        backgroundColor: "FF0000",
        borderColor: "FF0000",
        data: graph_data,
        fill: false,
      }]
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'PH of water'
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