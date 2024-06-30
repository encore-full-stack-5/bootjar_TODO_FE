import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import FriendMain from "./pages/FriendMain.jsx";
import Todo from "./pages/Todo.jsx";
import Search from "./pages/Search.jsx";
import MyPage from './pages/MyPage.jsx';
import MyPageForm from './pages/MyPageForm.jsx';
import TodoForm from "./pages/TodoForm.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<FriendMain />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/detail" element={<Todo />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/home" element={<Main />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/edit-profile" element={<MyPageForm />}></Route>
          <Route path="/todos/new" element={<TodoForm />}></Route>
          {/*<Route path="/product/*" element={<Product />}></Route>*/}
          {/*<Route path="*" element={<NotFound />}></Route>*/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
