import React from 'react';
import '../styles/auth.css';
import Input from "../component/Input.jsx";
// img
import send from "../assets/images/send.svg";

const ChangePassword = () => {
    return (
        <>
            <div className="authContainer">
                <p className="title">비밀번호 변경</p>
                <form className="signUpForm">
                    <Input name="비밀번호" type="password" placeholder="영어, 숫자, 특수문자 포함 8~20자" />
                    <Input name="비밀번호 확인" type="password" placeholder="비밀번호 확인" />
                    <div className="signUpBtn chng">
                        <button type="submit" className="signUp">변경하기<img src={send} alt=""/>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChangePassword;