import "./Contact.css";
import Contact_bg from "./../../components/images/Contact/Contact.png";
import callImg from "./../../components/images/Contact/call.png";
import emailImg from "./../../components/images/Contact/email.png";
import { useState } from "react";
import { toast } from "sonner";
import { postEmail } from "../../service/emailService";
import useRecaptcha from "../../hooks/useRecaptcha";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Spinner = () => (
  <svg className="ContactBtn__spinner" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
    <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const Contact = () => {
  const { executeRecaptcha } = useRecaptcha();
  const [isSending, setIsSending] = useState(false);
  const [submittedName, setSubmittedName] = useState(null);
  const [inputs, setInputs] = useState({
    company: "",
    call: "",
    email: "",
    name: "",
    phone: "",
    desc: "",
  });
  const [errors, setErrors] = useState({});
  const { company, call, email, name, phone, desc } = inputs;

  const handleInputs = (e) => {
    const { name: field, value } = e.target;
    setInputs((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!company.trim()) next.company = "회사명을 입력해주세요.";
    if (!name.trim()) next.name = "담당자명을 입력해주세요.";
    if (!email.trim()) next.email = "이메일을 입력해주세요.";
    else if (!EMAIL_REGEX.test(email.trim())) next.email = "올바른 이메일 형식이 아닙니다.";
    if (!phone.trim()) next.phone = "휴대폰 번호를 입력해주세요.";
    if (!desc.trim()) next.desc = "문의내용을 입력해주세요.";
    return next;
  };

  const resetForm = () => {
    setInputs({ company: "", call: "", email: "", name: "", phone: "", desc: "" });
    setErrors({});
  };

  const sendEmailBtn = async () => {
    if (isSending) return;
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setIsSending(true);
      const recaptchaToken = await executeRecaptcha("contact_form");
      await postEmail({ company, call, email, name, phone, desc, recaptchaToken });
      setSubmittedName(name);
      resetForm();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.code === "ECONNABORTED" ? "요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요." : null) ||
        error.message ||
        "문의 접수에 실패했습니다. 잠시 후 다시 시도해주세요.";
      toast.error("전송에 실패했습니다", { description: message });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendAnother = () => {
    setSubmittedName(null);
  };

  return (
    <div className="Contact">
      <div className="Contact_bg">
        <p>
          <img src={Contact_bg} alt="lyncare Contact" />
          lyncare Contact
        </p>
      </div>
      {submittedName ? (
        <div className="Contact_success_wrap">
          <div className="Contact_success">
            <div className="Contact_success__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <circle cx="12" cy="12" r="11" fill="none" stroke="#00CDA8" strokeWidth="1.75" />
                <path d="M7 12.5l3.5 3.5 7-7" fill="none" stroke="#00CDA8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="Contact_success__title">{submittedName} 님, 감사합니다!</h3>
            <p className="Contact_success__msg">
              문의가 정상적으로 접수되었습니다.
              <br />
              영업일 기준 1–2일 이내에 회신드리겠습니다.
            </p>
            <button type="button" className="Contact_success__btn" onClick={handleSendAnother}>
              새 문의 작성하기
            </button>
          </div>
        </div>
      ) : (
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
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && <span className="field-error">{errors.company}</span>}
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
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
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
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </li>
                  <li>
                    <input
                      type="text"
                      value={phone}
                      placeholder="휴대폰"
                      onChange={handleInputs}
                      name="phone"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
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
                  aria-invalid={!!errors.desc}
                />
                {errors.desc && <span className="field-error">{errors.desc}</span>}
              </p>
              <button className="ContactBtn" onClick={sendEmailBtn} disabled={isSending}>
                {isSending ? (
                  <>
                    <Spinner />
                    전송 중...
                  </>
                ) : (
                  "접수하기"
                )}
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
      )}
    </div>
  );
};
export default Contact;
