import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label} from "recharts";

const RenderLineChart = (props) => {
    const tempData = props.gameDate;
    // console.log(tempData);
    tempData.sort((a,b) => a.date.localeCompare(b.date));
    return (
        <LineChart width={600} height={330} data={tempData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle="-25" tick={{fontSize:11}} dy={8}>
                <Label value="Date" position="insideBottom" dy={10}/>
            </XAxis>
            <YAxis label={{value: "Count", angle: -90, position: "insideLeft", dx: 10}}/>
            <Tooltip/>
            <Legend verticalAlign="top" align="right"/>
            <Line name="Finished Game" type="monotone" dataKey="NumPlayedGame" stroke="#0095FF"/>
            <Line name="Unfinished Game" type="monotone" dataKey="NumUnfinishedGame" stroke="#FF0000"/>
        </LineChart>  
    )
}

export default RenderLineChart;