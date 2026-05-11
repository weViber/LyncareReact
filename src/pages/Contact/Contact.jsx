import "./Contact.css";
import Contact_bg from "./../../components/images/Contact/Contact.png";
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
    if (!company.trim()) return "회사명을 입력해주세요.";
    if (!name.trim()) return "담당자명을 입력해주세요.";
    if (!email.trim()) return "이메일을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "올바른 이메일 형식이 아닙니다.";
    if (!phone.trim()) return "휴대폰 번호를 입력해주세요.";
    if (!desc.trim()) return "문의내용을 입력해주세요.";
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
      const message = error.response?.data?.message || error.message || "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.";
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
          <h3>문의</h3>
          <h4>신청시 자동으로 개인정보 수집 및 이용에 동의처리 됩니다.</h4>
          <p className="recaptcha-notice">
            본 사이트는 스팸 방지를 위해 Google reCAPTCHA를 사용합니다.{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">개인정보처리방침</a>
            {" / "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">서비스 약관</a>이 적용됩니다.
          </p>
          <div className="text_list">
            <div className="Company_info">
              <ul>
                <li className="middle">Company info</li>
                <li>
                  <input
                    type="text"
                    value={company}
                    placeholder="회사명"
                    onChange={handleInputs}
                    name="company"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    value={call}
                    placeholder="회사전화"
                    onChange={handleInputs}
                    name="call"
                  />
                </li>
                <li>
                  <input
                    type="email"
                    value={email}
                    placeholder="이메일"
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
                    placeholder="담당자"
                    onChange={handleInputs}
                    name="name"
                  />
                </li>
                <li>
                  <input
                    type="text"
                    value={phone}
                    placeholder="휴대폰"
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
                placeholder="문의내용"
                onChange={handleInputs}
              />
            </p>
            <button className="ContactBtn" onClick={sendEmailBtn} disabled={isSending}>
              {isSending ? "전송 중..." : "접수하기"}
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
