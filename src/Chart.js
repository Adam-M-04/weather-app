import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer,Tooltip, Legend } from 'recharts';

const Chart = ({weatherData, timeZone, theme, day_night, days_hours}) => {

    function format_time(s, hours=false)
    {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
            weekday: 'short',
            hour12: false,
            timeZone: timeZone
        });
        const dtFormatHours = new Intl.DateTimeFormat('en-GB', {
            hour: 'numeric', minute: 'numeric',
            hour12: false,
            timeZone: timeZone
        });
        if(hours) return dtFormatHours.format(new Date(s * 1e3));
        return dtFormat.format(new Date(s * 1e3));
    }

    function getFullName(shortName){
        switch(shortName){
            case 'Mon': return 'Monday';
            case 'Tue': return 'Tuesday';
            case 'Wed': return 'Wednesday';
            case 'Thu': return 'Thursday';
            case 'Fri': return 'Friday';
            case 'Sat': return 'Saturday';
            case 'Sun': return 'Sunday';
            default: return shortName;
        }
    }

    let Data = []

    if(days_hours === 'days')
    {
        if(day_night === 'day')
        {
            for(let single of weatherData){
                Data.push({time : format_time(single.dt), temperature : single.temp.day, perceptible_temperature : single.feels_like.day})
            } 
        }
        else
        {
            for(let single of weatherData){
                Data.push({time : format_time(single.dt), temperature : single.temp.night, perceptible_temperature : single.feels_like.night})
            }
        }
    }
    else
    {
        for(let single of weatherData){
            Data.push({time : format_time(single.dt, true), temperature : single.temp, perceptible_temperature : single.feels_like})
        }
    }

    return (
        <div style={{ width: "100%", height: '400px', position: 'relative'}}>
            <span style={{position: 'absolute', top: '-15px', left: '32px', cursor: 'default'}}>{'°C'}</span>
            <ResponsiveContainer>
                <LineChart data={Data} margin={{top: 15,right: 50,left: 0,bottom: 40}}>
                    <CartesianGrid stroke={theme === 'dark' ? "#A8DADC" : "#1D3557"} strokeDasharray="3 3"/>
                    <Line type="monotone" dataKey="temperature" stroke="#E63946" name="Temperature"/>
                    <Line type="monotone" dataKey="perceptible_temperature" stroke="#8884d8" name="Perceptible temperature"/>
                    
                    <XAxis dataKey="time" stroke={theme === 'dark' ? "#A8DADC" : "#1D3557"} angle={-25}/>
                    <YAxis stroke={theme === 'dark' ? "#A8DADC" : "#1D3557"}/>
                    <Tooltip formatter={(value)=>{return value+'°C'}} labelFormatter={(value)=>{return getFullName(value)}}/>
                    <Legend width={'100%'}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
 
export default Chart;