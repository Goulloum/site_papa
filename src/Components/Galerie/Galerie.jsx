import { GalerieContainer } from "./GalerieContainer";
import "./Galerie.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Galerie({darkMode}) {
  const [galeries, setGaleries] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    axios({
      mathode: "get",
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/api/galerie/getGaleries",
    }).then((data) => {
      setGaleries(data.data);
      setLoaded(true);
    });
  }, []);

  return (
    <div className={darkMode? "galerie-container dark": "galerie-container"}>
      <div className="galerie-title-container">
        <div className="galerie-title">Galerie.</div>
      </div>

      <div className="galerie-grid-container">
        {loaded &&
          galeries.map((galerie, i) => (
            <Link key={i} to={"/Galerie/" + galerie.id}>
              <GalerieContainer galerie={galerie} />
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Galerie;
