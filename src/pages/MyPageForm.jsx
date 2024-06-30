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

    const [fetchedUserInfo, setFetchedUserInfo] = useState({
        password: '',
        nickname: '',
        userPublicScope: true,
        image: '',
    });

    const [profileImg, setProfileImg] = useState(basicProfile);
    const [userInfo, setUserInfo] = useState({ email: '', nickname: '', password: '', userPublicScope: false, image: '' });
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    const onChangeProfileImg = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProfileImg(reader.result); // base64 인코딩된 URL로 설정
            setUserInfo({ ...userInfo, image: file });
        };

        if (file) {
            reader.readAsDataURL(file); // 파일을 읽어서 base64 URL로 변환
        }
    };

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchMyInfo();
    }, []);

    // 회원 정보 get
    const fetchMyInfo = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { email, userPublicScope, image, nickname } = response.data;
            setUserInfo({ email, userPublicScope, image, nickname, password: '' });
            setFetchedUserInfo({ userPublicScope, image, nickname, password: '' });
            if (image) {
                setProfileImg(image);
            }

        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const handlePublicScopeChange = () => {
        setUserInfo({ ...userInfo, userPublicScope: !userInfo.userPublicScope });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleBackClick = () => {
        navigate('/mypage');
    };

    // 회원정보 수정
    const handleSaveClick = async () => {
        try {
            const updatedData = new FormData();
            let hasUpdatedData = false;

            if (fetchedUserInfo.nickname !== userInfo.nickname) {
                updatedData.append('nickname', userInfo.nickname);
                hasUpdatedData = true;
            }

            if (fetchedUserInfo.image !== userInfo.image) {
                updatedData.append('image', userInfo.image);
                hasUpdatedData = true;
            }

            if (userInfo.password) {
                updatedData.append('password', userInfo.password);
                hasUpdatedData = true;
            }

            if (fetchedUserInfo.userPublicScope !== userInfo.userPublicScope) {
                updatedData.append('userPublicScope', userInfo.userPublicScope);
                hasUpdatedData = true;
            }

            if (hasUpdatedData) {
                await axios.put(`http://34.121.86.244/users/me`, updatedData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                alert('수정완료.');
                navigate('/mypage');
            } else {
                alert('변경된 사항이 없습니다.');
            }
        } catch (error) {
            debugger;
            alert(error.message || error.response.data);
            console.log(error);
        }
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
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
                                <button onClick={togglePasswordFields}>변경하기</button>
                            </div>
                            {showPasswordFields && (
                                <>
                                    <Input form="password" name="비밀번호" type="password" onChange={handleInputChange} placeholder="영어, 숫자, 특수문자 포함 8~20자" />
                                    <Input name="비밀번호 확인" type="password" placeholder="비밀번호 확인" />
                                </>
                            )}
                        </div>
                        <Input form="nickname" name="닉네임" value={userInfo.nickname} onChange={handleInputChange} />
                        <div className="nondisclosureYn">
                            <div className="question">
                                <p>비공개 계정을 원하시나요?</p>
                                <Checkbox id="yn" checked={userInfo.userPublicScope} onClick={handlePublicScopeChange} />
                            </div>
                            <p className="description">비공개로 할 경우 친구에게만 내 TODO가 노출됩니다.</p>
                        </div>
                        <div className="signUpBtn">
                            <button className="back" onClick={handleBackClick}><img src={back} alt="뒤로가기" /></button>
                            <button className="save" onClick={handleSaveClick}>저장하기<img src={check} alt="체크" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageForm;
