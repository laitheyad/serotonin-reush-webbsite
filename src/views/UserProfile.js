import React, { useEffect, useState } from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import NotificationAlert from "react-notification-alert";

function User() {
  const [user, get_user_info] = useState({});
  const [username, setusername] = useState();
  const [location, setLocation] = useState();

  useEffect(async () => {
    get_Info_by_token();
    let user_inf = await localStorage.getItem("user_info");
    get_user_info(await JSON.parse(user_inf));
    setusername(localStorage.getItem("username"));
    getLocation();
  }, []);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    codeLatLng(position.coords.latitude, position.coords.longitude);
  }
  async function codeLatLng(lat, lng) {
    await fetch(
      "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=" +
        lat +
        "&longitude=" +
        lng +
        "&localityLanguage=en"
    )
      .then((response) => response.text())
      .then((response) => {
        response = JSON.parse(response);
        let location =
          response.locality.split(" ")[0] + "-" + response.countryName;
        setLocation(location);
      });
  }
  async function get_Info_by_token() {
    var headers1 = new Headers();
    headers1.append("Authorization", "Token " + localStorage.getItem("token"));

    var formdata1 = new FormData();
    formdata1.append("token", localStorage.getItem("token"));

    var requestOptions1 = {
      method: "POST",
      body: formdata1,
      headers: headers1,
      redirect: "follow",
    };

    await fetch("https://serotoninrush.tech/API/user_info/", requestOptions1)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        console.log(response);
        await localStorage.setItem(
          "user_info",
          JSON.stringify(response.user_obj)
        );
        await localStorage.setItem("username", response.username);
        await localStorage.setItem("isCustomer", response.user_obj.status);
        get_user_info(response.user_obj);
        setusername(response.username);
      });
  }
  async function _UpdateInfo() {
    var headers = new Headers();
    headers.append("Authorization", "Token " + localStorage.getItem("token"));

    var formdata = new FormData();
    formdata.append("username", username);
    formdata.append("first_name", user.first_name);
    formdata.append("last_name", user.last_name);
    formdata.append("date_of_birth", user.date_of_birth);
    formdata.append("email", user.email);
    formdata.append("phone", user.phone);

    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: headers,
    };

    await fetch("https://serotoninrush.tech/API/update_info/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        console.log(response);

        if (response.message === "success") {
          notify("tc", 2, "Your informations has been updated seccussfully");
        } else {
          notify("tc", 3, "Sorry, Somethin went wrong !");
        }
      });
  }
  const notificationAlertRef = React.useRef(null);
  const notify = (place, color, msg) => {
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
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
    <>
      <Container fluid>
        <div className="rna-container">
          <NotificationAlert ref={notificationAlertRef} />
        </div>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue={user.first_name}
                          type="text"
                          onChange={(event) => {
                            user.first_name = event.target.value;
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue={user.last_name}
                          type="text"
                          onChange={(event) => {
                            user.last_name = event.target.value;
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          defaultValue={user.email}
                          type="email"
                          onChange={(event) => {
                            user.email = event.target.value;
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>Phone Number</label>
                        <Form.Control
                          defaultValue={user.phone}
                          type="text"
                          onChange={(event) => {
                            user.phone = event.target.value;
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Birthdate</label>
                        <Form.Control
                          type="date"
                          defaultValue={user.date_of_birth}
                          onChange={(event) => {
                            user.date_of_birth = event.target.value;
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row></Row>
                  <Button
                    className="btn-fill pull-right"
                    variant="info"
                    onClick={() => {
                      _UpdateInfo();
                    }}
                  >
                    Update Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/watermelon.jpg").default}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={"https://serotoninrush.tech" + user.avatar}
                    ></img>
                    <h5 className="title">
                      {user.first_name} {user.last_name}
                    </h5>
                  </a>
                  <p className="description">{username}</p>
                </div>
                <p className="description text-center">"{location}"</p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
        <hr />
      </Container>
    </>
  );
}
export default User;
