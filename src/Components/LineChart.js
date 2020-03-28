import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

// const data = [
//     {
//         name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];

export default function Chart (props) {
    const data = props.data
    
    return(
        <Paper>
        <h4>Active Cases vs. Critical Cases</h4>
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 100, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases.active" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cases.critical" stroke="#82ca9d" />
        </LineChart>
    </Paper>
    )
}