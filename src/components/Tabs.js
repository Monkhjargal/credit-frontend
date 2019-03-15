import React, { Component } from "react";
import { Tabs, Icon, Card, Row, Col } from "antd";

const TabPane = Tabs.TabPane;
const { Meta } = Card;

class MainHeader extends Component {
  render() {
    return (
      <div className="tabs">
        <div className="main-gutter">
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  Харилцах, хадгаламж
                  <Icon type="apple" />
                </span>
              }
              key="1"
            >
              <Row gutter={20}>
                <Col span={6}>
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
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/f15e6545f1fda007c3b872ecb4945206.jpg"
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
                <Col span={6}>
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
                <Col span={6}>
                  <Card
                    hoverable
                    bordered={false}
                    cover={
                      <img
                        alt="example"
                        src="https://kbknew.khanbank.com/files/product/f15e6545f1fda007c3b872ecb4945206.jpg"
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
            </TabPane>
            <TabPane
              tab={
                <span>
                  Зээлийн үйлчилгээ
                  <Icon type="android" />
                </span>
              }
              key="2"
            >
              test
            </TabPane>
            <TabPane
              tab={
                <span>
                  Картын үйлчилгээ
                  <Icon type="android" />
                </span>
              }
              key="3"
            >
              test
            </TabPane>
            <TabPane
              tab={
                <span>
                  Гадаад төлбөр тооцоо
                  <Icon type="android" />
                </span>
              }
              key="4"
            >
              test
            </TabPane>
            <TabPane
              tab={
                <span>
                  Бусад үйлчилгээ
                  <Icon type="android" />
                </span>
              }
              key="5"
            >
              test
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default MainHeader;
