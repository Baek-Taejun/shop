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
  // 페이지 이동을 도와주는 navigate훅
  let navigate = useNavigate();
  return (
    <div className="App">
      {/* 상단바  */}
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
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

      {/* 페이지 이동은 Link태그를 사용 */}
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}
      {/* 404 페이지 만드는법 */}
      {/* <Router path="*" element={<div>없는페이지요.</div>} */}
      {/* 대문 사진 */}
      <div
        className="main-bg"
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>
      {/* 페이지를 나누는 루터안에 홈상품만 보여주고 싶으면 상품보여주는 코드를 홈 루터에 넣으면됨 그리고 하나의 div태그로 묶어 줘야함*/}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Container>
                <Row>
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i}></Card>;
                  })}
                </Row>
              </Container>{" "}
              {/* 서버에 겟요청 하는 법  */}
              <button
                onClick={() => {
                  axios
                    .get("https://codingapple1.github.io/shop/data3.json")
                    .then((result) => {
                      let copy = [...shoes, ...result.data];
                      setShoes(copy);
                    });

                  // url을 여러개 받고 싶을떄는 Promise.all을 사용
                  // Promise.all([axios.get(`/url1`), axios.get(`/url2`)]);
                  // .then(()=>{
                  // })
                  // 겟 요청이 실패했을때 사용
                  // .catch(()=>{
                  //   console.log('실패함')
                  // })
                }}
              >
                더보기
              </button>
            </>
          }
        />
        {/* 페이지를 여러개 만들고 싶으면 URL파라미터(id)를 사용 */}
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        {/* 404 페이지 만드는법 *를 넣어준다. */}
        {/* <Route path="*" element={<div>없는페이지</div>} /> */}
        {/* Nested Routers 네스트란 테크안에 테그가 들어간것 사용법 /여러 유사 페이지가 필요할때 좋음*/}
        {/* <Route path="/about" element={<About />}>
          <Route path="member" element={<div>멤버임</div>} />
          <Route path="location" element={<div>위치임</div>} />
        </Route> */}
        {/* 
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route> */}
      </Routes>

      {/* JSX로도 이미지 나타내기 가능(css에서도 가능)  import 해야함 */}
      {/* 상품 목록 */}
    </div>
  );
}

// 상품 정보 컨포넌트 //
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

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      {/* 쉽게말해 구멍임 네스트 메인 루트의 밑에 코드도 동시에 보여줄수 있다. 어디에 보여줄지 정하는 것 */}
      <Outlet></Outlet>
    </div>
  );
}

// 숙제숙제숙제숙제숙제숙제숙제숙제숙제숙제숙제
// function Event() {
//   return (
//     <div>
//       <h4>오늘의 이벤트</h4>
//       {/* 쉽게말해 구멍임 네스트 메인 루트의 밑에 코드도 동시에 보여줄수 있다. 어디에 보여줄지 정하는 것 */}
//       <Outlet></Outlet>
//     </div>
//   );
// }

export default App;
