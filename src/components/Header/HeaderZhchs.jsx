import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "./Header.css";
import Header_logo from "./../images/H_Lyncarelogo.png";

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('cn');
  const navigate = useNavigate();

  const handleLanguageChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);

    // 선택된 언어에 따라 알맞은 경로로 이동
    if (selectedValue === 'cn')  {
      navigate('/Zh-chs');
    } else if  (selectedValue === 'ko') {
      navigate('/');
    }
  };
  return (
    <div className="Header">
      <Link to="/Zh-chs" className="H_logo">
        <img src={Header_logo} alt="lyncarelogo" />
      </Link>

      <nav className="gnb_nav">
        <ul>
          <li className="dep1">
            <Link to="/aboutZhchs">
              <span>公司介绍</span>
            </Link>
          </li>
          <li className="dep1">
            <Link to="/ProductZhchs">
              <span>产品</span>
            </Link>
          </li>
          <li className="dep1">
            <Link to="/SupportZhchs">
              <span>服务</span>
            </Link>
          </li>

          <li className="dep1">
            <Link to="/ContactZhchs">
              <span>咨询</span>
            </Link>
          </li>

          <li className="dep1 dep_Language">
            <label>Language: </label>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="cn">🇨🇳 华语(简体)</option>
              <option value="ko">🇰🇷 한국어</option>
            </select>
          </li>

        
      
        </ul>
        <p className="N_bg"></p>
      </nav>
    </div>
  );
};
export default Header;
