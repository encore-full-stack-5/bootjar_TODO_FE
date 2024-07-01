import React, {useState} from 'react';
import '../styles/auth.css';
import Input from "../component/Input.jsx";
import axios from "axios";
// img
import check from "../assets/images/check.svg";

const ChangePassword = () => {
    const token = new URLSearchParams(location.search).get("query");

    const [passwordInpt, setPasswordInpt] = useState();
    const [passwordConfirmInpt, setPasswordConfirmInpt] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const onClickUpdatePassword = async () => {
        if(passwordInpt !== passwordConfirmInpt) {
            alert("비밀번호가 일치하지 않습니다.");
            return null;
        }
        try {
            const response = await axios.post("http://34.121.86.244/users/change/password", {
                qrToken: token,
                password: passwordInpt
            });
            console.log(response);
            setUpdateSuccess(true);
        } catch (error) {
            console.log(error.response.data.password);
        }
    }

    const onchangePasswordInpt = (e) => {
        setPasswordInpt(e.target.value);
    }

    const onChangePasswordConfirmInpt = (e) => {
        setPasswordConfirmInpt(e.target.value);
    }

    return (
        <>
            <div className="authContainer">
                <p className="title">{!updateSuccess ? `비밀번호 변경` : `비밀번호 변경 완료!`}</p>
                {
                    !updateSuccess ?
                        <form className="signUpForm">
                            <Input name="비밀번호" type="password" placeholder="영어, 숫자, 특수문자 포함 8~20자" value={passwordInpt} onChange={onchangePasswordInpt} />
                            <Input name="비밀번호 확인" type="password" placeholder="비밀번호 확인" value={passwordConfirmInpt} onChange={onChangePasswordConfirmInpt} />
                            <div className="signUpBtn chng">
                                <button type="button" className="signUp" onClick={onClickUpdatePassword}>변경하기<img src={check} alt=""/>
                                </button>
                            </div>
                        </form>
                        :
                        <div className="updateSuccess">
                            <p><span>웹</span> 혹은 <span>iOS</span>에 접속로 접속해<br/>다시 로그인 해주세요.</p>
                        </div>
                }
            </div>
        </>
    )
}

export default ChangePassword;