const Cell = ({dayData, timeZone, day_night, moreData}) => {

    function format_time(s)
    {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
            month: 'numeric', day: 'numeric', weekday: "long",
            hour12: false,
            timeZone: timeZone
        });
        return dtFormat.format(new Date(s * 1e3));
    }

    function getTemperature(){
        if(day_night === 'day') return dayData.temp.day.toFixed(1);
        return dayData.temp.night.toFixed(1);
    }

    function getPerceptibleTemperature(){
        if(day_night === 'day') return dayData.feels_like.day.toFixed(1);
        return dayData.feels_like.night.toFixed(1);
    }

    function getWeatherIconSrc(){
        return `http://openweathermap.org/img/wn/${(dayData.weather[0].icon).slice(0,2) + day_night.slice(0,1)}@2x.png`;
    }

    function getUV(){
        const UV = dayData.uvi;
        if(UV <= 2) return "Low";
        if(UV <= 5) return "Medium";
        if(UV <= 7) return "High";
        if(UV <= 10) return "Very high";
        return "Extremly High";
    }

    const time = (format_time(dayData.dt)).split(',');
    
    return (
        <div className={'Cell ' + day_night + (moreData ? ' moreData' : '')}>
            <div className={`dateWeekDay color${day_night}`}>{time[0]}</div>
            <div className={`date color${day_night}`}>{time[1]}</div>
            <div className="temperature">{getTemperature()}<sup>&#8451;</sup></div>
            <div className="icon"><img src={getWeatherIconSrc()} alt='icon'/></div>
            <div className={`description color${day_night}`}>{dayData.weather[0].description}</div>
            <div className="rain"><b>Rain:</b> {Math.round(dayData.pop*100)}%</div>
            <div className="humidity"><b>Humidity:</b> {Math.round(dayData.humidity)}%</div>
            <div className="wind"><b>Wind:</b>  
                <img className='direction' style={{transform : `rotate(${dayData.wind_deg}deg)`}} alt='direction' src="https://img.icons8.com/ios-glyphs/24/000000/long-arrow-up.png"/>
            {dayData.wind_speed.toFixed(1)} m/s</div>
            <div className="cloudiness"><b>Cloudiness:</b> {Math.round(dayData.clouds)}%</div>
            {
                moreData && <div className="pressure"><b>Pressure:</b> {Math.round(dayData.pressure)}hPa</div>
            }
            {
                moreData && <div className="uv"><b>UV:</b> {getUV()}</div>
            }
            {
                moreData && <div className="feels_like"><b>Feels like:</b> <span>{getPerceptibleTemperature()}<sup>&#8451;</sup></span></div>
            }
        </div>
    );
}
 
export default Cell;