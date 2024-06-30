import React, {useEffect, useState} from 'react';
import "../styles/todo.css";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import Input from "../component/Input.jsx";
import {categories} from "../config_f/categories.js";
import axios from "axios";
import {useLocation, useNavigate, useParams} from "react-router-dom";

const TodoForm = (props) => {

    const { onClickTodoNewShowModal, onClickTodoSave, onClickUpdateSave, handleEdit, todoId, todo } = props;

    const isEditMode = !!todoId;
    const todoData = todo;
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
        if (isEditMode) {
            try {
                console.log(formData);
                const response = await axios.put(`http://34.121.86.244/todos/${todoId}`,
                    formData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                console.log('Todo updated:', response.data);
                alert(response.data.message);
                onClickUpdateSave();
            } catch (error) {
                console.error('Error updating todo:', error);
                alert("수정 실패")
            }
        } else {
            try {
                console.log(formData);
                const response = await axios.post('http://34.121.86.244/todos',
                    formData, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                console.log('Todo created:', response.data);
                alert(response.data.message)
                onClickTodoSave();
            } catch (error) {
                console.error('Error creating todo:', error);
                alert("생성 실패")
            }
        }
    };
    // const handleCancel = () => {
    //     navigate('/home'); // 취소 버튼 클릭 시 홈으로 이동
    // };

    useEffect(() => {
        if (isEditMode) {
            setFormData(todoData);
        }
    }, []);

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
                                className="inptForm"
                                type="text"
                                name="todoTitle"
                                placeholder="할일명"
                                value={formData.todoTitle}
                                onChange={handleChange}
                            />
                            <input
                                className="inptForm"
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
                        <button type="button" onClick={onClickTodoNewShowModal || handleEdit}>취소</button>
                        <button type="submit" onClick={handleSubmit}>{isEditMode? "수정" : "생성"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoForm;