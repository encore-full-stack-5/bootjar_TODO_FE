import React, { useState, useEffect } from 'react';
import "../styles/myPage.css";
import Header from "../component/Header.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import nondisclosure from "../assets/images/nondisclosure.svg";
import Public from "../assets/images/public.svg";
import back from "../assets/images/back.svg";
import modify from "../assets/images/modify.svg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        email: '',
        nickname: '',
        userPublicScope: true,
        image: basicProfile,
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchMyInfo();
    }, []);

    const fetchMyInfo = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { email, nickname, userPublicScope, image } = response.data;
            setUserInfo({ email, nickname, userPublicScope, image });
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const handleUpdateClick = () => {
        navigate('/edit-profile');
    };

    const handleHomeClick = () => {
        navigate('/home');
    };

    return (
        <>
            <div className="myPageContainer">
                <Header />
                <div className="myPageWrap">
                    <p className="title">내 정보</p>
                    <img src={userInfo.image || basicProfile} className="profileImg" />
                    <p className="nickname">{userInfo.nickname}</p>
                    <p className="email">{userInfo.email}</p>
                    <div className="account">
                    <p>{userInfo.userPublicScope ? '비공개 계정' : '공개 계정'}</p>
                        {userInfo.userPublicScope ? (
                         <img src={nondisclosure} alt={"비공개"} />
                        ) : (
                        <img src={Public} alt={"공개"} />
                        )}
                    </div>
                    <div className="myPageBtn">
                        <button className="back" onClick={handleHomeClick}><img src={back} alt="뒤로가기" /></button>
                        <button className="mdf" onClick={handleUpdateClick}>수정하기<img src={modify} alt="" /></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyPage;

