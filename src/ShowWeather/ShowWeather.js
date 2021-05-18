import useFetch from '../useFetch';
import {useState, useEffect} from 'react';
import DayNightSwitch from '../buttons/Day_Night_switch';
import MoreButton from '../buttons/MoreButton';
import DaysHoursSwitch from '../buttons/Days_Hours_switch';
import Content from './Content';
import ShowDataModeButton from '../buttons/ShowDataModeButton';

const ShowWeather = ({fetchURL, setdisplayVar, nameToDisplay, theme}) => {
    
    const {DataToReturn: weatherData, loading, error} = useFetch(fetchURL);
    const [day_night, setday_night] = useState('day');
    const [days_hours, setdays_hours] = useState('days');
    const [moreData, setmoreData] = useState(false);
    const [width, setwidth] = useState(Math.min(window.innerWidth, 1920));
    const [currMinCell, setcurrMinCell] = useState(0);
    const [showDataMode, setshowDataMode] = useState('cells')

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

    if(loading) {
        return (
            <h1 style={{textAlign : "center", marginTop : "100px"}}>Loading...</h1>
        )
    }
    if(error) {
        return (
            <h1 style={{textAlign : "center", marginTop : "100px"}}>{error}</h1>
        )
    }

    const cellsArrLength = days_hours === 'days' ? weatherData.daily.length : weatherData.hourly.length;
    let maxCells = parseInt(parseInt(width) / 280);

    if(currMinCell + maxCells > cellsArrLength)
    {
        setcurrMinCell(cellsArrLength-maxCells);
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent : 'space-around'}}>
                <div className='backButton' onClick={()=>{setdisplayVar('homepage')}}>Back</div>
            </div>
            <h2 className='cityName'>{nameToDisplay}<br/></h2>
            <h3 className='timezone'>Timezone: {weatherData.timezone.replace('_', ' ')}</h3>

            <ShowDataModeButton showDataMode={showDataMode} setshowDataMode={setshowDataMode}></ShowDataModeButton>

            <Content currMinCell={currMinCell} setcurrMinCell={setcurrMinCell} weatherData={weatherData} moreData={moreData} 
                maxCells={maxCells} day_night={day_night} days_hours={days_hours} cellsArrLength={cellsArrLength} 
                theme={theme} showDataMode={showDataMode}/>
        
            {
                showDataMode === 'cells' && <MoreButton moreData={moreData} setmoreData={setmoreData}/>
            }

            <DaysHoursSwitch setdays_hours={setdays_hours} setcurrMinCell={setcurrMinCell} setday_night={setday_night}/>
            
            {
                days_hours === 'days' && <DayNightSwitch setday_night={setday_night}/>
            }   

        </div>
    );
}
 
export default ShowWeather;