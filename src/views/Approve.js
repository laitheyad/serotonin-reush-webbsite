import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";
import Button from "react-bootstrap/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Grid from "@material-ui/core/Grid";
import "../components/Login.css";
import Loader from "react-loader-spinner";

function TableList() {
  const [meals, setMeals] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState({});
  const [selectedMeals, setSelectedMeals] = useState([]);
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

  const AddMeal = (id) => {
    let meal_object = meals.filter((meal) => {
      return meal.id == id;
    });
    let selected = selectedMeals;
    if (!selectedMeals.includes(meal_object[0])) {
      selected.push(meal_object[0]);
      setSelectedMeals(selected);
      notify(
        "tc",
        2,
        "The meal : " + meal_object[0].name + " Has been selected seccussfully"
      );
    } else {
      notify(
        "tc",
        3,
        "The meal : " +
          meal_object[0].name +
          " already selected, it can't be added again !"
      );
    }
  };
  const RemoveMeal = (id) => {
    let selected = [];
    var s_meal;
    let flag = false;
    for (let i = 0; i < selectedMeals.length; i++) {
      if (selectedMeals[i].id == id) {
        s_meal = selectedMeals[i].name;

        flag = true;
      } else {
        selected.push(selectedMeals[i]);
      }
    }
    if (flag)
      notify(
        "tc",
        1,
        "The meal : " + s_meal + " Has been deleted seccussfully"
      );
    else notify("tc", 3, "This meal Is not selected , you cant delete it !");
    setSelectedMeals(selected);
  };

  const onOpenModal = (id) => {
    let meal_object = meals.filter((meal) => {
      return meal.id == id;
    });
    setMeal(meal_object[0]);
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  async function getMeals() {
    var header = new Headers();
    header.append("Authorization", "Token " + localStorage.getItem("token"));
    var requestOptions = {
      method: "GET",
      headers: header,
      redirect: "follow",
    };
    await fetch("https://serotoninrush.tech/pending_meals/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        setMeals(response.pending_meals);
      });
  }
  useEffect(() => {
    getMeals();
  }, []);
  async function _changeMealStatus(state) {
    onCloseModal();
    let header = new Headers();
    let form = new FormData();
    form.append("pk", meal.id);
    form.append("state", state);
    header.append("Authorization", "Token " + localStorage.getItem("token"));
    var requestOptions = {
      method: "POST",
      headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch(
      "https://serotoninrush.tech/change_meal_status/",
      requestOptions
    )
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        state === "Approve"
          ? notify(
              "tc",
              2,
              "This meal has been Approved seccessfully, Thank You for being helpfull"
            )
          : notify(
              "tc",
              5,
              "This meal has been Rejected seccessfully, Thank You for being helpfull"
            );
      });

    getMeals();
  }

  function cut_string(string = "", len) {
    console.log(string);
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
          Ｍｅａｌｓ　Ｔｈａｔ　ｎｅｅｄ＇ｓ　ｔｏ　ｂｅ　ａｐｐｒｏｖｅｄ
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
                {meals.length > 0 &&
                  meals.map((meal) => (
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
                {meals.length == 0 && (
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
                justifyContent: "space-between",
                marginBottom: 15,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
              }}
            >
              <Button
                variant="success"
                style={{ textAlign: "center", width: "20%" }}
                onClick={() => _changeMealStatus("Approve")}
              >
                Accept
              </Button>

              <Button
                variant="secondary"
                style={{ textAlign: "center", width: "20%" }}
                onClick={() => onCloseModal()}
              >
                Close
              </Button>
              <Button
                variant="danger"
                style={{ textAlign: "center", width: "20%" }}
                onClick={() => _changeMealStatus("Reject")}
              >
                Reject
              </Button>
            </Row>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default TableList;
