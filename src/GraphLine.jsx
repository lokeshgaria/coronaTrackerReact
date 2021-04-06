import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

function GraphLine({casesType="cases"}) {
  
const [data, setData] = useState([]);

const options = {
  
  elements : {
    point : {
      radius : 0,
    },
  },
  mainAspectRatio : false , 
  tooltips : {
    mode : "index",
    intersect : false , 
    callbacks :{
      label : function (tooltipItem , data){
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales : {
    xAxes : [
      {
        type : "time",
        time : {
          format : "MM/DD/YY",
          tooltipFormat : "ll"
        },
      },
    ],
    yAxes : [
      {
        gridLines : {
          display : false , 
        }, 
        ticks : {
          callback : function (value , index , values) {
            return numeral(value).format("0a");
          }
        }
      }
    ]
  }
}

  useEffect(() => {
    const graphData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30').then(response => response.json()).then(data => {
       
        const chartData = buildChartData(data)
        setData(chartData);
      })
    }
    graphData();
  }, [casesType])

  const buildChartData = (data , casesType="recovered") =>{
    const chartData = [];
    let lastDataPoint ;

    for( let date in data.cases){
      if(lastDataPoint){
        const newDataPoint = {
          x : date ,
          y : data[casesType][date] - lastDataPoint,
        }
       chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    };
    return chartData;
  }

  return (
    <div>
      {data?.length > 0 && (
        <Line  
        options={options}
        data={{
        
        datasets : [{
         backgroundColor : "rgba(204 , 16 ,52 ,0.5)",
       boederColor : "#CC1034",
          data : data ,
        }]
     }}
     ></Line>
      )}
   
    </div>
  )
}

export default GraphLine
