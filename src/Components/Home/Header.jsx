import './Header.css'
import {Link} from 'react-router-dom'

function Header(){
    return(
        <div className="header-container">

            <div className="header-titles-container">
                <div className="header-main-title">Richard</div>
                <div className="header-subtitle">Photographe amateur</div>
                <Link to ="/galerie"><div className="go-back-btn-home">
                Galeries
              </div></Link>
            </div>


        </div>
    )
}
export default Header