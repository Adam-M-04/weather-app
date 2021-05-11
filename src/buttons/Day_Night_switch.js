const DayNightSwitch = ({setday_night}) => {
    
    return (
        <div className='switchButtonContainer'>
            <label className="switch">
                <input className="switch-input" type="checkbox" id='day_night_switch'
                    onClick={()=>{setday_night(document.querySelector('#day_night_switch').checked ? 'night' : 'day')}}/>
                <span className="switch-label" data-on="Night" data-off="Day"></span> 
                <span className="switch-handle"></span> 
            </label>
        </div>
    );
}
 
export default DayNightSwitch;