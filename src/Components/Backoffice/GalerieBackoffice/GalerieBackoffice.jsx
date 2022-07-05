import './GalerieBackoffice.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

function GalerieBackoffice(){
    const [galerieSubmittingStatus, setGalerieSubmittingStatus] = useState("none")


    const handleGalerieSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append("title", e.target.elements.title.value)
        if(e.target.elements.title.value === ""){
            setGalerieSubmittingStatus("error")
        }
        data.append("description", e.target.elements.description.value)
        data.append("place", e.target.elements.place.value)
        data.append("categories", e.target.elements.categories.value)
        console.log(e.target.elements.imgs_galerie.files)
        for (const key of Object.keys(e.target.elements.imgs_galerie.files)) {
            data.append('imgs', e.target.elements.imgs_galerie.files[key])
        }

        setGalerieSubmittingStatus("submitting")
        axios({
            method: 'post',
            url: window.location.protocol +
            "//" +
            window.location.hostname +
            ":8080/api/galerie/addGalerie",
            data: data,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((data) => {
            console.log(data.data)
        })
    }

    

    return(
        <div className="galerie-backoffice-container">
            <div className="form-galerie-backoffice-container">
                <div className="title-form-galerie-backoffice">Nouvelle galerie :</div>
                <form className="form-galerie-backoffice" onSubmit={(e) => handleGalerieSubmit(e)}>
                    <input type="text" placeholder='Titre*' name='title'/>
                    <label htmlFor="imgs_galerie">Choisissez votre/vos photo(s)*</label>
                    <input type="file" name="imgs_galerie" id='imgs_galerie' multiple/>
                    <input type="text" placeholder='Description (optionnel)' name="description"/>
                    <input type="text" placeholder='Lieu (optionnel)' name="place"/>
                    <input type="text" placeholder="Categorie(s) (optionnel)" name="categories" />
                    <input type="submit" value="Enregistrer" />
                </form>
            </div>
            <div className="all-galerie-backoffice-container">

            </div>
        </div>
    )
}

export default GalerieBackoffice