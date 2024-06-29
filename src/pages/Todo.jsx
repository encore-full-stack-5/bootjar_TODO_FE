import React, {useEffect, useState} from 'react';
import "../styles/todo.css";
import Checkbox from "../component/Checkbox.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import {useLocation} from "react-router-dom";
import axios from "axios";

const Todo = () => {
    const todoId = useLocation().state?.todoId;
    const disabled = useLocation().state?.disabled;
    const [todo, setTodo] = useState({
        categoryId: 0,
        todoTitle: "",
        todoContent: "",
        todoDate: "",
        todoDone: false
    });
    const categories = {
        1: '생활',
        2: '운동',
        3: '공부',
        4: '기타'
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/${todoId}`, {
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJlbWFpbCI6InRlc3RAbmF2ZXIuY29tIiwibmlja05hbWUiOiLquYDsoJXroKwifQ.9comIDy7SoJ7BWytQEXiAxnUTj55foSGlYT_nKgb6PQ"
                }
            });
            setTodo(response.data);
            console.log(response.data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    };

    useEffect( () => {
        fetchData();
    }, [])
    return (
        <>
            <div className="modalContainer">
                <span className="modalOverlay"></span>
                <div className="modalWrap">
                    <div className="modalHeader">
                        <p className="category">{categories[todo.categoryId]}</p>
                        <button className="menu">
                        <div className="menuBtn">
                            <button>수정하기</button>
                            <button>삭제하기</button>
                        </div>
                    </button>
                    </div>
                    <div className="modalBody">
                        <div className="todo">
                            <Checkbox id={`1`} check={todo.todoDone} disabled={!disabled}/>
                            <p className="todoTitle">{todo.todoTitle}</p>
                            <p className="date">{todo.todoDate}</p>
                        </div>
                        <p className="todoDesc">{todo.todoContent}</p>
                    </div>
                    <ul className="todoComment">
                        <li className="comment">
                            <img src={basicProfile} alt={"프로필 사진"}/>
                            <div className="commentInfo">
                                {/* TODO 댓글부터 */}
                                <div className="commentHead">
                                    <p className="nickname">bootjar</p>
                                    <p className="date">2024-06-11</p>
                                </div>
                                <p className="text">아 몰라앙!</p>
                            </div>
                            <div className="commentBtn">
                                <button>
                                    <img src={mdfComment} alt="수정"/>
                                </button>
                                <button>
                                    <img src={deleteComment} alt="삭제"/>
                                </button>
                            </div>
                        </li>
                        <li className="comment">
                            <img src={basicProfile} alt={"프로필 사진"}/>
                            <div className="commentInfo">
                                {/* TODO 댓글부터 */}
                                <div className="commentHead">
                                    <p className="nickname">sort</p>
                                    <p className="date">2024-06-11</p>
                                </div>
                                <p className="text">미람아,</p>
                            </div>
                            <div className="commentBtn">
                                <button>
                                    <img src={mdfComment} alt="수정"/>
                                </button>
                                <button>
                                    <img src={deleteComment} alt="삭제"/>
                                </button>
                            </div>
                        </li>
                    </ul>
                    <div className="postComment">
                        <input type="text" placeholder="댓글 입력"/>
                        <button className="send"></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;