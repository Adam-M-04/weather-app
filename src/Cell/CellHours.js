const CellHours = ({HourData, timeZone, moreData}) => {
    function format_time(s)
    {
        const dtFormat = new Intl.DateTimeFormat('en-GB', {
            month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
            hour12: false,
            timeZone: timeZone
        });
        return dtFormat.format(new Date(s * 1e3));
    }
    
    function getTemperature(){
        return HourData.temp.toFixed(1);
    }

    function getPerceptibleTemperature(){
        return HourData.feels_like.toFixed(1);
    }

    function getUV(){
        const UV = HourData.uvi;
        if(UV <= 2) return "Low";
        if(UV <= 5) return "Medium";
        if(UV <= 7) return "High";
        if(UV <= 10) return "Very high";
        return "Extremly High";
    }

    const day_night = HourData.weather[0].icon[2] === 'd' ? 'day' : 'night';
    const time = (format_time(HourData.dt)).split(',');
    
    return (
        <div className={'Cell ' + day_night + (moreData ? ' moreData' : '')}>
            <div className={`dateWeekDay color${day_night}`}>{time[0]}</div>
            <div className={`date color${day_night}`}>{time[1]}</div>
            <div className="temperature">{getTemperature()}<sup>&#8451;</sup></div>
            <div className="icon"><img src={`http://openweathermap.org/img/wn/${(HourData.weather[0].icon)}@2x.png`} alt='icon'/></div>
            <div className={`description color${day_night}`}>{HourData.weather[0].description}</div>
            <div className="rain"><b>Rain:</b> {Math.round(HourData.pop*100)}%</div>
            <div className="humidity"><b>Humidity:</b> {Math.round(HourData.humidity)}%</div>
            <div className="wind"><b>Wind:</b>  
                <img className='direction' style={{transform : `rotate(${HourData.wind_deg}deg)`}} 
                    alt='direction' src="https://img.icons8.com/ios-glyphs/24/000000/long-arrow-up.png"/>
            {HourData.wind_speed.toFixed(1)} m/s</div>
            <div className="cloudiness"><b>Cloudiness:</b> {Math.round(HourData.clouds)}%</div>
            {
                moreData && <div className="pressure"><b>Pressure:</b> {Math.round(HourData.pressure)}hPa</div>
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
 
export default CellHours;