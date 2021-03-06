import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";

const casesTypesColors = {
    cases: {
        hex: "red",
        multiplier: 220,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 1800,
    },
};

export const sortData = (data) => {
    const sortedData = [...data];

    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
}
//for formating the total numers of cases 
export const prettyText = (stat) => 
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";


// draw circles on the map 
export const showDataOnMap = (data, casesType) => (
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypesColors[casesType].hex}
            fillColor={casesTypesColors[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypesColors[casesType].multiplier
            }

        >
            <Popup>
                <div className="info-container">
                    <div className="info-flag"
                        style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="info-name"> {country.country} </div>
                    <div className="info-confirmed">Cases : {numeral(country.cases).format("0,0")} </div>
                    <div className="info-recovered">Recovered : {numeral(country.recovered).format("0,0")} </div>
                    <div className="info-deaths">Deaths : {numeral(country.deaths).format("0,0")} </div>
                </div>
            </Popup>
        </Circle>
    ))
)