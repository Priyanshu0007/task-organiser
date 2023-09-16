import { getTodosGroupedByColumn } from "@/utils/getTodosGroupedByColumns";
import { Board, Column, Image, Todo, TypedColumn } from "@/typing";
import { create } from "zustand";
import { ID, databases, storage } from "@/appwrite";
import { data } from "autoprefixer";
import uploadImage from "@/utils/uploadImage";
interface BoardState{
    board:Board;
    getBoard:()=>void;
    setBoardState:(board:Board)=>void;
    updateTodoInDB:(todo:Todo,columnId:TypedColumn)=>void;
    newTaskInput:string;
    newTaskType:TypedColumn;
    searchString:string;
    image:File|null;
    setImage:(image:File|null)=>void;
    setNewTaskInput:(searchString:string)=>void;
    addTask:(todo:string,columnId:TypedColumn,image?:File|null)=>void;
    setSearchString:(searchString:string)=>void;
    setNewTaskType:(input:TypedColumn)=>void;
    deleteTask:(taskIndex:number,todoId:Todo,id:TypedColumn)=>void;
}
export const useBoardStore=create<BoardState>((set,get)=>({
    board:{
        columns:new Map<TypedColumn,Column>()
    },
    newTaskInput:'',
    searchString:'',
    setSearchString:(searchString)=>set({searchString}),
    setNewTaskInput:(input:string)=>set({newTaskInput:input}),
    newTaskType:'todo',
    setNewTaskType:(input:TypedColumn)=>set({newTaskType:input}),
    getBoard:async()=>{
        const board=await getTodosGroupedByColumn();
        set({board});
    },
    setBoardState:(board)=>set({board}),
    image:null,
    setImage:(image:File|null)=>set({image}),
    addTask:async(todo:string,columnId:TypedColumn,image?:File|null)=>{
        let file:Image|undefined;
        if(image){
            const fileUploaded=await uploadImage(image);
            if(fileUploaded){
            file={
                buckerId:fileUploaded.bucketId,
                fileId:fileUploaded.$id,
            }
        }
        }
        const {$id}=await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            ID.unique(),
            {title:todo,
            status:columnId,
            ...(file&&{image:JSON.stringify(file)}),
            }
        );
        set({newTaskInput:""});
        set((state)=>{
            const newColumns=new Map(state.board.columns);
            const newTodo:Todo={
                $id,
                $createdAt:new Date().toISOString(),
                title:todo,
                status:columnId,
                ...(file&&{image:file}),
            }
            const column=newColumns.get(columnId);
            if(!column){
                newColumns.set(columnId,{
                    id:columnId,
                    todos:[newTodo],
                });
            }else{newColumns.get(columnId)?.todos.push(newTodo);}
            return{
                board:{
                    columns:newColumns,

                }
            }
        })
    },
    updateTodoInDB: async (todo, columnId) => {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
            {
                title: todo.title,
                status: columnId,
            }
        );
    },
    deleteTask:async(taskIndex:number,todo:Todo,id:TypedColumn)=>{
        const newColumns=new Map(get().board.columns);
        newColumns.get(id)?.todos.splice(taskIndex,1);
        set({board:{columns:newColumns}});
        if(todo.image){
            await storage.deleteFile(todo.image.buckerId,todo.image.fileId);
        }
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
            todo.$id,
        )
    }
}))