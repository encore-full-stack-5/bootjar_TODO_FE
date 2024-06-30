import React, {useEffect, useState} from 'react';
import '../styles/auth.css';
import Input from "../component/Input.jsx";
// img
import back from "../assets/images/back.svg";
import send from "../assets/images/send.svg";
import check from "../assets/images/checkGreen.svg";
import axios from "axios";

const FindPassword = () => {

    const [emailInpt, setEmailInpt] = useState();
    const [isSending, setIsSending] = useState(false);

    const sendEmail = async () => {
        const response = await axios.post("http://localhost:8080/users/qrcode/token", emailInpt);
        console.log(response);
        // TODO : 서버에서 token 발급 후 front에서 URL 생성 후 다시 서버로 전달 (qrcode)
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
                        <button type="button" className="back"><img src={back} alt="뒤로가기"/>
                        </button>
                        {
                            !isSending ?
                                <button className="signUp" onClick={sendEmail}>
                                    메일 보내기
                                    <img src={send} alt=""/>
                                </button>
                                :
                                <button className="signUp sendingEmail" onClick={sendEmail}>
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