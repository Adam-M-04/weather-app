const ChangeTheme = ({theme, setTheme}) => {

    function changeColor()
    {
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