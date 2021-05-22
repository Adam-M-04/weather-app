const DaysHoursSwitch = ({setdays_hours, setcurrMinCell, setday_night, days_hours}) => {

    function handleSwitch(){
        setdays_hours(document.querySelector('#Days_Hours_switch').checked ? 'hours' : 'days');
        setcurrMinCell(0);
        setday_night('day');
    }

    function getTitle(){
        return "See the weather " + (days_hours === 'days' ? 'hourly' : 'daily'); 
    }

    return (
        <div className='switchButtonContainer'>
            <label className="switch" tabIndex="0">
                <input className="switch-input" type="checkbox" id='Days_Hours_switch' onChange={handleSwitch} />
                <span className="switch-label" data-on="Hourly" data-off="Daily" title={getTitle()}></span> 
                <span className="switch-handle"></span> 
            </label>
        </div>
    );
}
 
export default DaysHoursSwitch;