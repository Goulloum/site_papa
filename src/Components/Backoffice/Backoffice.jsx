import './Backoffice.css'
import GalerieBackoffice from './GalerieBackoffice/GalerieBackoffice'
import React, {useState} from 'react'
import {useSignOut} from 'react-auth-kit'

function Backoffice(){
    const [currentPage, setCurrentPage] = useState("galerie")
    const signOut = useSignOut();

    const componentList = {
        galerie: GalerieBackoffice
    }

    return(
        <div className="backoffice-container">
            <div className="navbar-backoffice-container">
                <ul>
                    <li onClick={() => setCurrentPage("galerie")}>Galerie</li>
                </ul>
                <div className="btn-sign-out" onClick={() => signOut()}>Deconnexion</div>
            </div>

            <div className="component-backoffice-container">
                {React.createElement(componentList[currentPage])}
            </div>



        </div>
    )
}

export default Backoffice