import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import { Card, CardContent } from '@material-ui/core';
import Infobox from "./Infobox";
import Map from "./Map";
import Table from './Table';
import GraphLine from './GraphLine';
import {sortData , prettyText} from  './util.js';
import "leaflet/dist/leaflet.css";
//component starts here 
function App() {
  const [countries, setCountries] = useState([]);
  const [countryInfo , setCountryInfo] = useState({});
  const [table , setTable] =useState([]);
  const [country, setcountry] = useState("worldwide");
  const [mapCenter , setCenter] = useState({ lat : 34.80746 , lng : -40.4796});
  const [mapZoom ,  setZoom] = useState(3);
 const [mapCountries , setMapContries] = useState([]);
 const [casesType , setCasesType] = useState("cases");
  useEffect(()=>{
     const worldwide = async () =>{
       await fetch('https://disease.sh/v3/covid-19/all').then(response =>response.json()).then(data =>{
         setCountryInfo(data)
                
       })
     }
     worldwide();
  },[]);

  useEffect(() => {
    const getCountriesdata = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
         const sortedData =  sortData(data);
          setTable(sortedData);
          setMapContries(data);
        });
    };
    getCountriesdata();
  }, []);

 

  const changeCountry = async (event) => {
    const countrycode = event.target.value;
    
    const url = countrycode==="worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countrycode}?strict=true`;
     await fetch(url).then((response)=>response.json()).then((data) =>{
      
      setcountry(countrycode);
      setCountryInfo(data);
      console.log(data);  
      setCenter([ data.countryInfo.lat ,  data.countryInfo.long]);
      
      setZoom(4);
     
     })
    
  };
  console.table('country info',countryInfo);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={changeCountry} value={country}>
              <MenuItem value="worldwide">worldwide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem  value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        {/*infobox*/}
        <div className="app__stats">
          <Infobox  onClick={e => setCasesType("cases")} cases={prettyText(countryInfo.todayCases)  } title="corona cases" total={ prettyText(countryInfo.cases)} />
          <Infobox onClick={e => setCasesType("recovered")}  cases={prettyText(countryInfo.todayRecovered)} title="Recovered" total={prettyText(countryInfo.recovered)} />
          <Infobox  onClick={e => setCasesType("deaths")} cases={prettyText(countryInfo.todayDeaths)} title="Deaths" total={prettyText(countryInfo.deaths)} />
        </div>

        {/**Map*/}
        <Map
        casesType={casesType}
        center={mapCenter}
        zoom ={mapZoom}
        countries={mapCountries}
         />

        
      </div>
      <div className="app__right">
        <Card>
          <CardContent> 
            {/**table */}
            <h1>Live Cases by country</h1>
            <Table countries={table}></Table>
            
            {/** Graphs*/}
            <h1>World wide new cases</h1>
            <GraphLine></GraphLine>
          
          </CardContent>
        </Card>

      </div>

    </div>
  );
}

export default App;
