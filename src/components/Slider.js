import React, { Component } from "react";
import { Carousel, Form, Icon, Input, Button, Checkbox } from "antd";

import image1 from "../scss/assets/1.png";
import image2 from "../scss/assets/2.jpg";
import image3 from "../scss/assets/3.jpg";

class Slider extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="slider">
        <div className="login-bank">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h3>Интернэт банк</h3>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Намайг санах</Checkbox>)}
              <a className="login-form-forgot" href="">
                Нууц үг мартсан
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Нэвтрах
              </Button>
            </Form.Item>
          </Form>
        </div>
        <Carousel effect="fade" autoplay>
          <div>
            <img src={image3} alt="image33" width="100%" />
          </div>
          <div>
            <img src="https://www.dbs.com/in/iwov-resources/images/digiIndia/assets/Features/Hero-Banner.png" alt="image11" width="100%" />
          </div>
          <div>
            <img src="https://www.dbs.com/in/iwov-resources/images/digiIndia/assets/digiexpress_hero.jpg" alt="image22" width="100%" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Form.create({ name: "normal_login" })(Slider);
