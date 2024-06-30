import React, {useState, useEffect} from 'react';
import basicProfile from "../assets/images/basicProfile.svg";
import {Link} from "react-router-dom";
import {getFriends} from "../api_f/friend.js";

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    const getFriendList = async () => {
        try {
            const res = await getFriends();
            if (res.status === 200) {
                setFriends(res.data);
            }
        } catch (error) {
            console.error("Error fetching friend list", error);
        }
    };

    useEffect(() => {
        getFriendList();
    }, []);

    return (
        <div className="friendListWrap">
            <p className="friendListTitle">내 친구</p>
            <ul className="friendList">
                {friends.map(friend => (
                    <li key={friend.userId} className="friend">
                        <Link to='/todo?query=friend' state={{userId: friend.userId, userNickname: friend.userNickname}}>
                            <img
                                src={friend.userImage === "default" || !friend.userImage ? basicProfile : friend.userImage}
                                alt="프로필 사진"/>
                            <p>{friend.userNickname}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendList;
