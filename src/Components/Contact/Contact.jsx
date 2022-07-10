import "./Contact.css";
import emailjs from "@emailjs/browser";

import { useState, useEffect } from "react";

function Contact({darkMode}) {
  const [verif, setVerif] = useState({
    nom: false,
    email: false,
    message: false,
  });

  const [message, setMessage] = useState("");

  const verifNom = (nom_input) => {
    if (nom_input === "") {
      return true;
    } else {
      return false;
    }
  };

  const verifEmail = (email_input) => {
    if (/.+@.+\.[A-Za-z]+$/.test(email_input) !== true) {
      return true;
    } else {
      return false;
    }
  };

  const verifMessage = (message) => {
    if (message === "") {
      return true;
    } else {
      return false;
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let nomVerif = verifNom(e.target.elements.nom.value);
    let emailVerif = verifEmail(e.target.elements.mail.value);
    let messageVerif = verifMessage(e.target.elements.message.value);
    setVerif({ nom: nomVerif, email: emailVerif, message: messageVerif });

    if (!nomVerif && !emailVerif && !messageVerif) {
      setMessage("sending");
      const template_params = {
        from_name: e.target.elements.nom.value,
        message: e.target.elements.message.value,
        mail: e.target.elements.mail.value,
      };

      emailjs
        .send(
          "service_gfmwpic",
          "template_7u4d8c9",
          template_params,
          "user_qCbbhykpI1h1UgwsxGHUr"
        )
        .catch((err) => {
          console.log(err);
          return setMessage("Une erreur s'est produite durant l'envoie :(");
        })
        .then((data) => {
          console.log(data);
          setMessage("Message envoyé !");
        });
    }
  };

  useEffect(() => {
    setTimeout(() => {
        setMessage("")
    }, 10000);
  }, [message])

  return (
    <div className={darkMode? "contact-container dark": "contact-container"}>
      <img src="/dynamicImg/HomeImg/bg_home.JPG" alt="" className="background-contact" />
      <div className="contact-title">Envoyez moi un message :</div>
      <form className="form-contact" onSubmit={(e) => handleSendEmail(e)}>
        <div>
          <input autoComplete="off" type="text" name="nom" placeholder="Nom*" />
          <div
            className="error-contact"
            style={{ display: verif.nom ? "block" : "none" }}
          >
            Veuillez entrer un nom
          </div>
        </div>
        <div>
          <input
            autoComplete="off"
            type="text"
            name="mail"
            placeholder="E-Mail*"
          />
          <div
            className="error-contact"
            style={{ display: verif.email ? "block" : "none" }}
          >
            Veuillez entrer un e-mail valide
          </div>
        </div>
        <div>
          <textarea
            autoComplete="off"
            name="message"
            placeholder="Message*"
          ></textarea>
          <div
            className="error-contact"
            style={{ display: verif.message ? "block" : "none" }}
          >
            Veuillez entrer un message
          </div>
        </div>
        <input type="submit" value="Envoyer" />
      </form>
      {message !== "sending" && message !== "" && <div className="message-form">{message}</div>}
      {message === "sending" && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default Contact;
