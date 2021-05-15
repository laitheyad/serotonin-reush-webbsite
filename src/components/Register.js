import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import logo from "../assets/img/log.png";
import NotificationAlert from "react-notification-alert";
import { Row, Col } from "react-bootstrap";
import { Email } from "@material-ui/icons";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date_of_birth, setDateOfBirth] = useState("");
  const [avatar, setAvatar] = useState("");

  function validateForm() {
    return (
      username.length > 0 && password.length > 0 && passwordConf == password
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  async function _register() {
    let isloggedin = false;
    var formdata = new FormData();
    // formdata.append("username", this.state.username);
    // formdata.append("password", this.state.password);
    formdata.append("username", username);
    formdata.append("first_name", first_name);
    formdata.append("last_name", last_name);
    formdata.append("date_of_birth", date_of_birth);
    formdata.append("phone", phone);
    formdata.append("email", email);
    formdata.append("status", "Customer");
    formdata.append("password", password);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://serotoninrush.tech/API/register_user/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        if (response.message.includes("created")) {
          notify("tc", 2, response.message + " seccessfully");
          setTimeout(() => {
            (window.location = "/admin/login"), 1000;
          });
        } else {
          notify("tc", 1, response.message);
        }
      })
      .catch((error) => notify("tc", 1, response.message));
  }
  const notificationAlertRef = React.useRef(null);
  const notify = (place, Color, msg) => {
    var type;
    switch (Color) {
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
        className="logo_register"
        style={{ marginBottom: 25 }}
      />
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Form
        onSubmit={handleSubmit}
        style={{ width: "45%", justifyContent: "center" }}
      >
        <Row>
          <Col style={{ justifyContent: "center" }}>
            <Row style={{ justifyContent: "space-between" }}>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </Row>
          </Col>
          <Col style={{ justifyContent: "center" }}>
            <Row>
              <Form.Group size="lg" controlId="username">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="username">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="username">
                <Form.Label>Date Of Birth</Form.Label>
                <Form.Control
                  type="date"
                  value={date_of_birth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  value={passwordConf}
                  onChange={(e) => setPasswordConf(e.target.value)}
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </Row>
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", width: "80%" }}>
          {" "}
          <Button
            style={{ width: "40%" }}
            type="submit"
            disabled={!validateForm()}
            onClick={() => {
              _register();
            }}
          >
            Register
          </Button>
        </Row>
      </Form>
    </div>
  );
}
