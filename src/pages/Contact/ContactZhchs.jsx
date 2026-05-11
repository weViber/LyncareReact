import "./Contact.css";
import Contact_bg from "./../../components/images/Contact/Contact.jpg";
import callImg from "./../../components/images/Contact/call.png";
import emailImg from "./../../components/images/Contact/email.png";
import { useState } from "react";
import { postEmail } from "../../service/emailService";
import useRecaptcha from "../../hooks/useRecaptcha";

const Contact = (props) => {
  const { executeRecaptcha } = useRecaptcha();
  const [isSending, setIsSending] = useState(false);
  const [inputs, setInputs] = useState({
    company: "",
    call: "",
    email: "",
    name: "",
    phone: "",
    desc: "",
  });
  const { company, call, email, name, phone, desc } = inputs;

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const validate = () => {
    if (!company.trim()) return "请输入公司名。";
    if (!name.trim()) return "请输入姓名。";
    if (!email.trim()) return "请输入电子邮箱。";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "电子邮箱格式不正确。";
    if (!phone.trim()) return "请输入手机号。";
    if (!desc.trim()) return "请输入咨询内容。";
    return null;
  };
  const sendEmailBtn = async () => {
    if (isSending) return;
    const error = validate();
    if (error) {
      alert(error);
      return;
    }
    try {
      setIsSending(true);
      props.setSending(true);
      const recaptchaToken = await executeRecaptcha("contact_form");
      await postEmail({ company, call, email, name, phone, desc, recaptchaToken });
      alert("문의가 성공적으로 접수되었습니다.");
      setInputs({ company: "", call: "", email: "", name: "", phone: "", desc: "" });
    } catch (error) {
      const message = error.response?.data?.message || error.message || "提交失败,请稍后再试。";
      alert(message);
    } finally {
      setIsSending(false);
      props.setSending(false);
    }
  };
  return (
    <div className="Contact">
      <div className="Contact_bg">
        <p>
          <img src={Contact_bg} alt="lyncare Contact" />
          lyncare Contact
        </p>
      </div>
      <div className="Context_form">
        <div className="Contact_text">
          <h3>咨询</h3>
          <h4>申请时,将自动同意收集和使用个人信息。</h4>
          <p className="recaptcha-notice">
            本网站使用 Google reCAPTCHA 防止垃圾邮件,适用 Google{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">隐私权政策</a>
            {" / "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">服务条款</a>。
          </p>
          <div className="text_list">
            <div className="Company_info">
              <ul>
                <li className="middle">Company info</li>
                <li>
                  <input
                    type="text"
                    value={company}
                    placeholder="公司名"
                    onChange={handleInputs}
                    name="company"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    value={call}
                    placeholder="公司电话"
                    onChange={handleInputs}
                    name="call"
                  />
                </li>
                <li>
                  <input
                    type="email"
                    value={email}
                    placeholder="电子邮箱"
                    onChange={handleInputs}
                    name="email"
                  />
                </li>
              </ul>
            </div>

            <div className="Contact_info">
              <ul>
                <li className="middle">Contact info</li>
                <li>
                  <input
                    className="name"
                    type="text"
                    value={name}
                    placeholder="姓名"
                    onChange={handleInputs}
                    name="name"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    value={phone}
                    placeholder="手机号"
                    onChange={handleInputs}
                    name="phone"
                  />
                </li>
              </ul>
            </div>
          </div>

          <div className="Inquiry_details">
            <p>
              <textarea
                type="text"
                value={desc}
                name="desc"
                placeholder="咨询内容"
                onChange={handleInputs}
              />
            </p>
            <button className="ContactBtn" onClick={sendEmailBtn} disabled={isSending}>
              {isSending ? "发送中..." : "发送"}
            </button>
          </div>
        </div>

        <div className="Lyncare_Contact">
          <div className="Lyncare_Contact_bg">
            <h5>Lyncare Contact</h5>
            <ul>
              <li>02 - 6956 - 7985</li>
              <li>1833-7098</li>
              <li>lyncare@lyncare.co.kr</li>
            </ul>
          </div>
          <div className="Lyncare_Contact_bg_m ">
            <h5>Lyncare Contact</h5>
            <ul>
              <li>
                <img src={callImg} alt="lyncare 서울전화번호" />
                02 - 6956 - 7985
              </li>
              <li>
                <img src={callImg} alt="lyncare 대표전화번호" />
                1833-7098
              </li>
              <li>
                <img src={emailImg} alt="lyncare email" />
                lyncare@lyncare.co.kr
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;
