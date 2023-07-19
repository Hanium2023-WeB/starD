import {Link} from 'react-router-dom';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Mypage from "./pages/Mypage";
import Header from "./components/Header";
const side = () => {
  return (
    <div className="headerbar">
      <nav>
        <ul>
         <li><Link to ={"/login"} style={{ textDecoration: "none", color: "inherit" }}>로그인</Link></li>
          <li><Link to ={"/signup"}style={{ textDecoration: "none", color: "inherit" }}>회원가입</Link></li>
        </ul>
      </nav>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header headText={""} leftChild={""} rightChild={side()} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
