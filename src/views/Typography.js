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
  return (
    <>
      <h5 style={{ paddingLeft: 300, color: " #4C4785", fontSize: 22 }}>
        𝘚𝘦𝘳𝘰𝘵𝘰𝘯𝘪𝘯 𝘙𝘦𝘤𝘪𝘱𝘦𝘴
      </h5>

      <Row style={{ width: 1000 }}>
        {/* <div style={{ backgroundImage: `url(${bord2} )`, height: 400, width: 500 }}>
            <Row>
              <h6 style={{ paddingTop: 100, paddingLeft: 90 }}> 𝘛𝘩𝘦 𝘣𝘦𝘴𝘵 𝘮𝘦𝘢𝘭 𝘧𝘰𝘳 [𝘶𝘴𝘦𝘳𝘯𝘢𝘮𝘦]</h6>
              <div style={{ paddingTop: 100, paddingLeft: 50 }}>
                <img
                  alt="..."
                  className="avatar border-gray"
                  src={require("assets/img/re.jpg").default}
                  style={{ height: 50, width: 50, borderRadius: 50 }} ></img>
              </div>


            </Row> */}
        {/* 
          </div> */}

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
              <div>
                <p style={{ fontSize: 12, paddingLeft: 40, paddingTop: 50 }}>
                  𝐓𝐡𝐞 [𝐦𝐞𝐚𝐥.𝐧𝐚𝐦𝐞] <br /> 𝐢𝐬 𝐭𝐡𝐞 𝐛𝐞𝐬𝐭 𝐦𝐞𝐚𝐥 𝐟𝐨𝐫 𝐲𝐨𝐮 𝐭𝐨 𝐠𝐞𝐭
                  𝐒𝐞𝐫𝐨𝐭𝐨𝐧𝐢𝐧 𝐞𝐧𝐨𝐮𝐠𝐡!
                </p>
              </div>{" "}
            </Card.Title>
            <div style={{ paddingLeft: 50, height: 80, width: 80 }}>
              <img
                alt="..."
                className="avatar border-gray"
                src={require("assets/img/re.jpg").default}
                style={{ height: 70, width: 70, borderRadius: 50 }}
              ></img>
            </div>
          </Row>
          <Row>
            <div style={{ paddingLeft: 50 }}>
              <img
                alt="..."
                className="avatar border-gray"
                src={require("assets/img/b.jpg").default}
                style={{ height: 80, width: 80, borderRadius: 50 }}
              ></img>
            </div>
            <div style={{ paddingTop: 10 }}>
              <button
                type="button"
                className="btn btn-link"
                style={{ fontSize: 12 }}
              >
                Meal Info
              </button>
            </div>
            <div style={{ paddingLeft: 55, paddingTop: 40 }}>
              <button
                type="button"
                className="btn btn-link"
                style={{ fontSize: 12 }}
              >
                {" "}
                Suggetion meals{" "}
              </button>
            </div>
          </Row>

          {/* <p style={{ fontSize: 12, paddingLeft: 30, paddingBottom: 50 }}>𝐓𝐡𝐞 [ 𝐦𝐞𝐚𝐥.𝐧𝐚𝐦𝐞] 𝐢𝐬 𝐭𝐡𝐞 𝐛𝐞𝐬𝐭 𝐦𝐞𝐚𝐥 𝐟𝐨𝐫 𝐲𝐨𝐮 𝐭𝐨 𝐠𝐞𝐭 𝐒𝐞𝐫𝐨𝐭𝐨𝐧𝐢𝐧 𝐞𝐧𝐨𝐮𝐠𝐡!</p> */}
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
              <button type="button" className="btn btn-info">
                My Suggettions meals
              </button>{" "}
              <br />
            </Row>
            <Row style={{ paddingTop: 30, width: 200 }}>
              <button type="button" className="btn btn-info">
                Nutritionist Meals
              </button>{" "}
              <br />
            </Row>
            <Row style={{ paddingTop: 40, width: 200 }}>
              <button type="button" className="btn btn-info">
                My statistics
              </button>{" "}
            </Row>
          </Col>
        </Row>
      </Row>
      <hr />

      <Row>
        <Col style={{ paddingBottom: 10 }}>
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
            <Card.Body style={{ paddingLeft: 75, paddingBottom: 30 }}>
              <Modal open={addModal} onClose={() => setaddModal(false)} center>
                <Form style={{ height: 500, width: 400 }}>
                  <Row style={{ paddingLeft: 110 }}>
                    <h5 style={{ paddingLeft: "50" }}>
                      {" "}
                      𝘋𝘦𝘴𝘤𝘳𝘪𝘣𝘦 𝘺𝘰𝘶𝘳 𝘮𝘦𝘢𝘭 ☺{" "}
                    </h5>
                  </Row>
                  <hr></hr>

                  <Row>
                    <Col>
                      {" "}
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
                      <img
                        alt="..."
                        src={require("assets/img/def.png").default}
                        style={{ height: 60, width: 60 }}
                      ></img>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Carbohydrate:</Form.Label>
                        <Form.Control type="text" style={{ width: 70 }} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Protin:</Form.Label>
                        <Form.Control type="text" style={{ width: 70 }} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Fats:</Form.Label>
                        <Form.Control type="text" style={{ width: 70 }} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Calories:</Form.Label>
                        <Form.Control type="text" style={{ width: 70 }} />
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

              <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => setaddModal(true)}
                style={{ paddingBottom: 10 }}
              >
                Add new recipe
              </button>
            </Card.Body>
          </Card>{" "}
        </Col>
        <Col style={{ width: 30, paddingTop: 100, paddingLeft: 50 }}>
          <img
            alt="..."
            src={require("assets/img/dot3.jpg").default}
            style={{ height: 60, width: 60 }}
          ></img>
        </Col>
        {/* <Col > <blockquote> <h6>-Check you last recipes:</h6></blockquote> */}
        <Col style={{ paddingRight: 120 }}>
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
            <Card.Body style={{ paddingLeft: 68, paddingBottom: 30 }}>
              <button type="button" className="btn btn-outline-info" style={{}}>
                Check your recipes:{" "}
              </button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />

      {/* <Row>
        <Col>
          <img
            alt="..."
            src={
              require("assets/img/col1.png")
                .default
            }
            style={{ height: 200, width: 240, paddingLeft: 30 }}></img>
        </Col>
        <Col style={{ paddingRight: 500, paddingTop: 10 }}>
          <Row style={{ width: 200 }}>
            <button type="button" className="btn btn-warning">My Suggettions meals</button> <br /></Row>
          <Row style={{ paddingTop: 30, width: 200 }}>
            <button type="button" className="btn btn-warning">Nutritionist Meals</button> <br /></Row>
          <Row style={{ paddingTop: 40, width: 200 }}>
            <button type="button" className="btn btn-warning">My statistics</button> </Row>
        </Col>
        <Col> test</Col>
      </Row> */}
      <hr />
      <Row></Row>
    </>
  );
}

export default Typography;
