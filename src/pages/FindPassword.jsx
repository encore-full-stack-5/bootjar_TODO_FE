import React, {useEffect, useState} from 'react';
import '../styles/auth.css';
import Input from "../component/Input.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// img
import back from "../assets/images/back.svg";
import send from "../assets/images/send.svg";
import check from "../assets/images/checkGreen.svg";

const FindPassword = () => {
    const navigate = useNavigate();

    const [emailInpt, setEmailInpt] = useState();
    const [isSending, setIsSending] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const sendEmail = async () => {
        if (!isValidEmail(emailInpt)) {
            alert("이메일 형식이 알맞지 않습니다.")
            return null;
        }
        const response = await axios.post("http://34.121.86.244/users/qrcode/token", { email: emailInpt });
        const token = response.data.token;
        console.log(token);
        await axios.post("http://34.121.86.244/users/qrcode", {
            address: emailInpt,
            changePasswordUrl: `http://34.121.86.244/changePassword?query=${token}`
        });
        setIsSending(true);
    }

    const onChangeEmailInpt = (e) => {
        setEmailInpt(e.target.value);
    }

    return (
        <>
            <div className="authContainer">
                <p className="title">비밀번호 찾기</p>
                <form className="signUpForm">
                    <Input name="이메일" placeholder="형식에 맞게 작성해 주세요" value={emailInpt} onChange={onChangeEmailInpt} />
                    <div className="findPasswordDesc">
                        <p><span>가입된 이메일</span>로 작성해 주세요.</p>
                        <p>해당 메일로 비밀번호 변경할 수 있는 <span>QR코드</span>를 보내드립니다.</p>
                    </div>
                    <div className="signUpBtn">
                        <button type="button" className="back" onClick={() => navigate('/login')}><img src={back} alt="뒤로가기"/>
                        </button>
                        {
                            !isSending ?
                                <button type="button" className="signUp" onClick={sendEmail}>
                                    메일 보내기
                                    <img src={send} alt=""/>
                                </button>
                                :
                                <button className="signUp sendingEmail" disabled>
                                    메일을 보냈습니다
                                    <img src={check} alt=""/>
                                </button>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default FindPassword;