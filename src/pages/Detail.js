import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// css파일까지 가지않고 이 라이버리를 사용하면 js파일에서 가능
import styled from "styled-components";
import { Nav } from "react-bootstrap";

// 빽틱 넣어서 만듬// 이렇게 프롭스를 뚤어 놓으면 프롭스만 살짝 바꾸면 컴포넌트 재활용이 가능 예:버튼의 색깔은 자식만 바꾸면 됨
// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == "blue" ? "white" : "black")};
//   padding: 10px;
// `;

function Detail(props) {
  // let [IsVisible, setIsVisible] = useState(true);
  // let [num, setNum] = useState("");
  let [tap, setTap] = useState(0);
  let [alert, setAlert] = useState(true);

  // 마운트나 업데이트시 코드를 실행시켜주는 useEffect
  // 유즈이펙트 안에 있는 코드는 html 렌더링 후에 동작한다.
  // 만약 오래걸리는 작업이 있다면 html을 먼저 로드시키고 유즈이펙트를 돌리면 빨라보임
  //어려운 연산,서버에서 데이터 가져오는 작업, 타이머 장착하는거에 좋음
  // 유즈이펙트의 마지막에 []은 실행조건을 넣을수 있다 디펜던시라고 함
  // []를 넣으면 마운트시에만 작동하게 할수있다. 즉 1회만 작동
  // 유즈이펙트 안에 리턴문을 넣으면 클린업 펑션으로 사용할수 있다. 기존코드를 지우는데 많이 사용
  // 클린업 펑션은 마운트 될때는 작동 안함

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);
  let [count, setCount] = useState(0);
  // useEffect(() => {
  //   if (isNaN(num) == true) {
  //     alert("숫자만 입력해주세요");
  //   }
  // }, [num]);

  // useParams 외부 라이버리 유저가 URL파라미터에 입력한거 가져오는 훅
  let { id } = useParams();
  // console.log(id);

  //   자바스크립트엔 .find() 라는 문법이 있는데 이거 쓰면 array 자료안에서 원하는 항목만 찾아올 수 있습니다.
  // array자료.find(()=>{ return 조건식 })
  // 이렇게 쓰면 조건식에 맞는 자료를 찾아서 이 자리에 남겨줍니다.
  let 찾는상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  return (
    <div className="container">
      {/* <YellowBtn>버튼</YellowBtn> */}
      {/* {alert == true ? (
        <div className="alert alert-warning">2초이내 구입시 할인 </div>
      ) : null}
      {count} */}
      {/* <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button> */}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://codingapple1.github.io/shop/shoes1.jpg"
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾는상품.title}</h4>
          <p>{찾는상품.content}</p>
          <p>{찾는상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
      {/* 디폴트키는 제일처음 사이트 접속했을때 눌러져있음 */}
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(0);
            }}
            eventKey="link-0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(1);
            }}
            eventKey="link-1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTap(2);
            }}
            eventKey="link-2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {/* 선택창 넣기 1번째 html ,css로 미리 디자인 */}
      {/* 2번째는 상태 저장해둘 스테이트 필요 */}
      {/* 3번쟤 스테이트에 따라서 ui가 어떻게 보일지 작성 */}
      {/* 일반 if조건문을 쓰려면 바깥에서 써야함 */}
      {/* 바깥에서 컨포넌트로 바꿔서  이프문에서 리턴을 달아서 해야함*/}
      {/* 탭은 디테일에 있는거니깐 프롭스 해와야함 */}
      <TapContent tap={tap} />
    </div>
  );
}

function TapContent({ tap }) {
  let [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);

    return () => {
      setFade("");
    };
  }, [tap]);
  // if (props.tap == 0) {
  //   return <div>내용0</div>;
  // }
  // if (props.tap == 1) {
  //   return <div>내용1</div>;
  // }
  // if (props.tap == 2) {
  //   return <div>내용2</div>;
  //}

  return (
    <div className={`start ` + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tap]}
    </div>
  );
}

export default Detail;
