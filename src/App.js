import logo from "./logo.svg";
import { Button, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./App.css";
import bg from "./img/bg.png";
import { useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from "./pages/Detail.js";
import axios from "axios";

function App() {
  let [shoes, setShoes] = useState(data); //상품데이터 import해서 data.js에서 가져옴//
  let navigate = useNavigate();
  //탑메뉴//
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* JSX로도 이미지 나타내기 가능(css에서도 가능)  import 해야함 */}
      {/* 대문 사진 */}
      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>

      {/* 상품 목록 */}

      <Container>
        <Row>
          {shoes.map((a, i) => {
            return <Card shoes={shoes[i]} i={i}></Card>;
          })}
        </Row>
      </Container>

      {/* <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>
        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
          </Route> */}

      <button
        onClick={() => {
          axios
            .get("https://codingapple1.github.io/shop/data2.json")
            .then((response) => {
              let copy = [...shoes, ...response.data];
              setShoes(copy);
            });
        }}
      >
        더보기
      </button>
    </div>
  );
}

// function Event() {
//   return (
//     <div>
//       <h4>오늘의 이벤트</h4>
//       <Outlet></Outlet>
//     </div>
//   );
// }

// 이건 컨포넌트 //
function Card(props) {
  return (
    <Col>
      <img
        src={
          "https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"
        }
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

export default App;
