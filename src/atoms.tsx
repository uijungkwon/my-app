import {atom, selector} from "recoil";

export enum Categories{
    //"TO_DO", //코드에서 0 -> enum으로 작성했기 때문에 !
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",//1
    "DONE" = "DONE",//
}

export interface IToDo{
    text:string;
    category:Categories; //create category
    id:number;
  }
  
export const categoryState = atom<Categories>({
    key:"category",
    default:Categories.TO_DO,
});

const localData = localStorage.getItem('toDos');

export const toDoState = atom<IToDo[]>({
    key:"toDo", //localstorage에 저장했다가 가져옴
    default: localData === null ? [] : JSON.parse(localData as string), //state들을 이 배열안에 다 넣는건 변하지 않음 
  });

export const toDoSelector =selector({//atom이 아니라 selector에서 값을 받아옴, selector은 atom을 받아와서 변형함
    key: "toDoSelector",
    get: ({get}) =>{
        const toDos = get(toDoState);//toDOs에 모든 toDO가 할당
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
        /*
        if(category === Categories.TO_DO) return toDos.filter((toDo) => toDo.category === Categories.TO_DO);
        if(category === Categories.DOING) return toDos.filter((toDo) => toDo.category === Categories.DOING);
        if(category === Categories.DONE) return toDos.filter((toDo) => toDo.category === Categories.DONE);
        *///카테고리에 따라 하나의 Array만 반환
    }
})
