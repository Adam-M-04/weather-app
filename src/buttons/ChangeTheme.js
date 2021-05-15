const ChangeTheme = ({theme, setTheme}) => {

    function changeColor()
    {
        localStorage.setItem('theme', getOppositeColor());
        setTheme(getOppositeColor()); 
    }

    function getOppositeColor()
    {
        return (theme === 'light') ? 'dark' : 'light';
    }

    return ( 
        <button onClick={changeColor} className={'themeButton ' + getOppositeColor()}>{theme}</button>
    );
}
 
export default ChangeTheme;