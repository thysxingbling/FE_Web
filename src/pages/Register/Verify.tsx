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

const Verify: React.FC = () => {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState("");

  const handleRegister = async () => {
    try {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const verifyEmail = urlSearchParams.get("verify");

      const response = await axios.put(
        `http://localhost:8080/auth/verify/${verifyEmail}`,
        {
          otp,
        }
      );
   
      message.success("Đăng ký thành công");
      console.log(response);

      window.location.href = "/login";
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
          Nhập mã xác thực{" "}
        </h1>
        <Form.Item
          name="otp"
          label="Nhập mã"
          rules={[
            {
              // validator: validateEmail,
            },
            {
              // required: true,
              // message: "Verify not null!",
            },
          ]}
        >
          <Input onChange={(e) => setOtp(e.target.value)} />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            onClick={handleRegister}
            type="primary"
            htmlType="submit"
            style={{ width: 200, marginLeft: 15, textTransform: "uppercase" }}
          >
            ĐĂNG KÝ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Verify;
