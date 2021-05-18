import Cell from '../Cell/Cell';
import CellHours from '../Cell/CellHours';
import NavButton from '../buttons/NavButton';
import Chart from '../Chart';

const Content = ({currMinCell, setcurrMinCell, weatherData, moreData, maxCells, day_night, days_hours, cellsArrLength, showDataMode, theme}) => {

    function filterCells(element, index)
    {
        return index >= currMinCell && index < maxCells+currMinCell;
    }

    function getDataToChart(){
        if(days_hours === 'days') return weatherData.daily;
        return weatherData.hourly.slice(0,24);
    }

    if(showDataMode === 'diagram'){
        return(
            <Chart weatherData={getDataToChart()} timeZone={weatherData.timezone} theme={theme} day_night={day_night} days_hours={days_hours}/>
        )
    }

    return ( 
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
    );
}
 
export default Content;