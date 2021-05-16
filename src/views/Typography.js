import React, { useState, useEffect } from "react";
import { Modal } from "react-responsive-modal";
import { Form } from "react-bootstrap";
import bord2 from "../assets/img/bord2.png";
import bann from "../assets/img/bann.png";
import razan from "../assets/img/razan.png";
import mealbg from "../assets/img/mealbg.png";
import "./meal.css";

// react-bootstrap components
import { Card, Row, Col } from "react-bootstrap";

function Typography() {
  const [addModal, setaddModal] = useState(false);
  const [user, setUserInfo] = useState({});
  const [suggestions, setSuggestions] = useState({});
  const [best, setBest] = useState("");

  async function _getSuggestions() {
    let token = localStorage.getItem("token");
    let form = new FormData();
    form.append("token", token);
    let header = new Headers();
    header.append("Authorization", "Token " + token);
    var requestOptions = {
      method: "POST",
      headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch("https://serotoninrush.tech/correlation/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        if (response.message === "error") {
          return;
        }
        setSuggestions(response.meals);
        setBest(response.best_for_you);
      });
  }
  useEffect(async () => {
    let user_info = await localStorage.getItem("user_info");
    setUserInfo(JSON.parse(user_info));
    _getSuggestions();
  }, []);
  return (
    <>
      {/* <h5 style={{ textAlign: "center", color: " #4C4785", fontSize: 22 }}> */}
      <h4 style={{ color: "rgb(152,152,152)", textAlign: "center" }}>
        <mark>Ｃｏｍｍｏｎ　ｆｏｒ　ｙｏｕ</mark>
      </h4>
      {/* </h5> */}
      <br /> <br />
      <Row style={{ width: "100%", justifyContent: "space-evenly" }}>
        <Card
          style={{
            width: 400,
            height: 200,
            backgroundImage: `url(${razan}`,
            backgroundRepeat: "no-repeat",
          }}
        >
          <Row>
            <Card.Title>
              <p
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  fontSize: 14,
                  marginTop: "15%",
                  marginLeft: 40,
                  width: 350,
                  textAlign: "center",
                }}
              >
                <strong style={{ fontSize: 16 }}>The {best}</strong> <br /> Is
                the best meal ingredients for you to get your serotonin enough!
              </p>
            </Card.Title>
            <div
              style={{
                top: -20,
                right: -20,
                position: "absolute",
              }}
            >
              {user.avatar !== null && (
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={"https://serotoninrush.tech" + user.avatar}
                  style={{ height: 70, width: 70, borderRadius: 50 }}
                ></img>
              )}
              {user.avatar === null && (
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={require("../assets/img/profile.png").default}
                  style={{
                    backgroundColor: "#fff",
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                  }}
                ></img>
              )}
            </div>
          </Row>
        </Card>

        <Row>
          <Col>
            <img
              alt="..."
              src={require("assets/img/col1.png").default}
              style={{ height: 200, width: 240, paddingLeft: 30 }}
            ></img>
          </Col>
          <Col style={{ paddingTop: 10 }}>
            <Row style={{ width: 200 }}>
              <button
                type="button"
                className="btn btn-info"
                onClick={() => (window.location = "/admin/suggettions")}
              >
                My Suggeted meals
              </button>
              <br />
            </Row>
            <Row style={{ paddingTop: 30, width: 200 }}>
              <button type="button" className="btn btn-info">
                Nutritionist Meals
              </button>
              <br />
            </Row>
            <Row style={{ paddingTop: 40, width: 200 }}>
              <button type="button" className="btn btn-info">
                My statistics
              </button>
            </Row>
          </Col>
        </Row>
      </Row>
      <hr />
      <Row style={{ justifyContent: "space-evenly" }}>
        <Card
          style={{
            width: "18rem",
            display: "flex",
            margin: 10,
            width: 300,
            height: 220,
          }}
        >
          <Card.Img
            variant="top"
            src={require("assets/img/add.jpg").default}
            style={{ height: 150 }}
          />
          <Card.Body
            style={{
              margin: "auto",
            }}
          >
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setaddModal(true)}
              style={{ paddingBottom: 10 }}
            >
              Add new recipe
            </button>
          </Card.Body>
        </Card>{" "}
        <img
          alt="..."
          src={require("assets/img/dot3.jpg").default}
          style={{ height: 60, width: 60, marginTop: "5%" }}
        ></img>
        <Card
          style={{
            width: "18rem",
            display: "flex",
            margin: 10,
            width: 300,
            height: 220,
          }}
        >
          <Card.Img
            variant="top"
            src={require("assets/img/r1.jpg").default}
            style={{ height: 150 }}
          />
          <Card.Body style={{ margin: "auto" }}>
            <button type="button" className="btn btn-info">
              Check your recipes:
            </button>
          </Card.Body>
        </Card>
      </Row>
      <hr />
      <Modal open={addModal} onClose={() => setaddModal(false)} center>
        <Form
          style={{
            height: 470,
            width: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h5 style={{ textAlign: "center" }}>
            Ｄｅｓｃｒｉｂｅ　ｙｏｕｒ　ｍｅａｌ☺
          </h5>
          <hr />
          <Row style={{ justifyContent: "space-evenly" }}>
            <Col>
              <img
                alt="..."
                src={require("assets/img/h1.jpg").default}
                style={{ height: 80, width: 80 }}
              ></img>
            </Col>
            <Col>
              <img
                alt="..."
                src={require("assets/img/h2.png").default}
                style={{ height: 80, width: 80 }}
              ></img>
            </Col>
            <Col>
              <img
                alt="..."
                src={require("assets/img/h3.png").default}
                style={{ height: 80, width: 100 }}
              ></img>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Meal name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Burger "
                  style={{ width: 140 }}
                />
              </Form.Group>
            </Col>
            <Col>
              <label> Add a meal picture:</label>
              <input
                className=" form control form-control-sm"
                type="file"
                style={{ width: 100, paddinfLeft: 50 }}
              />
              {/* <img
                alt="..."
                src={require("assets/img/def.png").default}
                style={{ height: 60, width: 60 }}
              ></img> */}
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Carbohydrate:</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: 70 }}
                  placeholder="46"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Protin:</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: 70 }}
                  placeholder="30"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fats:</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: 70 }}
                  placeholder="5"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Calories:</Form.Label>
                <Form.Control
                  type="text"
                  style={{ width: 70 }}
                  placeholder="10"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Recipe:</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Seperated by comma , "
                ></textarea>
              </div>
            </Col>
            <Col style={{ paddingTop: 30 }}>
              <button type="button" className="btn btn-warning">
                Submit
              </button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default Typography;
