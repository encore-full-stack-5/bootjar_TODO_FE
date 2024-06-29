import React, {useState} from 'react';
import "../styles/todo.css";
import Checkbox from "../component/Checkbox.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import Input from "../component/Input.jsx";

const TodoForm = () => {
    return (
        <>
            <div className="modalContainer">
                <span className="modalOverlay"></span>
                <div className="modalWrap">
                    <div className="modalHeader">
                        <select name="" id="" className="category">
                            <option>기본</option>
                            <option>생활</option>
                            <option>뭐냐</option>
                            <option>뭐시기</option>
                        </select>
                    </div>
                    <div className="modalBody">
                        <div className="todo">
                            <Input type="text" placeholder="할일명" />
                            <Input type="date" />
                        </div>
                        <textarea name="" id="" cols="30" rows="10" className="todoDesc"></textarea>
                    </div>
                    <div className="todoFormBtn">
                        <button>취소</button>
                        <button>저장</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoForm;