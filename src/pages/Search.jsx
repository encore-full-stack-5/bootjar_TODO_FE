import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/search.css";
import Header from "../component/Header.jsx";
import { getSearchList } from "../api_f/friend.js";
import {Link} from "react-router-dom";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import nondisclosure from "../assets/images/nondisclosure.svg";
import publicAcc from "../assets/images/public.svg";

const Search = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [searchError, setSearchError] = useState(false);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const queryParam = query.get('query');
        setSearchQuery(queryParam || '');
        search(queryParam);
    }, [location.search]);

    const search = async (query) => {
        if (!query) {
            setSearchError(true);
            return;
        }

        try {
            const res = await getSearchList({ nickname: query });
            if (res.status === 200) {
                setUsers(res.data);
                setSearchError(false);
            }
        } catch (error) {
            console.error("Error fetching friend list", error);
        }
    };

    return (
        <>
            <div className="searchContainer">
                <Header />
                <div className="searchWrap">
                    <p className="searchResult"><span>{searchQuery}</span> 검색 결과</p>
                    {searchError && <><br/><h1 className="searchError">검색어를 입력해주세요!</h1></>}
                    {!searchError && users.length === 0 && <><br/><h1 className="searchError">검색 결과가 없습니다!</h1></>}
                    {!searchError && users.length > 0 && (
                        <>
                            <ul className="searchList">
                                {users.map(user => (
                                    <li className="list" key={user.userId}>
                                        <Link to='/todo?query=search' state={{userId: user.userId, userNickname: user.nickname, userImage: user.image}}>
                                            <img
                                                src={user.image === "default" || !user.image ? basicProfile : user.image}
                                                alt="프로필 사진"/>
                                            <p className="nickname">{user.nickname}</p>
                                            <div className="account">
                                                <p>{user.userPublicScope ? "공개 계정" : "비공개 계정"}</p>
                                                {user.userPublicScope ? (
                                                    <img src={publicAcc} alt="공개"/>
                                                ) : (
                                                    <img src={nondisclosure} alt="비공개"/>
                                                )}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Search;
