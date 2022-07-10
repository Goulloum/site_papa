import "./Login.css";
import axios from "axios";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";
import Backoffice from "./Backoffice";
import { useState } from "react";

function Login() {
  const isAuthenticated = useIsAuthenticated();

  const signIn = useSignIn();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [hidden, setHiden] = useState("none");
  const [seePassword, setSeePassword] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        window.location.protocol +
          "//" +
          window.location.hostname +
          ":8080/api/users/UserLogin",
        formData
      )
      .then((res) => {
        if (res.status === 200) {
          if (
            signIn({
              token: res.data.token,
              expiresIn: "120",
              tokenType: "Bearer",
              authState: res.data.check,
            })
          ) {
          }
          // Redirect or do-something
        }
      })
      .catch((res = 310) => {
        setHiden("block");
      });

    }


  if (isAuthenticated()) {
    return <Backoffice />;
  } else {
    return (
      <div className="login-container">
        
        <form className="form-login-container" onSubmit={onSubmit}>
          <div className="login-form-title">Login Backoffice</div>
          <input
            type="text"
            className="input-username-backoffice"
            placeholder="Username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <div className="password-input-container">
            <input
              type={seePassword ? "text" : "password"}
              className="input-password-backoffice"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="material-symbols-outlined see-password-icon"
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword ? "visibility_off" : "visibility"}
            </span>
          </div>

          <input
            type="submit"
            className="submit-btn-backoffice"
            style={{ marginTop: "5vh" }}
            value="Connect"
          />
          <div className="errorPassword" style={{ display: hidden }}>
            Mot de passe et/ou utilisateur erroné
          </div>
        </form>
        
      </div>
    );
  }
}

export default Login;
