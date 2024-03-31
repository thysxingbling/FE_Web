import React, { useState } from "react";
import { Button, Checkbox, Form, Image, Input, Space, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        phoneNumber,
        password,
        name,
        email,
        confirmPassword
      });
      // message.success("Đăng ký thành công");
      console.log(response);
      
      window.location.href = "/auth?verify=" + email;

    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error("Đăng ký không thành công");
      } else {
        message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };

  const validatePhoneNumber = (
    rule: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    const phoneNumberRegex = /^(0|\+84)[1-9][0-9]{8}$/;
    if (!phoneNumberRegex.test(value)) {
      callback("Invalid phone number (Ex: 0384492920)");
    } else {
      callback();
    }
  };

  // const validatePassword = (
  //   rule: any,
  //   value: string,
  //   callback: (message?: string) => void
  // ) => {
  //   if (value.length < 9) {
  //     callback("Password must be at least 9 characters (Ex: 123456789)");
  //   } else {
  //     callback();
  //   }
  // };
  const validateName = (
    rule: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,30}$/;
    if (!nameRegex.test(value)) {
      callback("Invalid name");
    } else {
      callback();
    }
  };
  const validateEmail = (
    rule: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+gmail.com$/;
    if (!emailRegex.test(value)) {
      callback();
    } else {
      callback("Email must be abcxyz@gmail.com");
    }
  };
  return (
    <div style={{ justifyContent: "center", padding: 50, marginLeft: 500 }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        style={{ maxWidth: 400 }}
        scrollToFirstError
      >
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 200,
            marginTop: -50,
            marginBottom: -5,
          }}
          width={150}
          src="/images/logo.png"
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <h1 style={{ marginBottom: 30, marginLeft: 150 }}>Đăng ký tài khoản</h1>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              validator: validatePhoneNumber,
            },
            {
              message: "The input is not valid Phone Number",
            },
            {
              required: true,
              message: "Phone number not null",
            },
          ]}
        >
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              validator: validateName,
            },
            {
              required: true,
              message: "Name not null!",
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              // validator: validatePassword,
            },
            {
              required: true,
              message: "Password not null!",
            },
          ]}
          hasFeedback
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              validator: validateEmail,
            },
            {
              required: true,
              message: "Email not null!",
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>Tôi đồng ý với tất cả những điều trên</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {/* <Link to="/auth"> */}
            <Button
              onClick={handleRegister}
              type="primary"
              htmlType="submit"
              style={{ width: 200, marginLeft: 15, textTransform: "uppercase" }}
            >
              đăng ký
            </Button>
          {/* </Link> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
