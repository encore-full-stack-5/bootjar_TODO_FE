import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../styles/main.css";
import Header from "../component/Header.jsx";
import Checkbox from "../component/Checkbox.jsx";
import { Link, useNavigate } from 'react-router-dom';
import Calendar from "../component/Calendar.jsx";
import FriendList from "../component/FriendList.jsx";
import axios from "axios";
import { sendFriendRequest } from "../api_f/friend.js";
import { categories } from "../config_f/categories.js";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import comment from "../assets/images/comment.svg";
import deleteFriend from "../assets/images/delete.svg";
import bottom from "../assets/images/bottom.svg";

const FriendMain = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const userId = location.state?.userId;
    const userNickname = location.state?.userNickname;
    const userImage = location.state?.userImage;
    const myNickname = localStorage.getItem('myNickname'); // Load myNickname from localStorage

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [todos, setTodos] = useState([]);
    const [userImg, setUserImg] = useState('');
    const [friendsList, setFriendsList] = useState([]);

    const friend = new URLSearchParams(location.search).get("query") === "friend";
    const search = new URLSearchParams(location.search).get("query") === "search";

    useEffect(() => {
        const storedFriends = localStorage.getItem('friends');
        if (storedFriends) {
            setFriendsList(JSON.parse(storedFriends));
        }
    }, []);

    const sendRequest = async (receiverId) => {
        try {
            const res = await sendFriendRequest(receiverId);
            if (res.status === 200) {
                alert("요청을 보냈습니다!");
            }
        } catch (error) {
            alert("이미 처리된 요청입니다!");
        }
    };

    const handleDeleteClick = () => {
        navigate('/home');
    };

    const fetchFriendTodos = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/friends/${userId}?query=${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTodos(response.data.todos);
            console.log(response.data);
            console.log(selectedDate);
        } catch (error) {
            setTodos([]);
            alert(error.response.data.message);
            console.log(error);
        }
    };

    const fetchUserTodos = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/users/${userId}?query=${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTodos(response.data.todos);
            console.log(response.data);
            console.log(selectedDate);
        } catch (error) {
            setTodos([]);
            alert(error.response.data.message);
            console.log(error);
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserImg(response.data.image);
        } catch (error) {
            alert(error.message);
        }
    };

    const groupedTodos = todos.reduce((acc, todo) => {
        const category = categories[todo.categoryId] || '기타';
        if (!acc[category]) acc[category] = [];
        acc[category].push(todo);
        return acc;
    }, {});

    // Function to check if a user is a friend or if the user's nickname matches myNickname
    const isFriend = (userId, nickname) => {
        return friendsList.some(friend => friend.userId === userId) || nickname === myNickname;
    };

    useEffect(() => {
        fetchUser();
        if (friend) fetchFriendTodos();
        else if (search) fetchUserTodos();
    }, [selectedDate, userId]);

    return (
        <>
            <div className="mainContainer">
                <span className="bgLayout"></span>
                <Header />
                <div className="mainWrap">
                    <div className="calendarContainer">
                        <div className="calendar">
                            <Calendar setDate={setSelectedDate} />
                        </div>
                    </div>
                    <div className="todoContainer">
                        <div className="userProfile">
                            <div className="userInfo">
                                <img
                                    src={userImage === "default" || !userImage ? basicProfile : userImage}
                                    alt="프로필 사진"/>
                                <p className="nickname">{userNickname}</p>
                                <p>TODO</p>
                                {search && !isFriend(userId, userNickname) && (
                                    <button className="request" onClick={() => sendRequest(userId)}>친구 요청</button>
                                )}
                            </div>
                            <div className="delete">
                                <button onClick={handleDeleteClick}><img src={deleteFriend} alt=""/></button>
                            </div>
                        </div>
                        <div className="todoWrap friendTodo">
                            {Object.keys(groupedTodos).map(category => (
                                <ul key={category} className="todoList">
                                    <p className="category"><img src={bottom} alt=""/>{category}</p>
                                    {groupedTodos[category].map(todo => (
                                        <li key={todo.todoId} className={`todo ${todo.todoDone ? 'done' : ''}`}>
                                            <Checkbox id={`todo-${todo.todoId}`} check={todo.todoDone} disabled={true} />
                                            <p>
                                                <Link to='/detail' state={{ todoId: todo.todoId, disabled: false }}>
                                                    {todo.todoTitle}
                                                </Link>
                                            </p>
                                            <img src={comment} alt="댓글" className="comment" />
                                        </li>
                                    ))}
                                </ul>
                            ))}
                            {todos.length === 0 && <p className="noneTodo">할 일이 없습니다.</p>}
                        </div>
                        <div className="myHome">
                            <li className="me">
                                <Link to='/home'>
                                    <img
                                        src={userImg || basicProfile}
                                        alt="프로필 사진"/>
                                    <p>나</p>
                                </Link>
                            </li>
                            <FriendList/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FriendMain;
