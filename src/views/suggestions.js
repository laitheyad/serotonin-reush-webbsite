import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import Button from "react-bootstrap/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Grid from "@material-ui/core/Grid";
import "../components/Login.css";
import Loader from "react-loader-spinner";
import "../components/Login.css";
function TableList() {
  const [meal, setMeal] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [best, setBest] = useState("");
  const notificationAlertRef = React.useRef(null);

  const notify = (place, color, msg = "") => {
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

  const onOpenModal = (id) => {
    let meal_object = suggestions.filter((meal) => {
      return meal.id == id;
    });
    setMeal(meal_object[0]);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
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
        setMeal(response.best_for_you);
      });
  }
  useEffect(() => {
    _getSuggestions();
  }, []);

  function cut_string(string = "", len) {
    if (string.length > len) {
      let text = string.substring(0, len);
      return text + " ...";
    } else return string;
  }
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <h4 style={{ color: "rgb(152,152,152)", textAlign: "center" }}>
        <mark>
          Ｂｅｓｔ　Ｍｅａｌｓ　Ｓｕｇｇｅｓｔｉｏｎｓ　ｆｏｒ　ｙｏｕ：
        </mark>
      </h4>
      <Container fluid>
        {
          <Grid
            container
            style={{
              height: "80Vh",
              overflowY: "scroll",
              marginTop: 20,
              paddingLeft: 50,
            }}
          >
            <Grid item xs={12}>
              <Grid container justify="center" spacing={6}>
                {suggestions.length > 0 &&
                  suggestions.map((meal) => (
                    <Grid key={meal.id} item>
                      <Card
                        style={{
                          width: "18rem",
                          display: "flex",
                          width: "25vh",
                          height: "25vh",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={require("assets/img/burger.jpg").default}
                          style={{ height: 120 }}
                        />
                        <Card.Body>
                          <Row>
                            <Col>
                              <Card.Title
                                style={{ color: "black", fontSize: 14 }}
                              >
                                {cut_string(meal.name, 20)}
                              </Card.Title>
                            </Col>
                          </Row>
                          <Card.Text
                            style={{ color: "rgb(96,96,96) ", fontSize: 10 }}
                          >
                            {cut_string(meal.recipe, 35)}
                          </Card.Text>
                        </Card.Body>
                        <Row
                          style={{
                            justifyContent: "center",
                            marginBottom: 15,
                          }}
                        >
                          <Button
                            variant="outline-primary"
                            style={{ textAlign: "center", width: "75%" }}
                            onClick={() => onOpenModal(meal.id)}
                            // size="lg"
                          >
                            info
                          </Button>
                        </Row>
                      </Card>
                    </Grid>
                  ))}
                {suggestions.length == 0 && (
                  <Loader
                    type="Circles"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    style={{ marginTop: "15%" }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        }
        <hr></hr>
        <div
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
        ></div>

        <div>
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "info-modal",
            }}
          >
            <h1 style={{ textAlign: "center" }}>{meal.name}</h1>
            <hr />
            <h4>
              <span style={{ color: "rgb(100, 100, 100)" }}>carbohydrate </span>
              :{meal.carbohydrate}
            </h4>
            <h4>
              <span style={{ color: "rgb(100, 100, 100)" }}>Calories</span>:{" "}
              {meal.calories}
            </h4>
            <h4>
              <span style={{ color: "rgb(100, 100, 100)" }}>Protein</span>:{" "}
              {meal.protein}
            </h4>
            <h4>
              <span style={{ color: "rgb(100, 100, 100)" }}>Fats </span>:{" "}
              {meal.fats}
            </h4>
            <h4>
              <span style={{ color: "rgb(100, 100, 100)" }}>Recipe </span>:{" "}
              {meal.recipe}
            </h4>
            <Row
              style={{
                justifyContent: "center",
                marginBottom: 15,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}
            >
              <Button
                variant="secondary"
                size="lg"
                block
                style={{ textAlign: "center", width: "20%" }}
                onClick={() => onCloseModal()}
              >
                Close
              </Button>
            </Row>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default TableList;
