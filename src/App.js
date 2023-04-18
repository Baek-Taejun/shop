import logo from './logo.svg';
import { Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import './App.css';
import bg from './img/bg.png';
import jo from './img/jordan1.jpg';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import Detail from './pages/Detail.js'



function App() {

  let [ shoes ] = useState(data)
  let [img, setImg] = useState([
    "https://image.msscdn.net/images/goods_img/20160224/311052/311052_1_125.jpg",
    "https://image.msscdn.net/images/goods_img/20190228/969541/969541_2_125.jpg",
    "https://image.msscdn.net/images/goods_img/20220406/2469965/2469965_1_125.jpg"
])


  let navigate = useNavigate();


  return (
    <div className="App">

  


      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ヴィンテージ·シュー</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link onClick={()=> { navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={()=> { navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
        </Navbar>

          <div className="main-bg"></div>

        <Routes>
        <Route path="/" element={
        <Container>
        <Row>
        {
          shoes.map((a, i)=>{
            return(
              <Card shoes={shoes[i]} img={img[i]} ></Card> 
            )
          }
          )        
        }
        </Row>
        </Container>}/>

        <Route path="/detail/:id" element={<Detail shoes={shoes} />}/>

        <Route path="/event" element={<Event/>}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
          <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
          </Route>

        </Routes>
      
    </div>
  );
} 
  function Event(){  
    return(
      <div>
        <h4>오늘의 이벤트</h4> 
        <Outlet></Outlet>
      </div>
    )
  }


  function Card(props){
    return(
      <Col >
        <img src={props.img} width="80%"/>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.price}</p>
      </Col>     
    )
}






export default App;
