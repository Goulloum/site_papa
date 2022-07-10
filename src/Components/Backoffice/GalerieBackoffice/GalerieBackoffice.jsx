import "./GalerieBackoffice.css";
import { useState, useEffect } from "react";
import axios from "axios";

function GalerieBackoffice() {
  //Partie formulaire ajout galerie//
  const [galerieSubmittingStatus, setGalerieSubmittingStatus] =
    useState("none");
  const [currentFiles, setCurrentFiles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 10000);
  }, [message]);

  const handleGalerieSubmit = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("title", e.target.elements.title.value);
    if (e.target.elements.title.value === "") {
      setGalerieSubmittingStatus("error");
      return setMessage("Le champ titre est obligatoire.");
    }
    if (currentFiles.length <= 0) {
      setGalerieSubmittingStatus("error");
      return setMessage(
        "Vous devez ajouter au minimum une image pour créer une galerie"
      );
    }
    data.append("description", e.target.elements.description.value);
    data.append("place", e.target.elements.place.value);
    data.append("categories", e.target.elements.categories.value);
    console.log(e.target.elements.imgs_galerie.files);
    for (const key of Object.keys(e.target.elements.imgs_galerie.files)) {
      data.append("imgs", e.target.elements.imgs_galerie.files[key]);
    }

    setGalerieSubmittingStatus("submitting");
    axios({
      method: "post",
      url:
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/api/galerie/addGalerie",
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((data) => {
      if (data.status === 200) {
        setGalerieSubmittingStatus("success");
        setMessage("Votre galerie à bien été ajoutée !");
        e.target.elements.title.value = "";
        e.target.elements.description.value = "";
        e.target.elements.categories.value = "";
        e.target.elements.place.value = "";
        e.target.elements.imgs_galerie.value = "";
        setCurrentFiles([]);
      } else {
        setGalerieSubmittingStatus("error");
        setMessage("Une erreur est survenue :(");
      }
    });
  };

  //Partie affichage galerie//

  const [allGalerie, setAllgalerie] = useState([]);

  useEffect(() => {
    axios
      .get(
        window.location.protocol +
          "//" +
          window.location.hostname +
          ":8080/api/galerie/getGaleries"
      )
      .then((data) => {
        setAllgalerie(data.data);
      });
  }, []);

  //partie popup//

  const [popupGalerieId, setPopupGalerieId] = useState("");
  const [currentModifyingFiles, setCurrentModifyingFiles] = useState([]);
  const [popupUpdate, setPopupUpdate] = useState("");
  const [messagePopup, setMessagePopup] = useState("");

  const handleClosePopup = (e) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      setPopupGalerieId("");
    }
  };

  const handleUpdate = (e) => {
    console.log(e.target.elements.title.value)
    const data = new FormData();
    if (e.target.elements.title.value === "") {
      setPopupUpdate("error");
      console.log("here error")
      return setMessagePopup("Le champ titre est obligatoire.");
    }
    if (currentModifyingFiles.length <= 0) {
      setPopupUpdate("error");
      return setMessagePopup(
        "Vous devez ajouter au minimum une image pour créer une galerie"
      );
    }
    data.append("title", e.target.elements.title.value);

    data.append("description", e.target.elements.description.value);
    data.append("place", e.target.elements.place.value);
    data.append("categories", e.target.elements.categories.value);
    if(typeof currentModifyingFiles[0] === "string"){
        data.append("imgs", "same")
    }else{
        for (const key of Object.keys(e.target.elements.imgs_galerie.files)) {
            data.append("imgs", e.target.elements.imgs_galerie.files[key]);
        }
    }
    
    data.append("id", popupGalerieId)

    axios({
        method: "post",
        url: window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/api/galerie/updateGalerie",
        data: data,
        headers:{
            "Content-Type": "multipart/form-data"
        }
    }).then((data) => {
        if(data.status === 200){
            setPopupUpdate("succes")
            setMessagePopup("Galerie modifiée !")
        }else{
            setPopupUpdate("error")
            setMessagePopup("Une erreur est survenue :(")
        }
    })
  };

  return (
    <div className="galerie-backoffice-container">
      <div className="form-galerie-backoffice-container">
        <div className="title-form-galerie-backoffice">Nouvelle galerie :</div>
        <form
          className="form-galerie-backoffice"
          onSubmit={(e) => handleGalerieSubmit(e)}
        >
          <input
            autoComplete="off"
            type="text"
            placeholder="Titre*"
            name="title"
          />
          <label htmlFor="imgs_galerie" className="label-files-form-galerie">
            <div>Choisissez votre/vos photo(s)*</div>
            <div
              style={{
                transform: currentFiles.length > 0 ? "scale(1)" : "scale(0)",
              }}
            >
              {currentFiles.map((file, i) => (
                <div key={i}>
                  <img
                    className="form-galerie-image-preview"
                    src={URL.createObjectURL(file)}
                    alt="selected images"
                  />
                  <div>{file.name}</div>
                </div>
              ))}
            </div>
          </label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            name="imgs_galerie"
            id="imgs_galerie"
            multiple
            onChange={(e) => setCurrentFiles(Array.from(e.target.files))}
          />
          <textarea
            autoComplete="off"
            placeholder="Description (optionnel)"
            name="description"
          />
          <input
            autoComplete="off"
            type="text"
            placeholder="Lieu (optionnel)"
            name="place"
          />
          <input
            autoComplete="off"
            type="text"
            placeholder="Categorie(s) separée par ';' (optionnel)"
            name="categories"
          />
          <input type="submit" value="Enregistrer" />
        </form>
        {message !== "" && (
          <div
            style={{
              backgroundColor:
                galerieSubmittingStatus === "error"
                  ? "rgba(255, 0, 0, 0.443)"
                  : "rgba(0, 128, 0, 0.443)",
            }}
            className="message-form-galerie"
          >
            {message}
          </div>
        )}
      </div>
      <div className="all-galerie-backoffice-container">
        {allGalerie.map((galerie, i) => (
          <div
            key={i}
            className="galerie-element-backoffice-container"
            onClick={() => {
              setPopupGalerieId(galerie.id);
              setCurrentModifyingFiles(Array.from(galerie.imgs));
            }}
          >
            <img
              src={"/dynamicImg/galerieImgs/" + galerie.imgs[0]}
              alt="all galerie preview"
              className="galerie-img-backoffice-container"
            />
            <div>{galerie.title}</div>
          </div>
        ))}
      </div>

      {/* POPUP ZONE */}

      {popupGalerieId !== "" && (
        <div
          className="popup-modify-galerie-container"
          onClick={(e) => handleClosePopup(e)}
        >
          <div className="popup-modify-galerie">
            <form
              className="form-galerie-backoffice"
              onSubmit={(e) => handleUpdate(e)}
            >
              <input
                autoComplete="off"
                type="text"
                placeholder="Titre*"
                name="title"
                defaultValue={
                  allGalerie.filter((gal) => gal.id === popupGalerieId)[0].title
                }
              />
              <label
                htmlFor="imgs_galerie_modify"
                className="label-files-form-galerie"
              >
                <div>Choisissez votre/vos photo(s)*</div>
                <div
                  style={{
                    transform:
                      currentModifyingFiles.length > 0
                        ? "scale(1)"
                        : "scale(0)",
                  }}
                >
                  {currentModifyingFiles.map((file, i) => (
                    <div key={i}>
                      <img
                        className="form-galerie-image-preview"
                        src={
                          typeof currentModifyingFiles[0] === "string"
                            ? "/dynamicImg/galerieImgs/" + file
                            : URL.createObjectURL(file)
                        }
                        alt="selected images"
                      />
                      <div>
                        {typeof currentModifyingFiles[0] === "string"
                          ? file
                          : file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </label>
              <input
                type="file"
                accept="image/png, image/jpeg"
                name="imgs_galerie"
                id="imgs_galerie_modify"
                multiple
                onChange={(e) =>
                  setCurrentModifyingFiles(Array.from(e.target.files))
                }
              />
              <textarea
                autoComplete="off"
                placeholder="Description (optionnel)"
                name="description"
                defaultValue={
                  allGalerie.filter((gal) => gal.id === popupGalerieId)[0]
                    .description
                }
              />
              <input
                autoComplete="off"
                type="text"
                placeholder="Lieu (optionnel)"
                name="place"
                defaultValue={
                  allGalerie.filter((gal) => gal.id === popupGalerieId)[0].place
                }
              />
              <input
                autoComplete="off"
                type="text"
                placeholder="Categorie(s) separée par ';' (optionnel)"
                name="categories"
                defaultValue={
                  allGalerie.filter((gal) => gal.id === popupGalerieId)[0]
                    .categories.join(";")
                }
              />
              <input type="submit" value="Enregistrer" />
            </form>
          </div>
          {messagePopup !== "" && (
          <div
            style={{
              backgroundColor:
                popupUpdate === "error"
                  ? "rgba(255, 0, 0, 0.443)"
                  : "rgba(0, 128, 0, 0.443)",
            }}
            className="message-form-galerie"
          >
            {messagePopup}
          </div>
        )}
        </div>
      )}
    </div>
  );
}

export default GalerieBackoffice;
