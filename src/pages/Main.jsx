import React, {useEffect, useState} from 'react';
import "../styles/main.css";
import Header from "../component/Header.jsx";
import Checkbox from "../component/Checkbox.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import notification from "../assets/images/notification.svg";
import comment from "../assets/images/comment.svg";
import move from "../assets/images/move.svg";
import setting from "../assets/images/setting.svg";
import bottom from "../assets/images/bottom.svg";
import done from "../assets/images/done.svg";
import notDone from "../assets/images/notDone.svg";
import commentCount from "../assets/images/commentCount.svg";
import Calendar from "../component/Calendar.jsx";
import FriendList from "../component/FriendList.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";


const Main = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().getUTCFullYear()+"-"+String(new Date().getMonth()+1).padStart(2, '0')+"-"+new Date().getDate());
    const [todos, setTodos] = useState([]);
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handlMyInfoClick = () => {
        navigate('/mypage');
     };

     useEffect(() => {
        fetchMyInfo();
    }, []);

    const token = localStorage.getItem('token');

    const fetchMyInfo = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { nickname } = response.data;
            setNickname(nickname);

        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };


    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/me?query=${selectedDate}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwibmlja05hbWUiOiLquYDsoJXroKwifQ.9comIDy7SoJ7BWytQEXiAxnUTj55foSGlYT_nKgb6PQ"
                }
            });
            setTodos(response.data.todos);
            console.log(response.data);
            console.log(selectedDate);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    const categories = {
        1: '생활',
        2: '운동',
        3: '공부',
        4: '기타'
    };
    const groupedTodos = todos.reduce((acc, todo) => {
        const category = categories[todo.categoryId] || '기타';
        if (!acc[category]) acc[category] = [];
        acc[category].push(todo);
        return acc;
    }, {});
    useEffect(() => {
        fetchTodos();
    }, [selectedDate])
    return (
        <>
            <div className="mainContainer">
                <span className="bgLayout"></span>
                <Header/>
                <div className="mainWrap">
                    <div className="calendarContainer">
                        <div className="calendar">
                            <Calendar setDate={setSelectedDate} />
                        </div>
                        <div className="monthRecord">
                            <div className="record">
                                <span className="icon">
                                    <img src={done} alt={"완료"}/>
                                </span>
                                <div className="recordText">
                                    <p>완료</p>
                                    <p className="count">97</p>
                                </div>
                            </div>
                            <div className="record">
                                <span className="icon">
                                    <img src={notDone} alt={"미완료"}/>
                                </span>
                                <div className="recordText">
                                    <p>미완료</p>
                                    <p className="count">2</p>
                                </div>
                            </div>
                            <div className="record">
                                <span className="icon commentIcon">
                                    <img src={commentCount} alt={"댓글"}/>
                                </span>
                                <div className="recordText">
                                    <p>댓글</p>
                                    <p className="count">17</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="todoContainer">
                        <div className="userProfile">
                            <div className="userInfo">
                                <img src={basicProfile} alt={"프로필 사진"}/>
                                <p className="nickname">{nickname}</p>
                                <p>TODO</p>
                            </div>
                            <div className="userSetting">
                                <button onClick={handlMyInfoClick}>내 정보<img src={setting} alt={""} /></button>
                            </div>
                        </div>
                        <div className="todoWrap">
                            {Object.keys(groupedTodos).map(category => (
                                <ul key={category} className="todoList">
                                    <p className="category"><img src={bottom} alt={""} />{category}</p>
                                    {groupedTodos[category].map(todo => (
                                        <li key={todo.todoId} className={`todo ${todo.todoDone ? 'done' : ''}`}>
                                            <Checkbox id={`todo-${todo.todoId}`} check={todo.todoDone} />
                                            <p>
                                                <Link to='/detail' state={{todoId: todo.todoId, disabled: true}}>
                                                    {todo.todoTitle}
                                                </Link>
                                            </p>
                                            <img src={comment} alt="댓글" className="comment" />
                                            <button className="move"><img src={move} alt="이동" /></button>
                                        </li>
                                    ))}
                                </ul>
                            ))}
                            {todos.length === 0 && <p>할 일이 없습니다.</p>}
                        </div>
                        <FriendList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main;