import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import logo from "../assets/img/log.png";
import NotificationAlert from "react-notification-alert";
import { Route, useHistory } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  async function _login() {
    let isloggedin = false;
    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://serotoninrush.tech/API/login/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        console.log(response);
        if (response.message === "success") {
          isloggedin = true;
          await localStorage.setItem("isLoggedIn", "true");

          await localStorage.setItem("token", response.token);
          await localStorage.setItem(
            "user_info",
            JSON.stringify(response.user_obj)
          );
          await localStorage.setItem("username", response.username);
          await localStorage.setItem("isCustomer", response.user_obj.status);
          // Context._currentValue.token = response.token;
          // Context._currentValue.user_info = response.user_obj;
          // Context._currentValue.username = response.username;
          notify("tc", 2, response.message);
          setTimeout(() => {
            (window.location = "/admin/dashboard"), 1000;
          });
          // window.location = "/admin/dashboard";
          // Route.push("/admin/dashboard");
        } else {
          notify("tc", 1, response.message);
        }
      })
      .catch((error) => console.log("error", error));
  }
  const notificationAlertRef = React.useRef(null);
  const notify = (place, color, msg) => {
    var type;
    switch (color) {
      case 1:
        type = "danger";
        break;
      case 2:
        type = "success";
        break;

      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlertRef.current.notificationAlert(options);
  };
  return (
    <div className="Login">
      <img
        src={logo}
        alt="Logo"
        className="logo_login"
        style={{ marginBottom: 25 }}
      />
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={() => {
            _login();
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
