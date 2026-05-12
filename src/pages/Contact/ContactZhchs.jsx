import "./Contact.css";
import Contact_bg from "./../../components/images/Contact/Contact.jpg";
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
    if (!company.trim()) next.company = "请输入公司名。";
    if (!name.trim()) next.name = "请输入姓名。";
    if (!email.trim()) next.email = "请输入电子邮箱。";
    else if (!EMAIL_REGEX.test(email.trim())) next.email = "电子邮箱格式不正确。";
    if (!phone.trim()) next.phone = "请输入手机号。";
    if (!desc.trim()) next.desc = "请输入咨询内容。";
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
        (error.code === "ECONNABORTED" ? "请求超时,请稍后再试。" : null) ||
        error.message ||
        "提交失败,请稍后再试。";
      toast.error("发送失败", { description: message });
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
            <h3 className="Contact_success__title">{submittedName},感谢您!</h3>
            <p className="Contact_success__msg">
              您的咨询已成功提交。
              <br />
              我们将在 1–2 个工作日内回复。
            </p>
            <button type="button" className="Contact_success__btn" onClick={handleSendAnother}>
              重新提交
            </button>
          </div>
        </div>
      ) : (
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
                      aria-invalid={!!errors.company}
                    />
                    {errors.company && <span className="field-error">{errors.company}</span>}
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
                      placeholder="姓名"
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
                      placeholder="手机号"
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
                  placeholder="咨询内容"
                  onChange={handleInputs}
                  aria-invalid={!!errors.desc}
                />
                {errors.desc && <span className="field-error">{errors.desc}</span>}
              </p>
              <button className="ContactBtn" onClick={sendEmailBtn} disabled={isSending}>
                {isSending ? (
                  <>
                    <Spinner />
                    发送中...
                  </>
                ) : (
                  "发送"
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
