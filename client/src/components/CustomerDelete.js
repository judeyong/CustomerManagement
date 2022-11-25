import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const StyledBtn = styled.button`
background: palevioletred;
border-radius: 3px;
border: none;
color: white;
font-size: 15px;
margin-left: 20px;
`;

const StyledBtnDel = styled.button`
background: white;
border-radius: 3px;
border: 1px solid black;
font-size: 15px;
margin-left: 20px;
`;

function CustomerDelete({id, stateRefresh}) {
  
  const [delModalIsOpen, setDelModalIsOpen] = useState(false);

    const delModal = () => {
      setDelModalIsOpen(true);
    }

    const deleteCustomer = () => {
        const url = '/api/customer/'+ id;
        fetch(url, {
            method: 'DELETE',
        });
        stateRefresh();
        setDelModalIsOpen(false);
    }

  return (
    <div>
      <StyledBtn onClick={delModal}>삭제</StyledBtn>
      <Modal isOpen={delModalIsOpen} style={{overlay:{
      position: 'fixed',
      top: 300,
      left: 700,
      right: 500,
      bottom: 400,
      width: '25%',
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
      }}}>
        <div>
          <p>삭제 경고.. 선택한 고객 정보가 삭제됩니다.</p>
          <StyledBtnDel onClick={() => deleteCustomer()}>삭제하기</StyledBtnDel>
          <StyledBtnDel onClick={() => setDelModalIsOpen(false)}>닫기</StyledBtnDel>
        </div>
      </Modal>
    </div>
  )
}

export default CustomerDelete
