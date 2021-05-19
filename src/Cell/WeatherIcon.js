import cloudy from '../img/animatedIcons/cloudy.svg';
import cloudy_day_1 from '../img/animatedIcons/cloudy-day-1.svg';
import cloudy_day_2 from '../img/animatedIcons/cloudy-day-2.svg';
import cloudy_day_3 from '../img/animatedIcons/cloudy-day-3.svg';
import cloudy_night_1 from '../img/animatedIcons/cloudy-night-1.svg';
import cloudy_night_2 from '../img/animatedIcons/cloudy-night-2.svg';
import cloudy_night_3 from '../img/animatedIcons/cloudy-night-3.svg';
import day from '../img/animatedIcons/day.svg';
import night from '../img/animatedIcons/night.svg';
import rainy_2 from '../img/animatedIcons/rainy-2.svg';
import rainy_3 from '../img/animatedIcons/rainy-3.svg';
import rainy_4 from '../img/animatedIcons/rainy-4.svg';
import rainy_5 from '../img/animatedIcons/rainy-5.svg';
import rainy_6 from '../img/animatedIcons/rainy-6.svg';
import rainy_7 from '../img/animatedIcons/rainy-7.svg';
import snowy_2 from '../img/animatedIcons/snowy-2.svg';
import snowy_3 from '../img/animatedIcons/snowy-3.svg';
import snowy_4 from '../img/animatedIcons/snowy-4.svg';
import snowy_5 from '../img/animatedIcons/snowy-5.svg';
import snowy_6 from '../img/animatedIcons/snowy-6.svg';
import thunder from '../img/animatedIcons/thunder.svg';
import fog from '../img/i50d.png';

const WeatherIcon = ({weatherID, isNight=false}) => {

    if([711,721,731,741,751,761,762,771,781].includes(weatherID)) weatherID = 701;
    if([201,202,210,211,212,221,230,231,232].includes(weatherID)) weatherID = 200;
    if([301,302,310,311,312,313,314,321,511].includes(weatherID)) weatherID = 300;
    if([503,504,520,521,522,531].includes(weatherID)) weatherID = 502;
    if([620,621,622].includes(weatherID)) weatherID = 602;
    if([612,613,615,616].includes(weatherID)) weatherID = 611;

    let src = null;

    switch(weatherID){
        case 800:
            src = isNight ? night : day;
            break;
        case 801:
            src = isNight ? cloudy_night_1 : cloudy_day_1;
            break;
        case 802:
            src = isNight ? cloudy_night_2 : cloudy_day_2;
            break;
        case 803:
            src = isNight ? cloudy_night_3 : cloudy_day_3;
            break;
        case 804:
            src = cloudy;
            break;
        case 200:
            src = thunder;
            break;
        case 300:
            src = rainy_7;
            break;
        case 500:
            src = isNight ? rainy_4 : rainy_2;
            break;
        case 501:
            src = isNight ? rainy_5 : rainy_3;
            break;
        case 502:
            src = rainy_6;
            break;
        case 600:
            src = isNight ? snowy_4 : snowy_2;
            break;
        case 601:
            src = isNight ? snowy_5 : snowy_3;
            break;
        case 602:
            src = snowy_6;
            break;
        case 611:
            src = rainy_7;
            break;
        case 701:
            src = fog;
            break;
        default: break;
    }

    return <img src={src} alt='icon' author="amCharts" link="https://www.amcharts.com/free-animated-svg-weather-icons/"/>
}
 
export default WeatherIcon;