import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Carousel } from "antd";
import Actions from "../actions/homepage";
import TopHeader from "../components/TopHeader";
import MainHeader from "../components/MainHeader";
import Slider from "../components/Slider";
import Tabs from "../components/Tabs";

import footerimg from '../scss/assets/footer.gif';

const { Meta } = Card;

@connect(
  null,
  { ...Actions }
)
class Product extends Component {
  state = {
    createLoading: false,
    loading: false
  };

  render() {
    return (
      <div className="main-container">
        <TopHeader />
        <MainHeader />
        <div className="content">
          <Slider />
          <Tabs />
          <div className="special-section">
            <div className="main-gutter">
              <Row gutter={20}>
                <Col className="gutter-row" span={12}>
                  <div className="gutter-box" />
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className="gutter-box" />
                </Col>
                <Col className="gutter-row" span={6}>
                  <div className="gutter-box">
                    <iframe
                      style={{
                        width: "100%",
                        fontSize: "15px !important",
                        height: "500px",
                        border: "none",
                        overflow: "hidden",
                        margin: "0"
                      }}
                      src="//monxansh.appspot.com/xansh.html?currency=USD|EUR|JPY|GBP|RUB|CNY|KRW&conv_tool=1"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="news-section">
            <div className="main-gutter">
              <Row gutter={20}>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
                <Col className="gutter-row" span={4}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/25de52fba44b648065ba3d04c61f8b0e.jpg"
                      />
                    }
                  >
                    <Meta
                      title="Харилцах данс"
                      description={
                        <div className="desc">
                          Get instant savings on select Surface Laptop 2,
                          starting at $89
                          <a href="/">Дэлгэрэнгүй ></a>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </div>
          <div className="bottom-slider">
            <div className="main-gutter">
              <Carousel autoplay>
                <div>
                  <h3>1</h3>
                </div>
                <div>
                  <h3>2</h3>
                </div>
                <div>
                  <h3>3</h3>
                </div>
                <div>
                  <h3>4</h3>
                </div>
              </Carousel>
            </div>
          </div>
          <div className="footer">
            <img src={footerimg} alt="footer" width="100%" />
          </div>
        </div>
      </div>
    );
  }
}

export default Product;
