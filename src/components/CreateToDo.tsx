import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";

const CreateToDoForm = styled.form`
  padding: 0px 20px;
	display: flex;
	position: relative;
	width: 100%;
	height: 1 px;
	margin: 0 auto;
	margin-bottom: 10px;
	background-color: ${(props) => props.theme.cardColor};

	input {
		width: 100%;
		border: 1;
		border-radius: 10px;
		background-color: white;
		padding: 8px 15px;
		font-size: 20px
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.textColor};
	}

	button {
		right: 0;
		width: 10%;
		background-color: white;
		border: none;
		border-radius: 10px;
		font-size: 20px;
		align-items: center;
		justify-content: center;
		color: ${(props) => props.theme.accentColor};
	}

`;

interface IForm{
    toDo:string;
  }

function CreateToDo(){
    const setToDos = useSetRecoilState(toDoState);// key = "toDo"
    const category = useRecoilValue(categoryState);

    const {register,handleSubmit, setValue} = useForm<IForm>();

    const handleValid = ({toDo}:IForm) =>{ //data:IForm -> data.toDo : react-hook에서 data받아옴
    setToDos(oldToDos =>{
      const locStorageResult = [{id: Date.now(), text: toDo, category:category}, ...oldToDos];
      localStorage.setItem('toDos', JSON.stringify(locStorageResult));
      return locStorageResult;
    } );

    setValue("toDo", "");//react-hook : initalized
  };
    return( 
        <CreateToDoForm onSubmit={handleSubmit(handleValid)}>
        <input {...register("toDo",{
          required:"Please write toDo",
        })} 
        placeholder="Write a to do" 
        />
        <button>Add</button>
      </CreateToDoForm>);
}
export default CreateToDo;