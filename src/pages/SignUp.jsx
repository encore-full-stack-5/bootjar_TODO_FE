import React, { useState } from 'react';
import '../styles/auth.css'
import Input from "../component/Input.jsx";
import Checkbox from "../component/Checkbox.jsx";
// img
import back from "../assets/images/back.svg";
import check from "../assets/images/check.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
    const navigate = useNavigate();
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isPublicScope, setIsPublicScope] = useState(true);
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleNicknameChange = (e) => {
      setNickname(e.target.value);
    };
  
    const handlePublicScopeChange = () => {
      setIsPublicScope(!isPublicScope);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("이메일 형식에 알맞게 입력 해주세요.");
        return;
      }

      if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      try {
        const response = await axios.post('http://34.121.86.244/users/signup', {
          email,
          password,
          nickname,
          isPublicScope,
        });
        // debugger;
        console.log(response.data);
        alert("회원가입 성공!");
        navigate('/login');
      } catch (error) {
        if (error.response) {
            // debugger;
          alert(error.response.data.password || error.response.data.email || error.response.data);
        } else {
          alert("회원가입 중 오류가 발생했습니다.");
        }
        
      }
    };
  
    const handleBackClick = () => {
      navigate('/login');
    };
  
    return (
      <>
        <div className="authContainer">
          <p className="title">회원가입</p>
          <form className="signUpForm" onSubmit={handleSubmit}>
            <Input name="이메일" placeholder="형식에 맞게 작성해 주세요" value={email} onChange={handleEmailChange} />
            <Input name="비밀번호" type="password" placeholder="영어, 숫자, 특수문자 포함 8~20자" value={password} onChange={handlePasswordChange} />
            <Input name="비밀번호 확인" type="password" placeholder="비밀번호 확인" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            <Input name="닉네임" value={nickname} onChange={handleNicknameChange} />
            <div className="nondisclosureYn">
              <div className="question">
                <p>비공개 계정을 원하시나요?</p>
                <Checkbox id={'yn'} checked={isPublicScope} onChange={handlePublicScopeChange} />
              </div>
              <p className="description">비공개로 할 경우 친구에게만 내 TODO가 노출됩니다.</p>
            </div>
            <div className="signUpBtn">
              <button type="button" className="back" onClick = {handleBackClick}><img src={back} alt="뒤로가기" /></button>
              <button type="submit" className="signUp" onClick = {handleSubmit} >가입하기<img src={check} alt="" /></button>
            </div>
          </form>
        </div>
      </>
    );
  }
  
  
  export default SignUp;