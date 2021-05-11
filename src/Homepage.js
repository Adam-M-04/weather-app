import useFetch from "./useFetch";
import {useState} from 'react';

const Homepage = ({settingUrl, setdisplayVar, theme, setnameToDisplay}) => {

    function filtrPlaces(data){
        if(data === null) return null;
        if(typeof(data) === 'string') return data;
        let tmp = [];
        for(let x of data){
            if(tmp.length >= 5) return tmp;
            let isInTmp = false;
            for(let y of tmp){
                if(y.display_name === x.display_name){
                    isInTmp = true;
                    break;
                }
            }
            if(!isInTmp) tmp.push(x);
        }
        return tmp;
    }

    const locationApiKey = "pk.c4cfc5e94bf8bebba4c2b68e4458a98f";
    const [placeURL, setplaceURL] = useState(null);
    let places = filtrPlaces(useFetch(placeURL));
    const [errorToShow, seterrorToShow] = useState(null);
    
    function changeUrl(){
        const query = document.getElementById('placeQuery').value;
        if(query.length === 0){
            seterrorToShow('Type any character to get result');
            return;
        }
        seterrorToShow(null)
        setplaceURL(`https://eu1.locationiq.com/v1/search.php?key=${locationApiKey}&q=${query}&limit=8&format=json`)
    }

    function selectPlace(index){
        settingUrl(places[index].lat, places[index].lon);
        setdisplayVar('weather');
        setnameToDisplay(places[index].display_name);
    }

    return (
        <div id='Homepage'>
            
            <div style={{display : 'flex', justifyContent : 'space-around', marginTop : '50px'}}>
                <div className="group">      
                    <input type="text" required id='placeQuery' maxLength='50' className={'input'+theme} autoComplete="off"/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='inputLabel'>Location</label>
                </div>
            </div>
            <div style={{display : 'flex', justifyContent : 'space-around', marginTop : '-20px'}}>
                <button className="btn ShowLocations" onClick={changeUrl}>Show locations</button>
            </div>
            <br/>
            {
                places && typeof(places) === 'object' && !errorToShow &&
                <div className='LocationsResults'>
                    {
                        places.map((place, index) => {
                            return (
                                <div className='locationResultFullWidth' key={index}>
                                    <div className={'locationResultBlock'} key={index}>
                                        {place.display_name}<br/>
                                        <div style={{display : 'flex', justifyContent : 'space-around'}}>
                                            <button className="btn SelectLocation" onClick={()=>{selectPlace(index)}}>Select</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) 
                    }
                </div>
            }
            {
                typeof(places) === 'string' && !errorToShow &&
                <div className='Message'>
                    {places}
                </div>
            }
            {
                errorToShow && 
                <div className='Message'>
                    {errorToShow}
                </div>
            }
            {
                places === null && !errorToShow && 
                <div className='Message'>To get accurate location you should type city name with state name or postal code</div>
            }
        </div>
    );
}
 
export default Homepage;