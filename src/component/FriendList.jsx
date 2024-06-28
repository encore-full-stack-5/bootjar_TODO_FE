import React from 'react';
import basicProfile from "../assets/images/basicProfile.svg";
import {Link} from "react-router-dom";

const FriendList = () => {
    return (
        <>
            <div className="friendListWrap">
                <p className="friendListTitle">내 친구</p>
                <ul className="friendList">
                    <li className="friend">
                        <Link to='/todo?query=friend' state={{userId: 1}} >
                            <img src={basicProfile} alt="프로필 사진"/>
                            <p>정희석</p>
                        </Link>
                    </li>
                    <li className="friend">
                        <img src={basicProfile} alt="프로필 사진"/>
                        <p>RedTiger</p>
                    </li>
                    <li className="friend">
                        <img src={basicProfile} alt="프로필 사진"/>
                        <p>김sort</p>
                    </li>
                    <li className="friend">
                        <img src={basicProfile} alt="프로필 사진"/>
                        <p>HellChang</p>
                    </li>
                    <li className="friend">
                        <img src={basicProfile} alt="프로필 사진"/>
                        <p>bootjar</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FriendList;