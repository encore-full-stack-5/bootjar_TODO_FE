import React, {useEffect, useState} from 'react';
import "../styles/todo.css";
import Checkbox from "../component/Checkbox.jsx";
// img
import basicProfile from "../assets/images/basicProfile.svg";
import deleteComment from "../assets/images/deleteComment.svg";
import mdfComment from "../assets/images/mdfComment.svg";
import {useLocation} from "react-router-dom";
import axios from "axios";
import error from "eslint-plugin-react/lib/util/error.js";

const Todo = () => {
    // token
    const getToken = `Bearer ${localStorage.token}`;

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
    // comment
    const [comments, setComments] = useState([]);
    const [isCommentMdf, setIsCommentMdf] = useState(false);
    const [commentInpt, setCommentInpt] = useState();
    // user
    const [userNickname, setUserNickname] = useState();

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

    // [comment] 조회
    const fetchCommentsData = async () => {
        try {
            const response = await axios.get(`http://34.121.86.244/todos/${todoId}/comments`);
            setComments(response.data);
            console.log("댓글 조회: " + response.data);
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
            // TODO : POST
            const response = await axios.post(`http://34.121.86.244/todos/${todoId}/comments`, {
                content: commentInpt
            }, {
                headers: {
                    Authorization: getToken
                }
            })
            debugger;
            fetchCommentsData();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    // [comment] 수정
    const onClickeUpdateComment = async (comment) => {
        try {
            // TODO : PUT
            const response = await axios.put(`http://34.121.86.244/todos/${todoId}/comments/${comment.id}`, {
                // TODO : content 데이터 넣기
                // content:
            })
            fetchCommentsData();
        } catch (error) {
            alert(error.message);
            console.log(error);
        }
    }
    // [comment] 삭제
    const onClickDeleteComment = async (comment) => {
        const commentDelete = confirm('댓글을 삭제하시겠습니까?')
        if (commentDelete) {
            try {
                // TODO : DELETE
                const response = await axios.delete(`http://34.121.86.244/todos/${todoId}/comments/${comment.id}`);
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

    useEffect( () => {
        fetchData();
        fetchCommentsData();
        fetchUserData();
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
                        {
                            comments.length > 0 ?
                            comments.map((el, index) => (
                                <li className="comment" key={index}>
                                    {
                                        !isCommentMdf ?
                                            <>
                                                <img src={el?.image} alt={"프로필 사진"}/>
                                                <div className="commentInfo">
                                                    <div className="commentHead">
                                                        <p className="nickname">{el?.nickname}</p>
                                                        <p className="date">{el?.updatedAt}</p>
                                                    </div>
                                                    <p className="text">{el?.content}</p>
                                                </div>
                                                {/* TODO : 내가 작성한 댓글일 경우에 버튼 노출 */}
                                                {
                                                    el?.nickname === userNickname ?
                                                    <div className="commentBtn">
                                                        <button>
                                                            <img src={mdfComment} alt="수정" onClick={setIsCommentMdf(true)}/>
                                                        </button>
                                                        <button>
                                                            <img src={deleteComment} alt="삭제" onClick={onClickDeleteComment} />
                                                        </button>
                                                    </div>
                                                        :
                                                    <></>
                                                }
                                            </>
                                            :
                                            <>
                                                {/* 수정 클릭 시 */}
                                                {/* TODO : 수정 value 해야 함 */}
                                                <input type="text" placeholder="댓글 입력" value={''} />
                                                <button className="send" onClick={onClickeUpdateComment}></button>
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
        </>
    )
}

export default Todo;