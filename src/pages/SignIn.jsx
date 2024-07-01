import React, { useState } from 'react';
import '../styles/auth.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//img
import logo from '../assets/images/logo.svg'

function SignIn(){
    const navigate = useNavigate();

    const handlSignupClick = () => {
        navigate('/signup');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://34.121.86.244/users/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            alert("로그인 성공!");
            navigate('/home');
        } catch (error) {
            if (error.response) {
                alert(error.response.data.password || error.response.data.email || error.response.data);
            } else {
                alert("로그인 중 오류가 발생했습니다.");
            }
        }
    };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <div className="authContainer">
                <div className="logo">
                    <img src={logo} alt="YOU & I TODO" className="logoImg" />
                    <div className="logoTxt">
                        <p>you & i</p>
                        <p>todo</p>
                    </div>
                </div>
                <div className="loginForm">
                    <form>
                        <input type="text" placeholder="이메일" value={email} onChange={handleEmailChange}/>
                        <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange}/>
                        <div className="signInUp">
                            <div className="signUp">
                                <p>아직 회원이 아니신가요?</p>
                                <button type="button" onClick={handlSignupClick}>회원가입</button>
                            </div>
                            <button type="submit" className="signIn" onClick={handleSubmit}>LOGIN</button>
                        </div>
                        <div className="findPasswordBtn">
                            <button type="button" onClick={() => navigate('/findPassword')}>비밀번호 찾기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;