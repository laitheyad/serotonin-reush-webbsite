import React, { useState, useEffect } from "react";

// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
import NotificationAlert from "react-notification-alert";

import Button from "react-bootstrap/Button";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Grid from "@material-ui/core/Grid";
import "../components/Login.css";
import Loader from "react-loader-spinner";

function TableList() {
  const [meals, setMeals] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [meal, setMeal] = useState({});
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [RatingModal, setRatingModal] = useState(false);
  const [RatingValue, setRatingValue] = useState(3);
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
  const customIcons = {
    1: {
      icon: <SentimentVeryDissatisfiedIcon />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <SentimentDissatisfiedIcon />,
      label: "Dissatisfied",
    },
    3: {
      icon: <SentimentSatisfiedIcon />,
      label: "Neutral",
    },
    4: {
      icon: <SentimentSatisfiedAltIcon />,
      label: "Satisfied",
    },
    5: {
      icon: <SentimentVerySatisfiedIcon />,
      label: "Very Satisfied",
    },
  };

  const IconContainer = (props) => {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
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
    await fetch("https://serotoninrush.tech/approved_meals/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        setMeals(response.pending_meals);
      });
  }
  useEffect(() => {
    getMeals();
  }, []);
  async function _Save() {
    let selected = selectedMeals;
    let items = [];
    for (let i = 0; i < selected.length; i++) {
      items.push(selected[i].id);
    }

    let header = new Headers();
    let form = new FormData();
    form.append("username", "laitheyad");
    form.append("reaction", RatingValue);
    var arr = await JSON.stringify(items);
    form.append("meals", arr);

    header.append(
      "Authorization",
      "Token 1e5abb84616134134956179b07468f327a9498a0"
    );
    var requestOptions = {
      method: "POST",
      headers: header,
      body: form,
      redirect: "follow",
    };
    await fetch("https://serotoninrush.tech/API/add_reaction/", requestOptions)
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        console.log(response);
      });
  }
  return (
    <>
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      {/* <Row> <Col> SHOULD ADD  A CATEGORIES   </Col></Row> */}

      <h4 style={{ color: "rgb(152,152,152)" }}>
        <mark>𝒞𝒽𝑜𝑜𝓈𝑒 𝓎𝑜𝓊𝓇 𝒽𝒶𝓅𝓅𝓎 𝓂𝑒𝒶𝓁:</mark>
      </h4>
      <Container fluid>
        {
          <Grid
            container
            spacing={4}
            style={{ height: "70Vh", overflowY: "scroll", marginTop: 10 }}
          >
            <Grid item xs={11}>
              <Grid container justify="center" spacing={6}>
                {meals.length > 0 &&
                  meals.map((meal) => (
                    <Grid key={meal.id} item>
                      <Card
                        style={{
                          width: "18rem",
                          display: "flex",
                          width: "25vh",
                          height: "30vh",
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
                                {meal.name}
                              </Card.Title>
                            </Col>
                            <Col style={{ paddingLeft: 30 }}>
                              {" "}
                              <Button
                                variant="link"
                                style={{ width: 55, height: 30 }}
                                onClick={() => onOpenModal(meal.id)}
                              >
                                info
                              </Button>
                            </Col>
                          </Row>
                          <Card.Text
                            style={{ color: "rgb(96,96,96) ", fontSize: 10 }}
                          >
                            {meal.recipe}
                          </Card.Text>
                          <Row>
                            <Col>
                              <Button
                                variant="success"
                                style={{ height: 10, paddingBottom: 26 }}
                                onClick={() => AddMeal(meal.id)}
                              >
                                +
                              </Button>
                            </Col>
                            <Col style={{ paddingLeft: 40 }}>
                              <Button
                                variant="outline-danger"
                                style={{ height: 10, paddingBottom: 26 }}
                                onClick={() => RemoveMeal(meal.id)}
                              >
                                -
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
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
              {" "}
              <span style={{ color: "rgb(100, 100, 100)" }}>
                Calories{" "}
              </span>: {meal.calories}
            </h4>
            <h4>
              {" "}
              <span style={{ color: "rgb(100, 100, 100)" }}>
                Protein{" "}
              </span>: {meal.protein}
            </h4>
            <h4>
              {" "}
              <span style={{ color: "rgb(100, 100, 100)" }}>Fats </span>:{" "}
              {meal.fats}
            </h4>
            <h4>
              {" "}
              <span style={{ color: "rgb(100, 100, 100)" }}>Recipe </span>:{" "}
              {meal.recipe}
            </h4>
          </Modal>
        </div>
        <div>
          <Modal
            open={RatingModal}
            onClose={() => setRatingModal(false)}
            center
            classNames={{
              overlay: "customOverlay",
              modal: "customModal",
            }}
          >
            <Col
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                height: "45%",
                width: "100%",
              }}
            >
              <h5
                style={{
                  color: "#FF748C",
                  textAlign: "center",
                  fontSize: "2.9vh",
                }}
              >
                Your selected meals for today :
              </h5>
              <div style={{ color: "#FF748C", textAlign: "center" }}>
                {selectedMeals.map((meal) => {
                  return <span>{meal.name} ,</span>;
                })}
              </div>
            </Col>
            <Box
              component="fieldset"
              mb={0}
              borderColor="transparent"
              style={{
                width: "100%",
                color: "#24b5a9 ",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography component="legend" style={{ fontSize: "2.5vh" }}>
                Set your reaction :
              </Typography>
              <Rating
                name="customized-icons"
                defaultValue={RatingValue}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
                style={{ padding: 10 }}
              />
            </Box>

            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => _Save()}
            >
              Submit
            </button>
          </Modal>
        </div>

        <div>
          <Row>
            <Col style={{ textAlign: "center" }}>
              <h5 style={{ color: "#FF748C" }}>
                Submit Todays selections ★★★★
              </h5>
              <br />

              <button
                type="button"
                className="btn btn-info"
                onClick={() => setRatingModal(true)}
                style={{
                  width: "25%",
                  fontSize: 25,
                }}
              >
                My reaction ☺{" "}
              </button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default TableList;
