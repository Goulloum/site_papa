import './Header.css'

function Header(){
    return(
        <div className="header-container">
            <img src={"dynamicImg/HomeImg/bg_home.JPG"} alt="Background Home" className='background-header'/>

            <div className="header-titles-container">
                <div className="header-main-title">Richard</div>
                <div className="header-subtitle">Photographe amateur</div>
            </div>


        </div>
    )
}
export default Header