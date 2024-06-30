import React, {useState} from 'react';
import "../styles/todo.css";
import Checkbox from "../component/Checkbox.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import Input from "../component/Input.jsx";
import {categories} from "../config_f/categories.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const TodoForm = () => {
    const [formData, setFormData] = useState({
        categoryId: 1,
        todoTitle: '',
        todoDate: '',
        todoContent: ''
    });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'categoryId' ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://34.121.86.244/todos',
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Todo created:', response.data);
            alert("성공적으로 생성되었습니다")
            navigate('/home');
            // 여기에 성공 메시지를 표시하거나 다른 작업을 수행할 수 있습니다.
        } catch (error) {
            console.error('Error creating todo:', error);
            alert("생성 실패")
            // 여기에 에러 메시지를 표시할 수 있습니다.
        }
    };
    const handleCancel = () => {
        navigate('/home'); // 취소 버튼 클릭 시 홈으로 이동
    };

    return (
        <>
            <div className="modalContainer">
                <span className="modalOverlay"></span>
                <div className="modalWrap">
                    <div className="modalHeader">
                        <select
                            name="categoryId"
                            className="category"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            {Object.entries(categories).map(([key, value]) => (
                                <option key={key} value={key}>{value}</option>
                            ))}
                        </select>
                    </div>
                    <div className="modalBody">
                        <div className="todo">
                            <input
                                type="text"
                                name="todoTitle"
                                placeholder="할일명"
                                value={formData.todoTitle}
                                onChange={handleChange}
                            />
                            <input
                                type="date"
                                name="todoDate"
                                value={formData.todoDate}
                                onChange={handleChange}
                            />
                        </div>
                        <textarea
                            name="todoContent"
                            cols="30"
                            rows="10"
                            className="todoDesc"
                            value={formData.todoContent}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="todoFormBtn">
                        <button type="button" onClick={handleCancel}>취소</button>
                        <button type="submit" onClick={handleSubmit}>저장</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoForm;