import useFetch from "../useFetch";
import {useState, useEffect} from 'react';
import HomepageResult from "./HomepageResult";
import GetLocationButton from "../buttons/GetLocationButton";

const Homepage = ({settingUrl, setdisplayVar, theme, setnameToDisplay}) => {

    function filtrPlaces(data){
        if(data === null) return null;
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

    function handle(){
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

    const locationApiKey = "pk.c4cfc5e94bf8bebba4c2b68e4458a98f";
    const [placeURL, setplaceURL] = useState(null);
    let {DataToReturn: places, loading, error} = useFetch(placeURL);
    places = filtrPlaces(places);
    
    function changeUrl(){
        const ptrn = new RegExp("^[^&$?*!@#%:;<>+]+$", "g");
        const query = document.getElementById('placeQuery').value;
        if(query.length === 0)
        {
            setplaceURL('VoidInput');
            return;
        }
        if(ptrn.test(query)){
            setplaceURL(`https://eu1.locationiq.com/v1/search.php?key=${locationApiKey}&q=${query}&limit=8&format=json`);
        }
        else
        {
            setplaceURL('IncorrectInput');
        }
    }

    function selectPlace(index){
        if(typeof(index) === 'number'){
            settingUrl(places[index].lat, places[index].lon);
            setnameToDisplay(places[index].display_name);
        }
        else 
        {
            settingUrl(index.lat, index.lon);
            setnameToDisplay(index.display_name);
        }
        setdisplayVar('weather');
        
    }

    return (
        <div id='Homepage'>
            <div className='InputContainer' style={{display : 'flex', justifyContent : 'center', marginTop : '50px', position: 'relative'}}>
                <div className="group">      
                    <input type="text" required id='placeQuery' maxLength='50' className={'input'+theme} 
                        autoComplete="off" title="Sample location: Los Angeles, California"/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='inputLabel' htmlFor="placeQuery">Location</label>
                    <GetLocationButton selectPlace={selectPlace}/>
                </div>
            </div>
            <nav style={{display : 'flex', justifyContent : 'space-around', marginTop : '-20px'}}>
                <button className="btn ShowLocations" onClick={changeUrl} tabIndex="0">Show locations</button>
            </nav>
            <br/>
            <HomepageResult places={places} loading={loading} error={error} selectPlace={selectPlace}/>
        </div>
    );
}
 
export default Homepage;