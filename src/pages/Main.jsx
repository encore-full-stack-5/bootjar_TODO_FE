import React, {useEffect, useState} from 'react';
import "../styles/main.css";
import Header from "../component/Header.jsx";
import Checkbox from "../component/Checkbox.jsx";
import Calendar from "../component/Calendar.jsx";
import FriendList from "../component/FriendList.jsx";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { categories } from "../config_f/categories.js";
import Todo from "./Todo.jsx";
import TodoForm from "./TodoForm.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import comment from "../assets/images/comment.svg";
import setting from "../assets/images/setting.svg";
import bottom from "../assets/images/bottom.svg";
// import move from "../assets/images/move.svg";
// import done from "../assets/images/done.svg";
// import notDone from "../assets/images/notDone.svg";
// import commentCount from "../assets/images/commentCount.svg";


const Main = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [selectedDate, setSelectedDate] = useState(new Date().getUTCFullYear()+"-"+String(new Date().getMonth()+1).padStart(2, '0')+"-"+String(new Date().getDate()).padStart(2, '0'));
    const [nickname, setNickname] = useState('');
    const [image, setImage] = useState('');
    // todo
    const [todos, setTodos] = useState([]);
    const [showTodoModal, setShowTodoModal] = useState(false);
    const [showTodoNewModal, setShowTodoNewModal] = useState(false);
    const [todoId, setTodoId] = useState('');

    const handlMyInfoClick = () => {
        navigate('/mypage');
     };

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

            const { nickname ,image} = response.data;
            setNickname(nickname);
            setImage(image)
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/me?query=${selectedDate}`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
    const updateDone = async (todoId) => {
        try {
            const response = await axios.put(`http://34.121.86.244/todos/${todoId}/check`,
                {},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const groupedTodos = todos.reduce((acc, todo) => {
        const category = categories[todo.categoryId] || '기타';
        if (!acc[category]) acc[category] = [];
        acc[category].push(todo);
        return acc;
    }, {});

    // modal
    const onClickTodoShowModal = (todoId) => {
        setShowTodoModal(!showTodoModal);
        setTodoId(todoId);
        fetchTodos();
    }
    const onClickTodoNewShowModal = () => {
        setShowTodoNewModal(!showTodoNewModal);
    }
    const onClickTodoSave = () => {
        setShowTodoNewModal(false);
        fetchTodos();
    }
    const onClickTodoDelete = () => {
        setShowTodoModal(false);
        fetchTodos();
    }

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
                        {/*/!*<div className="monthRecord">*/}
                        {/*    <div className="record">*/}
                        {/*        <span className="icon">*/}
                        {/*            <img src={done} alt={"완료"}/>*/}
                        {/*        </span>*/}
                        {/*        <div className="recordText">*/}
                        {/*            <p>완료</p>*/}
                        {/*            <p className="count">97</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="record">*/}
                        {/*        <span className="icon">*/}
                        {/*            <img src={notDone} alt={"미완료"}/>*/}
                        {/*        </span>*/}
                        {/*        <div className="recordText">*/}
                        {/*            <p>미완료</p>*/}
                        {/*            <p className="count">2</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="record">*/}
                        {/*        <span className="icon commentIcon">*/}
                        {/*            <img src={commentCount} alt={"댓글"}/>*/}
                        {/*        </span>*/}
                        {/*        <div className="recordText">*/}
                        {/*            <p>댓글</p>*/}
                        {/*            <p className="count">17</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*!/*/}
                    </div>
                    <div className="todoContainer">
                        <div className="userProfile">
                            <div className="userInfo">
                                <img src={image || basicProfile} alt={"프로필 사진"}/>
                                <p className="nickname">{nickname}</p>
                                <p>TODO</p>
                                <button className="request" onClick={onClickTodoNewShowModal}>TODO 추가</button>
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
                                            <Checkbox id={`todo-${todo.todoId}`} check={todo.todoDone} clickHandler={()=>updateDone(todo.todoId)} />
                                            <p onClick={() => onClickTodoShowModal(todo.todoId)}>
                                                {todo.todoTitle}
                                            </p>
                                            <img src={comment} alt="댓글" className="comment" />
                                            {/*<button className="move"><img src={move} alt="이동" /></button>*/}
                                        </li>
                                    ))}
                                </ul>
                            ))}
                            {todos.length === 0 && <p className="noneTodo">할 일이 없습니다.</p>}
                        </div>
                        <FriendList />
                    </div>
                </div>
            </div>
            { showTodoModal && <Todo onClickTodoShowModal={onClickTodoShowModal} onClickTodoDelete={onClickTodoDelete} todoId={todoId} disabled={true} /> }
            { showTodoNewModal && <TodoForm onClickTodoNewShowModal={onClickTodoNewShowModal} onClickTodoSave={onClickTodoSave} /> }
        </>
    )
}

export default Main;