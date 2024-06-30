import React, { useEffect, useState } from 'react';
import "../styles/myPage.css";
import Header from "../component/Header.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import modify from "../assets/images/modifyImg.svg";
import Input from "../component/Input.jsx";
import Checkbox from "../component/Checkbox.jsx";
import back from "../assets/images/back.svg";
import check from "../assets/images/check.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPageForm = () => {
    const navigate = useNavigate();

    const [profileImg, setProfileImg] = useState(basicProfile);
    const [userInfo, setUserInfo] = useState({ email: '', userPublicScope: false, image: '' });

    const onChangeProfileImg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file); // 파일을 읽어서 base64 URL로 변환
        }
    };

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        fetchMyInfo();
    }, []);
    
    //회원 정보 get
    const fetchMyInfo = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { email, userPublicScope, image } = response.data;
            setUserInfo({ email, userPublicScope, image });
            if (image) {
                setProfileImg(image);
            }
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const handlePublicScopeChange = (e) => {
        setUserInfo({ ...userInfo, userPublicScope: e.target.checked });
    };

    const handleBackClick = () => {
        navigate('/mypage');
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.put(`http://34.121.86.244/users/me`, {
                userPublicScope: userInfo.userPublicScope,
                image: profileImg,
                // Add other fields you want to update
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('저장되었습니다.');
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    return (
        <div className="myPageContainer">
            <Header />
            <div className="myPageFormWrap">
                <p className="title">내 정보</p>
                <div className="formContainer">
                    <div className="profileImgForm">
                        <img src={profileImg} alt="프로필 사진" />
                        <input type="file" id="chngImg" onChange={onChangeProfileImg} />
                        <label htmlFor="chngImg" className="chngImg">
                            <img src={modify} alt="변경" />
                        </label>
                    </div>
                    <div className="inptFormWrap">
                        <Input name="이메일" value={userInfo.email} readOnly />
                        <div className="chngPw inptForm">
                            <div className="chngPwHead">
                                <label>비밀번호</label>
                                <button>변경하기</button>
                            </div>
                            {/*변경하기 클릭 시 아래 input 활성화*/}
                            {/*<input type="password" placeholder="영어, 숫자, 특수문자 포함 8~20자" />*/}
                            {/*<Input name="비밀번호 확인" type="password" placeholder="비밀번호 확인"/>*/}
                        </div>
                        <Input name="닉네임" placeholder="4~10자로 입력해 주세요" />
                        <div className="nondisclosureYn">
                            <div className="question">
                                <p>비공개 계정을 원하시나요?</p>
                                <Checkbox id={'yn'} checked={userInfo.userPublicScope} onChange={handlePublicScopeChange} />
                            </div>
                            <p className="description">비공개로 할 경우 친구에게만 내 TODO가 노출됩니다.</p>
                        </div>
                        <div className="signUpBtn">
                            <button className="back" onClick={handleBackClick}><img src={back} alt="뒤로가기" /></button>
                            <button className="save" onClick={handleSaveClick}>저장하기<img src={check} alt="" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageForm;