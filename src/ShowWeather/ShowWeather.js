import useFetch from '../useFetch';
import Cell from '../Cell/Cell';
import {useState, useEffect} from 'react';
import NavButton from '../buttons/NavButton';
import DayNightSwitch from '../buttons/Day_Night_switch';
import MoreButton from '../buttons/MoreButton';
import DaysHoursSwitch from '../buttons/Days_Hours_switch';
import CellHours from '../Cell/CellHours';

const ShowWeather = ({fetchURL, setdisplayVar, nameToDisplay}) => {
    
    const weatherData = useFetch(fetchURL);
    const [day_night, setday_night] = useState('day');
    const [days_hours, setdays_hours] = useState('days');
    const [moreData, setmoreData] = useState(false);
    const [width, setwidth] = useState(Math.min(window.innerWidth, 1920));
    const [currMinCell, setcurrMinCell] = useState(0);

    function handle(){
        setwidth(document.body.clientWidth);
        if(window.innerWidth > 1920){
            document.body.style.marginLeft = (window.innerWidth - 1920) / 2 + 'px';
        }else {
            document.body.style.marginLeft = '0px';
        }
    }
    
    useEffect(() => {
        handle();
        window.addEventListener('resize', handle);
        return ()=>{window.removeEventListener('resize', handle);}
    }, [])    

    if(weatherData === null) {
        return (
            <h1 style={{textAlign : "center", marginTop : "100px"}}>Loading...</h1>
        )
    }
    if(typeof(weatherData) === 'string') {
        return (
            <h1 style={{textAlign : "center", marginTop : "100px"}}>{weatherData}</h1>
        )
    }

    const cellsArrLength = days_hours === 'days' ? weatherData.daily.length : weatherData.hourly.length;
    let maxCells = parseInt(parseInt(width) / 280);

    if(currMinCell + maxCells > cellsArrLength)
    {
        setcurrMinCell(cellsArrLength-maxCells);
    }

    function filterCells(element, index)
    {
        return index >= currMinCell && index < maxCells+currMinCell;
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent : 'space-around'}}>
                <div className='backButton' onClick={()=>{setdisplayVar('homepage')}}>Back</div>
            </div>
            <h2 className='cityName'>{nameToDisplay}<br/></h2>
            <h3 className='timezone'>Timezone: {weatherData.timezone.replace('_', ' ')}</h3>
            
            
            <div className='cells'>
                {
                    currMinCell > 0 && <NavButton currMinCell={currMinCell} setcurrMinCell={setcurrMinCell} val={-1}/>
                }
                {
                    currMinCell <= 0 && <NavButton currMinCell={currMinCell} setcurrMinCell={setcurrMinCell} val={0}/>
                }
                {   days_hours === 'days' &&
                    weatherData.daily.filter(filterCells).map(((day, index) => {
                        return <Cell key={index} dayData={day} timeZone={weatherData.timezone} day_night={day_night} moreData={moreData}/>
                    }))
                }
                {   days_hours === 'hours' &&
                    weatherData.hourly.filter(filterCells).map(((hour, index) => {
                        return <CellHours key={index} HourData={hour} timeZone={weatherData.timezone} moreData={moreData}/>
                    }))
                }
                {
                    currMinCell + maxCells < cellsArrLength && <NavButton currMinCell={currMinCell} setcurrMinCell={setcurrMinCell} val={1}/>
                }
                {
                    currMinCell + maxCells >= cellsArrLength && <NavButton currMinCell={currMinCell} setcurrMinCell={setcurrMinCell} val={0}/>
                }
            </div>

            <MoreButton moreData={moreData} setmoreData={setmoreData}/>

            <DaysHoursSwitch setdays_hours={setdays_hours} setcurrMinCell={setcurrMinCell} setday_night={setday_night}/>
            
            {
                days_hours === 'days' && <DayNightSwitch setday_night={setday_night}/>
            }   
        </div>
    );
}
 
export default ShowWeather;