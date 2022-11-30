


let filename = 'data/CreativeOccupations.csv';

d3.csv(filename).then(function(loadedData) {
  let data =   [];
  let labels = [];
  
  for (let i=0; i<loadedData.length; i++) {
    let occupation = loadedData[i].occupation;
    labels.push(occupation);
    
    let count = loadedData[i].count;
    data.push(count);
  }
  

  let colors = generateColors(
    data,         // the data
    [0,50,100],   // rgb values for the first color
    [0,150,255]   // and for the other
  );
  
  let options = {
    
    // pie chart
    type: 'pie',
    

    data: {
      labels: labels,
      datasets: [{
        data: data,
        

        backgroundColor: colors,
        hoverBackgroundColor: 'rgb(0,150,100)'
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Creative Occupations (2020, in thousands)'
      },

      legend: {
        display: false
      }
    }
  };
  
  let chart = new Chart(document.getElementById('canvas'), options);
});



function generateColors(data, c1, c2) {
  
  // get the min/max values from the data
  let minVal = Math.min(...data);
  let maxVal = Math.max(...data);
  
  // convert those to color values
  let c = [];
  for (let d of data) {
    let r = scale(d, minVal,maxVal, c1[0],c2[0]);
    let g = scale(d, minVal,maxVal, c1[1],c2[1]);
    let b = scale(d, minVal,maxVal, c1[2],c2[2]);
    c.push('rgb(' + r + ',' + g + ',' + b + ')');
  }
  return c;
}

function scale(num, inMin, inMax, outMin, outMax) {
  return (num-inMin) * (outMax-outMin) / (inMax-inMin)+outMin;
}

