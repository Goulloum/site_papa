import "./GaleriePage.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function GaleriePage() {
  const [galerie, setGalerie] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const idGalerie = useParams().id;
  const [message, setMessage] = useState("");

  const [currentPhoto, setCurrentPhoto] = useState();

  useEffect(() => {
    axios({
      method: "post",
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/api/galerie/getGalerieById",
      data: {
        id: idGalerie,
      },
    }).then((data) => {
      if (data.status === 200) {
        setGalerie(data.data);
        setCurrentPhoto(data.data.imgs[0]);
        setLoaded(true);
      } else {
        setMessage("Erreur de chargement de l'élément.");
      }
    });
  }, []);

  return (
    <div className="galerie-page-container">
      {loaded && (
        <div className="galerie-page">
          <div className="photo-galerie-container">
            <div className="visu-main-photo-container">
              <img
                src={"/dynamicImg/galerieImgs/" + currentPhoto}
                alt={"Main picture " + galerie.categories.join(" ")}
                className="visu-main-photo"
              />
            </div>
            <div className="all-photo-container">
              {galerie.imgs.map((img) => (
                <img
                  alt={"All picture " + galerie.categories.join(" ")}
                  style={{ opacity: currentPhoto === img ? "1" : "0.4" }}
                  onClick={() => setCurrentPhoto(img)}
                  src={"/dynamicImg/galerieImgs/" + img}
                />
              ))}
            </div>
          </div>
          <div className="meta-galerie-container">
            <ul className="list-meta-galerie">
              <li className="title-galerie">{galerie.title}</li>
              <li className="description-galerie">{galerie.description}</li>
              {galerie.place !== "" && <li className="place-galerie">
                <span className="material-symbols-outlined">map</span>
                <a href={"https://www.google.com/maps/search/?api=1&query=" + galerie.place.replace(" ", "+")} target="__blank">{galerie.place}</a>
              </li>}
            </ul>
            <Link to="/galerie">
              <div className="go-back-btn">
                Galerie{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div
        className="message"
        style={{ display: message !== "" ? "block" : "none" }}
      >
        {message}
      </div>
    </div>
  );
}

export default GaleriePage;
