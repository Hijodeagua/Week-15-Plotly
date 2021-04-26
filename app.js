function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultsarray[0];
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });
      
    buildGauge(result.wfreq);

    });
  };

function buildCharts(sample) {

  d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result= resultsarray[0];

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;


    // First Bubble
    var LayoutBubble = {

      title: "Bacteria Cultures Bubble Chart",
      margin: { t: 0 },
      xaxis: { title: "Id's" },
      hovermode: "closest",
      };

      var DataBubble = [
      {
        x: otu_ids,
        y: sample_values,
        text: labels,
        mode: "markers",
        marker: {
          color: otu_ids,
          size: values,
          }
      }
    ];

    Plotly.plot("bubble", DataBubble, LayoutBubble);

    //  Build a horizontal bar Chart
   
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var bar_data =[
      {
        title: "Top 10 Cultures Found",
        y: yticks,
        x:sample_values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"

      }
    ];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bar_data, barLayout);
  });
};
   
 
function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
};

init();
