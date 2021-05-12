import i01d from '../img/i01d.png';
import i01n from '../img/i01n.png';
import i02d from '../img/i02d.png';
import i02n from '../img/i02n.png';
import i03d from '../img/i03d.png';
import i03n from '../img/i03n.png';
import i04d from '../img/i04d.png';
import i04n from '../img/i04n.png';
import i09d from '../img/i09d.png';
import i09n from '../img/i09n.png';
import i10d from '../img/i10d.png';
import i10n from '../img/i10n.png';
import i11d from '../img/i11d.png';
import i11n from '../img/i11n.png';
import i13d from '../img/i13d.png';
import i13n from '../img/i13n.png';
import i50d from '../img/i50d.png';
import i50n from '../img/i50n.png';

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

    function getWeatherIconSrc(){
        let day_night = HourData.weather[0].icon.slice(2,3);
        switch ((HourData.weather[0].icon).slice(0,2)){
            case '01':
                return (day_night === 'd') ? i01d : i01n;
            case '02':
                return (day_night === 'd') ? i02d : i02n;
            case '03':
                return (day_night === 'd') ? i03d : i03n;
            case '04':
                return (day_night === 'd') ? i04d : i04n;
            case '09':
                return (day_night === 'd') ? i09d : i09n;
            case '10':
                return (day_night === 'd') ? i10d : i10n;
            case '11':
                return (day_night === 'd') ? i11d : i11n;
            case '13':
                return (day_night === 'd') ? i13d : i13n;
            case '50':
                return (day_night === 'd') ? i50d : i50n;
            default:
                return null;
        }
    }

    const day_night = HourData.weather[0].icon[2] === 'd' ? 'day' : 'night';
    const time = (format_time(HourData.dt)).split(',');
    
    return (
        <div className={'Cell ' + day_night + (moreData ? ' moreData' : '')}>
            <div className={`dateWeekDay color${day_night}`}>{time[0]}</div>
            <div className={`date color${day_night}`}>{time[1]}</div>
            <div className="temperature">{getTemperature()}<sup>&#8451;</sup></div>
            <div className="icon"><img src={getWeatherIconSrc()} alt='icon'/></div>
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