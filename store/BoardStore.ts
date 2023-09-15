import { getTodosGroupedByColumn } from "@/lib/getTodosGroupedByColumns";
import { Board, Column, TypedColumn } from "@/typing";
import { create } from "zustand";
interface BoardState{
    board:Board;
    getBoard:()=>void;
}
export const useBoardStore=create<BoardState>((set)=>({
    board:{
        columns:new Map<TypedColumn,Column>()
    },
    getBoard:async()=>{
        const board=await getTodosGroupedByColumn();
        set({board})
    }

}))