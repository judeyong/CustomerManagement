import { useState, useEffect } from "react";
import styled from "styled-components";
import Customer from "./components/Customer";
import { Circle } from 'rc-progress';
import CustomerAdd from "./components/CustomerAdd";
import { FaSearch } from 'react-icons/fa';

const StyledTable = styled.table`
width:85%;
text-align: center;
border-collapse: collapse;
margin-top: 50px;
margin-left 150px;
`;

const TableTh = styled.th`
color: black;
border: 1px solid black;
background-color: ivory;
font-size: 25px;
`;

const TitleDiv = styled.div`
justify-content:center;
align-items:center;
margin-left: 32px;
`;

const SearchDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
background-color: #9fb841;
border-radius: 5px;
border: none;
margin-right: 60px;
padding: 5px 40px;
margin-top: 7px;
margin-bottom: 7px;
`;

const StyledNav = styled.nav`
display:flex;
justify-content: space-between;
border-radius: 5px;
border: none;
margin: 20px 50px;
background-color: olive;
`;

const SearchInput = styled.input`
margin-left: 10px;
`;

function App() {

const [customers, setCustomers] = useState([]);
const [progressBar, setProgressBar] = useState('0');
const [searchKey, setSearchKey] = useState('');

const stateRefresh = () => {
  setCustomers([]);
  setProgressBar('0');
  setSearchKey('');
  callApi().then((data) => setCustomers(data))
  .catch(err => console.log('err: ', err));
}

const progress = () => {
  setProgressBar((completed => completed >= 100 ? 0 : completed + 1));
}

const handleValueChange = (e) => {
  let nextState = {...searchKey};
  nextState[e.target.name] = e.target.value;
  setSearchKey(nextState.searchKey);
}

const filteredCompnents = (data) => {
  data = data.filter((element) => {
    return element.name.indexOf(searchKey) > -1;
  })
  return data.map((element) => {
    return <Customer
    key={element.id}
    id={element.id}
    image={element.image}
    name={element.name}
    birthday={element.birthday}
    gender={element.gender}
    job={element.job}
    stateRefresh={stateRefresh}/>
  });
}


const callApi = async () => {
  setInterval(progress, 100);
  const response = await fetch('/api/customer');
  const body = await response.json();
  console.log(body);
  return body;
};

useEffect(() => {
  callApi().then((data) => setCustomers(data))
    .catch(err => console.log('err: ', err));
}, [] );

const rowHeaders = ['id', 'image', 'name', 'birthday', 'gender', 'job', 'option'];

  return (
  <div>
    <StyledNav>
      <TitleDiv>
      <h1>management</h1>  
      </TitleDiv>
      <SearchDiv>
        <FaSearch size='24' color="white"/>
        <SearchInput type='text' placeholder="이름을 입력하세요." name='searchKey' value={searchKey} onChange={handleValueChange}></SearchInput>
      </SearchDiv>
    </StyledNav>

    <CustomerAdd stateRefresh={stateRefresh}/>

    <StyledTable>
      <thead>
        <tr>
          {rowHeaders.map((element, idx) =>
            <TableTh key={idx}>{element}</TableTh>  
          )}
        </tr>
      </thead>
      <tbody>
        {customers ? 
          filteredCompnents(customers)
          :
            <tr style={ {width: "200px", height: '200px', alignItems: "center"} }>
              <td></td>
              <td></td>
              <td></td>
              <td style={ {alignItems: "center"}}>
                <Circle percent={progressBar} strokeWidth={4} strokeColor="#D3D3D3" /> 
              </td>
            </tr>
        }
      </tbody>
    </StyledTable>
  </div>
  );
}

export default App;
