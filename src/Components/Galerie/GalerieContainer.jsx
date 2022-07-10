import React from "react";
export function GalerieContainer({galerie}) {
  return (
    <div className="galerie-element-container">
      <div className="galerie-element-background-container">
        <img
          src={"/dynamicImg/galerieImgs/" + galerie.imgs[0]}
          alt="Previsualisation picture"
          className="galerie-element-background"
        />
      </div>

      <div className="galerie-element-info-container">
        <div className="galerie-element-info-title">Titre: {galerie.title}</div>
        <div className="galerie-element-info-place">Lieu: {galerie.place}</div>
      </div>
    </div>
  );
}
