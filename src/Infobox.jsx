import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core';
import './Infobox.css';
export default function Infobox({title , cases , total , ...props}) {
    return (
        <Card className="infobox" 
         onClick={props.onClick}
         >
            <CardContent>
                {/** title */}
                <Typography color="textSecondary">{title}</Typography>
                {/** new cases added */}
                <h2 className="infobox__cases"> {cases}</h2>
                {/** Total number of cases */}
                <Typography className="infobox__total" color="textSecondary">{total} Total</Typography>   
            </CardContent>
        </Card>
    )
}
