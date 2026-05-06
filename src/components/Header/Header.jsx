import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Header.css";
import Header_logo from "./../images/H_Lyncarelogo.png";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);

    // 선택된 언어에 따라 알맞은 경로로 이동
    if (selectedValue === 'ko') {
      navigate('/');
    } else if (selectedValue === 'cn') {
      navigate('/Zh-chs');
    }
  };
  return (
    <div className="Header">
      <Link to="/" className="H_logo">
        <img src={Header_logo} alt="lyncarelogo" />
      </Link>

      <nav className="gnb_nav">
        <ul>
          <li className="dep1">
            <Link to="/about">
              <span>회사소개</span>
            </Link>
          </li>
          <li className="dep1">
            <Link to="/Product">
              <span>제품</span>
            </Link>
          </li>
          <li className="dep1">
            <Link to="/Support">
              <span>지원</span>
            </Link>
          </li>

          <li className="dep1">
            <Link to="/Contact">
              <span>문의</span>
            </Link>
          </li>


          <li className="dep1 dep_Language">
      <label>Language: </label>
      <select value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="ko">🇰🇷 한국어</option>
        <option value="cn">🇨🇳 华语(简体)</option>
      </select>
    </li>
        
        </ul>
        <p className="N_bg"></p>
      </nav>
    </div>
  );
};
export default Header;
