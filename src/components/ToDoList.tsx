import { useRecoilState , useRecoilValue} from "recoil";
import {Categories,  categoryState, toDoSelector, toDoState} from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { useEffect } from "react";
import styled from "styled-components";

//style-component
const Container = styled.div`
  padding: 0px 20px;
`;

const Title = styled.h1`
	font-size: 48px;
  font-weight: 600
  color:"royalblue";
`;
//제목 center 
const Header = styled.header`
	height: 15vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);

  const [category,setCategory] = useRecoilState(categoryState);
  const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
    //option 의 value가 catgories의 타입과 같다고 인식못하고 그냥 string인줄 인식 -> as any로 해결 
  }
  console.log(toDos);
  return (
    <Container>
      <Header><Title>To Dos</Title></Header>
      <hr/>
      <select value = {category} onInput={onInput}>
        <option value ={Categories.TO_DO}>To Do</option>
        <option value = {Categories.DOING}>Doing</option>
        <option value ={Categories.DONE}>Done</option>
      </select>
      <hr />
      <CreateToDo />
      {toDos?.map(toDo => <ToDo key = {toDo.id} {...toDo}/>)}
    </Container>// 새로 입력한 toDo의 정보를 props 로 전송
  );//<ul>{toDos.map((toDo) =><ToDo text = {toDo.text} category={toDo.category} id = {toDo.id} /> )}</ul>
}

export default ToDoList;