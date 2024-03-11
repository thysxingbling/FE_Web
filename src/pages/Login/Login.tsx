import React, { useState } from 'react';
import { Button, Form, type FormProps, Input, Image } from 'antd';
import { Link} from 'react-router-dom';
import axios from 'axios';


type FieldType = {
  phoneNumber?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
const [password,setPassword]=useState("");
const [email,setEmail]=useState("");
const [token, setToken] = useState('');

const handleLogin = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/auth/login',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    setToken(response.data.token);
    console.log(token);
    
  } catch (error) {
    console.error('Login failed:', error);
  }
};
  return (
<div style={{justifyContent:"center",display:"flex",padding:100}}>
  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    autoComplete="off"

  >
    <h1 style={{textAlign:"center",marginLeft:20}}>ĐĂNG NHẬP</h1>
    <Image
    style={{justifyContent:"center",alignItems:"center",padding:10,marginLeft:100}}
    width={100}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  />
    <Form.Item<FieldType>
      label="Phone"
      name="phoneNumber"
      rules={[{ required: true, message: 'Please input your phonenumber!' }]}
    >
      <Input onChange={(e)=>setEmail(e.target.value)} />
      {/* <Input/> */}
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password onChange={(e)=> setPassword(e.target.value)}/>
      {/* <Input.Password /> */}
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Link to="/home">
        <Button onClick={handleLogin} type="primary" htmlType="submit" style={{width:150}}>
        Đăng nhập
      </Button>
        </Link>
    </Form.Item>
    <div style={{marginLeft:120}}>
    <a  className="login-form-forgot" href="">
          Quên mật khẩu
    </a>
    </div>
    <div style={{marginLeft:100}}>
        <a style={{textAlign:"center",fontWeight:"bold",color:"black",textDecoration:""}} className="login-form-forgot" href="">
          Bạn chưa có tài khoản ?
        </a>
   </div>
   <div>
   <Link to="/register">
   <a style={{fontWeight:"bold",marginLeft:120}} href="" >
         Đăng ký ngay
    </a>
    </Link>
   </div>
  </Form>
   
      
  </div>
  );
   
  
  }

export default Login;