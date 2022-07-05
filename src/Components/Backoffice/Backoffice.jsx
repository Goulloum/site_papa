import './Backoffice.css'
import GalerieBackoffice from './GalerieBackoffice/GalerieBackoffice'
import React, {useState} from 'react'

function Backoffice(){
    const [currentPage, setCurrentPage] = useState("galerie")

    const componentList = {
        galerie: GalerieBackoffice
    }

    return(
        <div className="backoffice-container">
            <div className="navbar-backoffice-container">
                <ul>
                    <li onClick={() => setCurrentPage("galerie")}>Galerie</li>
                </ul>
            </div>

            <div className="component-backoffice-container">
                {React.createElement(componentList[currentPage])}
            </div>



        </div>
    )
}

export default Backoffice