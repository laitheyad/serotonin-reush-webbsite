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
import { createAdd } from "typescript";
import razan from "../assets/img/razan.png";
import { DataGrid } from "@material-ui/data-grid";
import { data } from "jquery";

function User() {
  const [user, get_user_info] = useState({});
  const [username, setusername] = useState();
  const [location, setLocation] = useState();
  const [user_meals, setUserMeals] = useState([]);
  useEffect(async () => {
    get_Info_by_token();
    let user_inf = await localStorage.getItem("user_info");
    get_user_info(await JSON.parse(user_inf));
    setusername(localStorage.getItem("username"));
    _get_user_meals();
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
    let token = localStorage.getItem("token");
    var headers1 = new Headers();
    headers1.append("Authorization", "Token " + token);

    var formdata1 = new FormData();
    formdata1.append("token", token);

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
        if (response.message === "success") {
          notify("tc", 2, "Your informations has been updated seccussfully");
        } else {
          notify("tc", 3, "Sorry, Somethin went wrong !");
        }
      });
  }
  async function _get_user_meals() {
    var formdata = new FormData();
    formdata.append("token", localStorage.getItem("token"));

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(
      "https://serotoninrush.tech/API/user_reactions_info/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        result = JSON.parse(result);
        let data = [];
        result = result.reactions;
        for (let i = 0; i < result.length; i++) {
          console.log("r", result[i]);
          data.push({
            id: result[i].id,
            meal_id: result[i].meal_id,
            reaction: result[i].reaction,
            date: result[i].date,
          });
        }
        console.log(data);
        setUserMeals(data);
      })
      .catch((error) => console.log("error", error));
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
  let status = localStorage.getItem("isCustomer");
  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "meal_id", headerName: "Meal name", width: 150 },
    { field: "reaction", headerName: "Reaction", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
  ];
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
                    {user.avatar !== null && (
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={"https://serotoninrush.tech" + user.avatar}
                      ></img>
                    )}
                    {user.avatar === null && (
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("../assets/img/profile.png").default}
                        style={{ backgroundColor: "#fff" }}
                      ></img>
                    )}
                    <h5 className="title">
                      {user.first_name} {user.last_name}
                    </h5>
                  </a>
                  <p className="description">{username}</p>
                </div>
                <p className="description text-center">"{location}"</p>

                <p className="description text-center">Role: {status}</p>
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
        <Row>
          <Card
            style={{
              width: "65%",
              height: "50%",
              // marginLeft: "15%",
            }}
          >
            <Card.Title
              style={{ marginLeft: "5%", marginTop: "3%", textAlign: "center" }}
            >
              <h4>Ｙｏｕｒ ｍｅａｌｓ ＆ ｒｅａｃｔｉｏｎｓ</h4>
            </Card.Title>
            <div
              style={{
                top: -30,
                right: -40,
                position: "absolute",
              }}
            ></div>
            <div style={{ height: 400, width: "100%", padding: 10 }}>
              <DataGrid
                rows={user_meals}
                columns={columns}
                pageSize={5}
                checkboxSelection
              />
            </div>
          </Card>
        </Row>
      </Container>
    </>
  );
}
export default User;
