import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";

let YellowBtn = styled.button `
    background : ${props => props.bg};
    color : ${props => props.bg == 'blue'
    ? 'white'
    : 'black'};
    padding : 10px;
`
let Box = styled.div `
    background : grey;
    padding : 20px;
`

function Detail(props) {

    let [IsVisible,
        setIsVisible] = useState(true);
    let [num,
        setNum] = useState('');

    useEffect(() => {
        if (isNaN(num) == true) {
            alert('숫자만 입력해주세요');
        }
    }, [num])

    let {id} = useParams();
    let 찾는상품 = props
        .shoes
        .find(function (x) {
            return x.id == id
        });

    return (
        <div className="container">
            <div>
                {IsVisible && (
                    <div className="alert alert-warning">
                        2초이내 구매시 할인</div>
                )}
            </div>

            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%"/>
                </div>

                <input
                    onChange={(e) => {
                    setNum(e.target.value)
                }}/>

                <div className="col-md-6">
                    <h4 className="pt-5">{찾는상품.title}</h4>
                    <p>{찾는상품.content}</p>
                    <p>{찾는상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;