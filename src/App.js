import {useState} from 'react';
import ChangeTheme from './buttons/ChangeTheme';
import ShowWeather from './ShowWeather/ShowWeather';
import Homepage from './Homepage/Homepage';

const App = () => {
    const [theme, setTheme] = useState((localStorage.getItem('theme') === 'light') ? 'light' : 'dark');
    document.querySelector('body').className = theme;
    const apiKey = "18d1046ea74a576c8a38770b105602e4";
    const [displayVar, setdisplayVar] = useState('homepage');
    const [fetchURL, setfetchURL] = useState(null);
    const [nameToDisplay, setnameToDisplay] = useState(null);

    function settingUrl(lat,lon){
        setfetchURL(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`)
    }

    return (
        <div id='App'>
            <header>
                <h1 className='WebsiteTitle'>Weather <br/>Pro<ChangeTheme theme={theme} setTheme={setTheme}/></h1>
            </header>
            <main>
                {
                    displayVar === 'weather' &&
                    <ShowWeather fetchURL={fetchURL} setdisplayVar={setdisplayVar} nameToDisplay={nameToDisplay} theme={theme}/>
                }
                {
                    displayVar === 'homepage' &&
                    <Homepage settingUrl={settingUrl} setdisplayVar={setdisplayVar} theme={theme} setnameToDisplay={setnameToDisplay}/>
                }
            </main>
        </div>
    );
}
 
export default App;