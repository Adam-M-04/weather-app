const DayNightSwitch = ({setday_night, day_night}) => {

    function getTitle(){
        return "See the weather during the " + (day_night === 'day' ? 'night' : 'day'); 
    }
    
    return (
        <div className='switchButtonContainer'>
            <label className="switch">
                <input className="switch-input" type="checkbox" id='day_night_switch' tabIndex="0"
                    onChange={()=>{setday_night(document.querySelector('#day_night_switch').checked ? 'night' : 'day')}}/>
                <span className="switch-label" data-on="Night" data-off="Day" title={getTitle()}></span> 
                <span className="switch-handle"></span> 
            </label>
        </div>
    );
}
 
export default DayNightSwitch;