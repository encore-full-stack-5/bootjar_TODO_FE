import React, {useEffect, useState} from 'react';
import "../styles/todo.css";
import Checkbox from "../component/Checkbox.jsx";
import axios from "axios";
import {categories} from "../config_f/categories.js";
import Date from "../component/Date.jsx";
import TodoForm from "./TodoForm.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import close from "../assets/images/delete.svg";

const Todo = (props) => {
    const { onClickTodoShowModal, onClickTodoDelete, todoId, disabled } = props;

    // token
    const getToken = `Bearer ${localStorage.token}`;
    const [isLoading, setIsLoading] = useState(true);
    const [todo, setTodo] = useState({
        categoryId: 0,
        todoTitle: "",
        todoContent: "",
        todoDate: "",
        todoDone: false
    });
    // modal
    const [showTodoMdfModal, setShowTodoMdfModal] = useState(false);

    const handleEdit = () => {
        setShowTodoMdfModal(!showTodoMdfModal);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://34.121.86.244/todos/${todoId}`, {
                headers: {
                    Authorization: getToken
                }
            });
            alert(response.data.message);
            onClickTodoDelete();
        } catch (error) {
            console.log(error);
        }
    };

    const onClickUpdateSave = () => {
        setShowTodoMdfModal(false);
        fetchData();
    }
    // comment
    const [comments, setComments] = useState([]);
    const [isCommentMdf, setIsCommentMdf] = useState(false);
    const [mdfCommentId, setMdfCommentId] = useState();
    const [commentInpt, setCommentInpt] = useState('');
    const [mdfCommentInpt, setMdfCommentInpt] = useState('');
    // user
    const [userNickname, setUserNickname] = useState();

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/${todoId}`, {
                headers: {
                    Authorization: getToken
                }
            });
            setTodo(response.data);
            console.log(response.data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // [comment] 조회
    const fetchCommentsData = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/${todoId}/comments`);
            setIsCommentMdf(false);
            setComments(response.data);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    // [user]
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/users/me`, {
                headers: {
                    Authorization: getToken
                }
            });
            setUserNickname(response.data.nickname);
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    // [comment] 저장
    const onClickSaveComment = async (comment) => {
        if(commentInpt === null || commentInpt === '') {
            alert('댓글을 입력해 주세요.');
            return null;
        }
        try {
            await axios.post(`http://34.121.86.244/todos/${todoId}/comments`, {
                content: commentInpt
            }, {
                headers: {
                    Authorization: getToken
                }
            })
            setCommentInpt('');
            fetchCommentsData();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    // [comment] 수정
    const onClickeUpdateComment = async (comment) => {
        if(mdfCommentInpt === null || mdfCommentInpt === '') {
            alert('댓글을 입력해 주세요.');
            return null;
        }
        try {
            await axios.put(`http://34.121.86.244/todos/${todoId}/comments/${comment}`, {
                content: mdfCommentInpt
            })
            fetchCommentsData();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    const onClickIsMdf = (el, index) => {
        setIsCommentMdf(true);
        setMdfCommentInpt(el.content);
        setMdfCommentId(index);
    }
    // [comment] 삭제
    const onClickDeleteComment = async (comment) => {
        const commentDelete = confirm('댓글을 삭제하시겠습니까?')
        if (commentDelete) {
            try {
                await axios.delete(`http://34.121.86.244/todos/${todoId}/comments/${comment}`);
                alert('삭제되었습니다');
                fetchCommentsData();
            } catch (error) {
                alert(error.message);
                console.log(error);
            }
        } else {
            return null;
        }
    }
    // [comment] onChange
    const onChangeCommentInpt = (e) => {
        setCommentInpt(e.target.value);
    }
    const onChangeMdfCommentInpt = (e) => {
        setMdfCommentInpt(e.target.value);
    }
    const updateDone = async (todoId) => {
        try {
            const response = await axios.put(`http://34.121.86.244/todos/${todoId}/check`,
                {},{
                    headers: {
                        Authorization: getToken
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        fetchData();
        fetchCommentsData();
        fetchUserData();
    }, []);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    return (
        <>
            <div className="modalContainer">
                <span className="modalOverlay"></span>
                <div className="modalWrap">
                    <button className="modalClose">
                        <img src={close} alt="닫기" onClick={onClickTodoShowModal} />
                    </button>
                    <div className="modalHeader">
                        <p className="category">{categories[todo.categoryId]}</p>
                        <button className="menu">
                        <div className="menuBtn">
                            <button onClick={handleEdit}>수정하기</button>
                            <button onClick={handleDelete}>삭제하기</button>
                        </div>
                    </button>
                    </div>
                    <div className="modalBody">
                        <div className="todo">
                            <Checkbox id={`1`} check={todo.todoDone} disabled={!disabled} clickHandler={()=>updateDone(todoId)} />
                            <p className="todoTitle">{todo.todoTitle}</p>
                            <p className="date">{todo.todoDate}</p>
                        </div>
                        <p className="todoDesc">{todo.todoContent}</p>
                    </div>
                    <ul className="todoComment">
                        {
                            comments.length > 0 ?
                            comments.map((el, index) => (
                                <li className="comment" key={index}>
                                    {
                                        !isCommentMdf ?
                                            <>
                                                <img src={el?.image || basicProfile} alt={"프로필 사진"}/>
                                                <div className="commentInfo">
                                                    <div className="commentHead">
                                                        <p className="nickname">{el?.nickname}</p>
                                                        <p className="date">{Date(el?.updatedAt)}</p>
                                                    </div>
                                                    <p className="text">{el?.content}</p>
                                                </div>
                                                {
                                                    el?.nickname === userNickname &&
                                                    <div className="commentBtn">
                                                        <button>
                                                            <img src={mdfComment} alt="수정" onClick={() => onClickIsMdf(el, index)}/>
                                                        </button>
                                                        <button>
                                                            <img src={deleteComment} alt="삭제" onClick={() => onClickDeleteComment(el?.id)} />
                                                        </button>
                                                    </div>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    isCommentMdf && mdfCommentId === index &&
                                                    <div className="postComment">
                                                        <input type="text" placeholder="댓글 입력" value={mdfCommentInpt} onChange={onChangeMdfCommentInpt}/>
                                                        <button className="cancel" onClick={() => setIsCommentMdf(false)}>
                                                            <img src={close} alt="취소"/>
                                                        </button>
                                                        <button className="send" onClick={() => onClickeUpdateComment(el.id)}></button>
                                                    </div>
                                                }
                                            </>
                                    }
                                </li>
                            ))
                                : <p className="noneComment">댓글이 없습니다.</p>
                        }
                    </ul>
                    <div className="postComment">
                        <input type="text" placeholder="댓글 입력" value={commentInpt} onChange={onChangeCommentInpt} />
                        <button className="send" onClick={onClickSaveComment}></button>
                    </div>
                </div>
            </div>
            { showTodoMdfModal && <TodoForm handleEdit={handleEdit} onClickUpdateSave={onClickUpdateSave} todo={todo} todoId={todoId} /> }
        </>
    )
}

export default Todo;