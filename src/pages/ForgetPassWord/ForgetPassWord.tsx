import { Button, Form, Image, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";

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

const ForgetPassWord: React.FC = () => {
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      message.error("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }
  
    try {
      const response = await axios.put("http://localhost:8000/auth/resetPassword", {
        email, 
        password,
        confirmPassword,
      });
  
      console.log(response);
      message.success("Gửi mã otp rồi");
      window.location.href = "/auth?verify=" + email;
    } catch (error) {
      console.error("Error:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        style={{ maxWidth: 400, marginTop: 150, marginLeft: 500 }}
        scrollToFirstError
      >
        <Image
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 200,
            marginTop: -30,
            marginBottom: -5,
          }}
          width={150}
          src="/images/logo.png"
        />
        <h1
          style={{
            marginBottom: 30,
            marginLeft: 100,
            textTransform: "uppercase",
          }}
        >
          Đặt lại mật khẩu
        </h1>
        <Form.Item name="email" label="Nhập email">
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item name="password" label="Nhập mật khẩu mới">
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item name="confirmPassword" label="Nhập lại mật khẩu mới">
          <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            onClick={handleResetPassword}
            type="primary"
            htmlType="submit"
            style={{ width: 200, marginLeft: 15, textTransform: "uppercase" }}
          >
            Gửi mã xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassWord;
