const DaysHoursSwitch = ({setdays_hours, setcurrMinCell, setday_night}) => {

    function handleSwitch(){
        setdays_hours(document.querySelector('#Days_Hours_switch').checked ? 'hours' : 'days');
        setcurrMinCell(0);
        setday_night('day');
    }

    return (
        <div className='switchButtonContainer'>
            <label className="switch">
                <input className="switch-input" type="checkbox" id='Days_Hours_switch'
                    onClick={handleSwitch} />
                <span className="switch-label" data-on="Hourly" data-off="Daily"></span> 
                <span className="switch-handle"></span> 
            </label>
        </div>
    );
}
 
export default DaysHoursSwitch;