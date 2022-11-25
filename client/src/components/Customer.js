import React from 'react'
import styled from "styled-components";
import CustomerDelete from './CustomerDelete';

const TableTd = styled.td`
border-bottom: 1px solid #DDD;
font-size: 20px;
`;

export default function Customer({id, image, name, birthday, gender, job, stateRefresh}) {
  
  return(
   <tr>
      <TableTd>{id}</TableTd>
      <TableTd><img src={image} alt='profile'></img></TableTd>
      <TableTd>{name}</TableTd>
      <TableTd>{birthday}</TableTd>
      <TableTd>{gender}</TableTd>
      <TableTd>{job}</TableTd>
      <TableTd><CustomerDelete id={id} stateRefresh={stateRefresh}/></TableTd>
    </tr>
  )
}