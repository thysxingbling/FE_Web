import React, { useState } from "react";
import { Button, Checkbox, Form, Image, Input, Modal, message } from "antd";
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
  const [phoneNumber,setPhoneNumber]=useState("");
  const [name,setName]=useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState("");


  const handleRegister = async () => {
    // debugger
    if (password !== confirmPassword) {
      message.error('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.put('http://localhost:8080/auth/signup', { phoneNumber, password, name });
      message.success('Đăng ký thành công');
      window.location.href = "/";
   
    } 
    catch (error:any) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error('Đăng ký không thành công');
      } else {
        message.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    }

  };
  const validatePhoneNumber = (rule: any, value: string, callback: (message?: string) => void) => {
    const phoneNumberRegex = /^(0|\+84)[1-9][0-9]{8}$/;
    if (!phoneNumberRegex.test(value)) {
      callback("Invalid phone number (Ex: 0384492920)");
    } else {
      callback();
    }
  };

  const validatePassword = (rule: any, value: string, callback: (message?: string) => void) => {
    if (value.length < 9) {
      callback("Password must be at least 9 characters (Ex: 123456789)");
    } else {
      callback();
    }
  };
  const validateName = (rule: any, value: string, callback: (message?: string) => void) => {
    const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{2,30}$/;
    if (!nameRegex.test(value)) {
      callback("Invalid name");
    } else {
      callback();
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
           <Image
          style={{ justifyContent: "center", alignItems: "center",  marginLeft: 200,marginTop:-50,marginBottom:-5 }}
          width={150}
          src="/images/logo.png"
        />
           {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <h1 style={{ marginBottom: 30,marginLeft:150 }}>Đăng ký tài khoản</h1>
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
          <Input value ={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
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
          <Input onChange={(e)=>setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              validator: validatePassword,
            },
            {
              required: true,
              message: "Password not null!",
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
          
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          Tôi đồng ý với tất cả những điều trên
        </Checkbox>
      </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button onClick={handleRegister} type="primary" htmlType="submit" style={{width:200,marginLeft:15}}>
          ĐĂNG KÝ
          </Button> 
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
