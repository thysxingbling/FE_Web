import React, { useState } from 'react';
import { Button, Form, Input, Image } from 'antd';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        { phoneNumber, password }
      );
      // Xử lý đăng nhập thành công
      setLoggedIn(true); 
      // chuyển hướng đến trang home 
      window.location.href = '/home'; 

    } catch (error) {
      console.error('Login failed:', error);

      // Xử lý đăng nhập thất bại
      setErrorMessage("Login failed. Check again");
    }
  };
  
  return (
    
    <div style={{ justifyContent: "center", display: "flex", padding: 100 }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
      >
  
        <Image
          style={{ justifyContent: "center", alignItems: "center",  marginLeft: 70,marginTop:-80,marginBottom:10 }}
          width={200}
          src="/images/logo.png"
        />
         <h1 style={{ textAlign: "center", marginLeft: 40,marginBottom:50 }}>ĐĂNG NHẬP</h1>
        <Form.Item
          label="Phone"
          name="phoneNumber"
          rules={[{ required: true, message: 'Please input your phonenumber!' }]}
        >
          <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button onClick={handleLogin} type="primary" htmlType="submit" style={{ width: 150 }}>
            Đăng nhập
          </Button>
        </Form.Item>
        {errorMessage && <p style={{ color: 'red',textAlign:"center",marginLeft:10}}>{errorMessage}</p>}
        <div style={{ marginLeft: 120 }}>
          <a className="login-form-forgot" href="">
            Quên mật khẩu
          </a>
        </div>
        <div style={{ marginLeft: 100 }}>
          <a style={{ textAlign: "center", fontWeight: "bold", color: "black", textDecoration: "" }} className="login-form-forgot" href="">
            Bạn chưa có tài khoản ?
          </a>
        </div>
        <div>
          <Link to="/register">
            <a style={{ fontWeight: "bold", marginLeft: 120 }} href="">
              Đăng ký ngay
            </a>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;

