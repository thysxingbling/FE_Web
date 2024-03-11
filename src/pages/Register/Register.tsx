import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
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
  const [password,setPassword]=useState("");
  const [email,setPhoneNumber]=useState("");
  const [name,setName]=useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', { email, password ,name});
      const token = response.data.token;
      localStorage.setItem('token', token);
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div style={{ justifyContent: "center", padding: 50, marginLeft: 500}}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        style={{ maxWidth: 400 }}
        scrollToFirstError
      >
        <h1 style={{ marginBottom: 30,marginLeft:150 }}>Đăng ký tài khoản</h1>
        <Form.Item
          name="email"
          label="Phone Number"
          rules={[
            {
              message: "The input is not valid Phone Number",
            },
            {
              required: true,
              message: "Please input your Phone Number",
            },
          ]}
        >
          <Input onChange={(e)=>setPhoneNumber(e.target.value)}/>
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input onChange={(e)=>setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password  onChange={(e)=> setPassword(e.target.value)}/>
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
          <Input.Password  onChange={(e)=> setConfirmPassword(e.target.value)}/>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Link to="/">
            <Button onClick={handleRegister} type="primary" htmlType="submit" style={{width:200,marginLeft:15}}>
          ĐĂNG KÝ
          </Button>
            </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
