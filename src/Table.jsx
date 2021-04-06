import React from 'react'
import './Table.css';
import numeral from "numeral";
function Table({countries}) {
    return (
        <div className="table">
         <tr>
             <td>Country</td>
             <td>Cases</td>
            
         </tr>
            {
                countries.map(({country , cases  })  =>(
                    <tr>
                        <td>{ country}</td>
                        <td className="table__cases">{numeral(cases).format("0,0")}</td>
                        
                    </tr>
                ))
            }
        </div>
    )
}

export default Table  ;
