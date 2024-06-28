import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Main from "./pages/Main.jsx";
import FriendMain from "./pages/FriendMain.jsx";
import Todo from "./pages/Todo.jsx";
import Search from "./pages/Search.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/todo" element={<FriendMain />}></Route>
          <Route path="/search" element={<Search />}></Route>
          // <Route path="/" element={<Todo />}></Route> // 이 부분 충돌 나서 제가 임의로 주석 처리 해놔요 -부자
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/home" element={<Main />}></Route>
          {/*<Route path="/product/*" element={<Product />}></Route>*/}
          {/*<Route path="*" element={<NotFound />}></Route>*/}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
