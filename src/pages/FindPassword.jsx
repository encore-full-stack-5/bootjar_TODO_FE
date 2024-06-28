import React, {useEffect, useState} from 'react';
import '../styles/auth.css';
import Input from "../component/Input.jsx";
// img
import back from "../assets/images/back.svg";
import check from "../assets/images/check.svg";
import axios from "axios";

const FindPassword = () => {

    const [emailInpt, setEmailInpt] = useState();

    const sendEmail = async () => {
        debugger;
        const response = await axios.post("http://localhost:8080/users/qrcode/token", emailInpt);
        console.log(response);
    }

    const onChangeEmailInpt = (e) => {
        setEmailInpt(e.target.value);
        console.log(emailInpt);
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
                        <button type="submit" className="signUp" onClick={sendEmail}>메일 보내기<img src={check} alt=""/>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FindPassword;