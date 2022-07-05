import './Galerie.css'
import axios from "axios"
import {useState, useEffect} from "react"

function Galerie(){
    const [galeries, setGaleries] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
     setLoaded(false)
     axios({
        mathode: 'get',
        url: window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/api/galerie/getGaleries"
     }).then((data) => {
        setGaleries(data.data)
        setLoaded(true)
     })   
    }, [])

    return(
        <div className="galerie-container">

            <div className="galerie-title">Galerie.</div>
            <div className="galerie--grid-container">
                {loaded && galeries.map((galerie, i) => {
                    <div className="galerie-element-container">
                        <div className="galerie-element-background-container">
                            <img src="" className="galerie-element-background" />
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Galerie