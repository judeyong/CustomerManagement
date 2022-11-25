import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from 'styled-components';

Modal.setAppElement('#root');


const StyledBtn = styled.button`
background: skyblue;
border-radius: 3px;
border: none;
color: white;
font-size: 30px;
  `;

const StyledBtnAdd = styled.button`
background: skyblue;
border-radius: 3px;
border: none;
color: white;
font-size: 15px;
margin: 15px 40px;
`;

const StyledBtnClose = styled.button`
font-weight: bold;
background: #228be6;
border-radius: 3px;
border: none;
color: white;
font-size: 15px;
`;

const StyledDiv = styled.div`
display: flex;
justify-content: center;
align-items: center
`;


function CustomerAdd({stateRefresh}) {

const [customerInfo, setCustomerInfo] = useState({
  file: null, 
  fileName: "" ,
  userName: "",
  birthday: "",
  gender: "",
  job: "",
});

const [modalIsOpen, setModalIsOpen] = useState(false);

const addCustomer = () => {
  const url = '/api/customer';
  const formData =  new FormData();
  formData.append('file', customerInfo.file);
  formData.append('userName', customerInfo.userName);
  formData.append('birthday', customerInfo.birthday);
  formData.append('gender', customerInfo.gender);
  formData.append('job', customerInfo.job);

  const config = {
    headers: {
      //"Content-Type": `application/json`
      'Content-Type': 'multipart/form-data'
    }
  }
  return axios.post(url, formData, config);
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  addCustomer()
    .then((res) => {
      console.log('res-data',res);
      stateRefresh();
    }).catch(err => {
      console.log(err)
    });
  //데이터보내고 데이터초기화
  setCustomerInfo({
    file: null,
    fileName: "",
    userName: "",
    birthday: "",
    gender: "",
    job: "",
  });
  setModalIsOpen(false);
};

const handleFileChange = (e) => {
  console.log('files ', e.target.files[0]);  
  console.log('e.target.value ', e.target.value);  

  const preState = {...customerInfo};
  preState[e.target.name] = e.target.files[0];
  preState.fileName = e.target.value;
  setCustomerInfo(preState);
}

const handeValueChange = (e) => {
  const nextState = {...customerInfo};
  nextState[e.target.name] = e.target.value;
  console.log('nextState ',nextState);
  setCustomerInfo(nextState);
}

  return (
    <div>
      <StyledDiv>
        <StyledBtn onClick={() => setModalIsOpen(true) }>고객추가하기</StyledBtn>
      </StyledDiv>

      <Modal isOpen={modalIsOpen} style={{
      overlay:{
      position: 'fixed',
      top: 300,
      left: 750,
      right: 50,
      bottom: 250,
      width: '400px',
      backgroundColor: 'orange'},

      content: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top: '4px',
        left: '4px',
        right: '4px',
        bottom: '4px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '5px',
      }
      }}>
        <form onSubmit={handleFormSubmit}>
        <StyledDiv><h2>고객 추가</h2></StyledDiv>
          프로필 이미지 : <input type="file" name='file' file={customerInfo.file} value={customerInfo.fileName} onChange={handleFileChange}/><br/>
          이름 : <input type="text" name="userName" value={customerInfo.userName} onChange={handeValueChange}/><br/>
          생년월일 : <input type="text" name='birthday' value={customerInfo.birthday} onChange={handeValueChange}/><br/>
          성별 : <input type="text" name='gender' value={customerInfo.gender} onChange={handeValueChange}/><br/>
          직업 : <input type="text" name='job' value={customerInfo.job} onChange={handeValueChange}/><br/>
          <StyledBtnAdd type='submit'>추가하기</StyledBtnAdd>
          <StyledBtnClose onClick={() => setModalIsOpen(false)}>닫기</StyledBtnClose>
        </form>
        
      </Modal>
    </div>
  )
}

export default CustomerAdd
