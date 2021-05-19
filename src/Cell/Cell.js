import i01d from '../img/i01d.png';
import i01n from '../img/i01n.png';
import i02d from '../img/i02d.png';
import i02n from '../img/i02n.png';
import i03d from '../img/i03d.png';
import i04d from '../img/i04d.png';
import i09d from '../img/i09d.png';
import i10d from '../img/i10d.png';
import i10n from '../img/i10n.png';
import i11d from '../img/i11d.png';
import i13d from '../img/i13d.png';
import i50d from '../img/i50d.png';

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
        switch ((dayData.weather[0].icon).slice(0,2)){
            case '01':
                return (day_night === 'day') ? i01d : i01n;
            case '02':
                return (day_night === 'day') ? i02d : i02n;
            case '03':
                return i03d;
            case '04':
                return i04d;
            case '09':
                return i09d;
            case '10':
                return (day_night === 'day') ? i10d : i10n;
            case '11':
                return i11d;
            case '13':
                return i13d;
            case '50':
                return i50d;
            default:
                return null;
        }
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