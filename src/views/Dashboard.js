import React, { useEffect } from "react";
import { useState } from "react";
import ChartistGraph from "react-chartist";
import test from "../assets/img/test.jpg";
import size1 from "../assets/img/size1.png";
import brr from "../assets/img/brr.png";
import border from "../assets/img/border.png";
import br22 from "../assets/img/br22.png";
import mealbg from "../assets/img/mealbg.png";
import { Modal } from "react-responsive-modal";
import Grid from "@material-ui/core/Grid";

// react-bootstrap components
import { Badge, Button, Card, Container, Row, Col } from "react-bootstrap";
import ScrollMenu from "react-horizontal-scrolling-menu";

function Dashboard() {
  const [aModal, setaModal] = useState(false);
  const [bModal, setbModal] = useState(false);
  const [news, setNews] = useState([]);
  async function _getNews() {
    await fetch("https://serotoninrush.tech/API/news/")
      .then((response) => response.text())
      .then(async (result) => {
        let response = await JSON.parse(result);
        setNews(response);
      });
  }
  useEffect(() => {
    _getNews();
  }, []);
  function cut_string(string = "", len) {
    console.log(string);
    if (string.length > len) {
      let text = string.substring(0, len);
      return text + " ...";
    } else return string;
  }
  return (
    <>
      <Container fluid>
        {/* <Row style={{ paddingLeft: 60 }}>
          <div
            style={{
              backgroundImage: `url(${test} )`,
              width: 900,
              height: 300,
              backgroundRepeat: "no-repeat",
            }}
          >
            <h6 style={{ fontSize: 20, paddingLeft: 50, paddingTop: 70 }}>
              𝐒𝐞𝐫𝐨𝐭𝐨𝐧𝐢𝐧 𝐑𝐮𝐬𝐡
            </h6>
            <h5>" Good Food Means Good Mood" </h5>
            <button type="button" className="btn btn-outline-danger">
              Register Now!
            </button>
          </div>
        </Row>
        <hr /> */}
        <Row>
          <Col>
            <Card
              style={{
                height: 230,
                width: 200,
                backgroundImage: `url(${br22} )`,
              }}
            >
              <Card.Title style={{ paddingLeft: 50 }}>
                {" "}
                <img
                  alt="..."
                  src={require("assets/img/sero.png").default}
                  style={{ height: 100, width: 100 }}
                ></img>
              </Card.Title>
              <Card.Body>
                <label style={{ fontSize: 10, paddingLeft: 10 }}>
                  {" "}
                  How can this site helps you?
                </label>
                <div style={{ paddingLeft: 50, paddingTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-success"
                    onClick={() => setaModal(true)}
                    style={{ height: 30, width: 80, fontSize: 12 }}
                  >
                    𝐋𝐞𝐭𝐬 𝐬𝐞𝐞!
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                height: 230,
                width: 200,
                backgroundImage: `url(${border} )`,
              }}
            >
              <Card.Title style={{ paddingLeft: 50 }}>
                {" "}
                <img
                  alt="..."
                  src={require("assets/img/heartt.png").default}
                  style={{ height: 80, width: 80 }}
                ></img>
              </Card.Title>
              <Card.Body>
                <label style={{ fontSize: 10, paddingLeft: 10 }}>
                  {" "}
                  Medical Advices for eating routine!
                </label>
                <div style={{ paddingLeft: 50, paddingTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => setbModal(true)}
                    style={{ height: 30, width: 80, fontSize: 12 }}
                  >
                    𝐋𝐞𝐭𝐬 𝐬𝐞𝐞!
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card
              style={{
                height: 230,
                width: 200,
                backgroundImage: `url(${brr} )`,
              }}
            >
              <Card.Title style={{ paddingLeft: 50 }}>
                <img
                  alt="..."
                  src={require("assets/img/cook.png").default}
                  style={{ height: 80, width: 80 }}
                ></img>
              </Card.Title>
              <Card.Body>
                <label style={{ fontSize: 10, paddingLeft: 30 }}>
                  Best Diets Routine!
                </label>
                <div style={{ paddingLeft: 50, paddingTop: 10 }}>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    style={{ height: 30, width: 80, fontSize: 12 }}
                  >
                    𝐋𝐞𝐭𝐬 𝐬𝐞𝐞!
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <hr />
        <Row>
          <div>𝘕𝘦𝘸𝘴 𝘖𝘧 𝘛𝘰𝘥𝘢𝘺!</div>
        </Row>
        <Row style={{ flexDirection: "row" }}>
          <div>
            <img
              alt="..."
              src={require("assets/img/leaf.png").default}
              style={{ height: 300, width: 150 }}
            ></img>
          </div>
          <Grid
            container
            spacing={4}
            style={{ maxWidth: "70%", marginLeft: "7%" }}
          >
            <Grid item xs={10}>
              <Grid container justify="center" spacing={0}>
                {news.map((news_item) => (
                  <Card style={{ width: "16rem", margin: 15 }}>
                    <Card.Img variant="top" src={news_item.image} />
                    <Card.Body>
                      <Card.Title>{cut_string(news_item.title, 21)}</Card.Title>
                      <Card.Text>{cut_string(news_item.body, 35)}</Card.Text>
                      <a href={news_item.url} className="btn btn-secondary">
                        Visit Link
                      </a>
                    </Card.Body>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <div>
            <img
              alt="..."
              src={require("assets/img/leaf.png").default}
              style={{ height: 300, width: 190 }}
            ></img>
          </div>
        </Row>
        <hr />
        <Row>
          <div style={{ paddingLeft: 400 }}>𝘉𝘖𝘋𝘠 𝘏𝘌𝘈𝘓𝘛𝘏</div>
        </Row>
        <Row>
          <Card
            style={{
              height: 270,
              width: 200,
              backgroundImage: `url(${size1} )`,
              backgroundRepeat: "no-repeat",
            }}
          ></Card>
          <div style={{ paddingLeft: 60 }}>
            <h6 style={{ paddingTop: 30, color: "#39b8b8" }}>
              {" "}
              𝒫𝓊𝒷𝓁𝒾𝒸 𝐻𝑒𝒶𝓁𝓉𝒽 𝒯𝑜𝑜𝓁𝓈!
            </h6>
            <div style={{ paddingTop: 30 }}>
              <button type="button" className="btn btn-danger">
                𝘉𝘖𝘋𝘠 𝘔𝘈𝘚𝘚 𝘐𝘕𝘋𝘌𝘟
              </button>{" "}
              <br></br>
            </div>
            <div style={{ paddingTop: 20 }}>
              <button type="button" className="btn btn-danger">
                𝘠𝘖𝘜𝘙 𝘗𝘌𝘙𝘍𝘌𝘊𝘛 𝘞𝘌𝘐𝘎𝘏𝘛{" "}
              </button>
            </div>
            <div style={{ paddingTop: 20 }}>
              {" "}
              <button type="button" className="btn btn-danger">
                Danger
              </button>
            </div>
          </div>
          <div>
            <img
              alt="..."
              src={require("assets/img/ht.png").default}
              style={{ height: 300, width: 190 }}
            ></img>
          </div>

          <div>
            <p>
              <mark> Why you should know your BMI?</mark>
            </p>
            <p>
              {" "}
              <mark>What is the Human Perfect Weight ?</mark>
            </p>
          </div>
        </Row>
        <hr />
        <Modal open={aModal} onClose={() => setaModal(false)} center>
          <Card
            style={{
              backgroundImage: `url(${mealbg} )`,
              backgroundSize: 1000,
              height: 400,
              width: 400,
            }}
          >
            <Card.Title style={{ color: "#3d6965" }}>
              <h6>𝗛𝗼𝘄 𝗱𝗼𝗲𝘀 𝗳𝗼𝗼𝗱 𝗮𝗳𝗳𝗲𝗰𝘁 𝘀𝗲𝗿𝗼𝘁𝗼𝗻𝗶𝗻?</h6>
            </Card.Title>
            <Card.Body>
              <Row>
                <div>
                  <p style={{ fontSize: 12, color: "#15afd1" }}>
                    𝚃𝚑𝚎 𝚑𝚘𝚛𝚖𝚘𝚗𝚎 𝚜𝚎𝚛𝚘𝚝𝚘𝚗𝚒𝚗 𝚌𝚘𝚗𝚜𝚒𝚜𝚝𝚜 <br />
                    𝚘𝚏 𝚊 𝚌𝚑𝚎𝚖𝚒𝚌𝚊𝚕 𝚜𝚞𝚋𝚜𝚝𝚊𝚗𝚌𝚎 <br />
                    𝚊𝚗𝚍 𝚊𝚌𝚝𝚜 𝚊𝚜 𝚊 𝚗𝚎𝚞𝚛𝚘𝚝𝚛𝚊𝚗𝚜𝚖𝚒𝚝𝚝𝚎𝚛 <br />
                    𝚝𝚑𝚊𝚝 𝚒𝚜 𝚎𝚡𝚌𝚑𝚊𝚗𝚐𝚎𝚍 𝚋𝚢 𝚗𝚎𝚛𝚟𝚎 𝚎𝚗𝚍𝚒𝚗𝚐𝚜 𝚒𝚗 𝚝𝚑𝚎 𝚋𝚛𝚊𝚒𝚗, 𝚊𝚗𝚍 𝚒𝚝𝚜
                    𝚙𝚛𝚘𝚍𝚞𝚌𝚝𝚒𝚘𝚗 𝚠𝚒𝚝𝚑𝚒𝚗 𝚝𝚑𝚎 𝚋𝚘𝚍𝚢 𝚛𝚎𝚚𝚞𝚒𝚛𝚎𝚜 <br /> 𝚎𝚊𝚝𝚒𝚗𝚐 𝚏𝚘𝚘𝚍𝚜 𝚝𝚑𝚊𝚝
                    𝚌𝚘𝚗𝚝𝚊𝚒𝚗 𝚝𝚑𝚎 𝚊𝚖𝚒𝚗𝚘 𝚊𝚌𝚒𝚍 𝚝𝚛𝚢𝚙𝚝𝚘𝚙𝚑𝚊𝚗, <br />
                    𝚠𝚑𝚒𝚌𝚑 𝚌𝚊𝚗 𝚋𝚎 𝚘𝚋𝚝𝚊𝚒𝚗𝚎𝚍 𝚏𝚛𝚘𝚖
                    <br /> 𝚊 𝚍𝚒𝚎𝚝 𝚝𝚑𝚊𝚝 𝚌𝚘𝚗𝚝𝚊𝚒𝚗𝚜 𝚗𝚞𝚝𝚜, <br />
                    𝚌𝚑𝚎𝚎𝚜𝚎 𝚊𝚗𝚍 𝚛𝚎𝚍 𝚖𝚎𝚊𝚝.
                  </p>
                </div>
                <div></div>
              </Row>
              <Row>
                <Col>
                  <img
                    alt="..."
                    src={require("assets/img/cheese.png").default}
                    style={{ height: 150, width: 150 }}
                  ></img>
                </Col>
                <Col>
                  {" "}
                  <img
                    alt="..."
                    src={require("assets/img/beef.png").default}
                    style={{ height: 150, width: 150 }}
                  ></img>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal>
        <Modal open={bModal} onClose={() => setbModal(false)} center>
          <Card>
            <div className="carousel-container" id="example">
              <div className="carousel">
                <div className="carousel-item">
                  <div className="your-item-class">1</div>
                </div>
                <div className="carousel-item">
                  <div className="your-item-class">2</div>
                </div>

                <div className="carousel-button-next your-button-class">👉</div>
                <div className="carousel-button-prev your-button-class">👈</div>
              </div>
            </div>
          </Card>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
