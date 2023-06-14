import { useRecoilState, useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";


function ToDo({text, category, id}:IToDo){
    //const setToDos = useSetRecoilState(toDoState);
    const [toDos, setToDos] = useRecoilState(toDoState)
    const onClick  = (event:React.MouseEvent<HTMLButtonElement>) =>{
        //event.currentTarget.name
    const {currentTarget: {name}, //category name
            } = event;
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category:name as any};
            const locStorageResult = [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex+1)];
            localStorage.setItem('toDos', JSON.stringify(locStorageResult));
            return locStorageResult;
        })
        };

    //delete 버튼만 추가  
    const deleteBtn  = (event:React.MouseEvent<HTMLButtonElement>) => {
        setToDos(oldToDos => {
            const locStorageResult = toDos.filter(toDo => toDo.id !== id);
            localStorage.setItem('toDos', JSON.stringify(locStorageResult));
            return locStorageResult;
        })

    }
    return (
       <li >
        <span>{text} </span>
        {category !== Categories.TO_DO && 
        (<button name = {Categories.TO_DO } onClick = {onClick}>To Do</button>//props을 넘기기 위해 이렇게 작성
        )}
        {category !== Categories.DOING && 
        (<button name = {Categories.DOING } onClick = {onClick}>Doing</button>
        )}
        {category !== Categories.DONE &&
         (<button name = {Categories.DONE} onClick = {onClick}>Done</button>
         )}
        <button onClick={deleteBtn}>Delete!</button>
        </li>);
}
export default ToDo;