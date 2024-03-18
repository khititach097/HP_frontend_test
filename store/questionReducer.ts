import { Question } from "@/features/question/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface QuestionState {
    test:Number
    questionList:Question[] | []
    questionNo:number
    score:number
    ranking:number[]
}


const initialState:QuestionState =  {
    test: 1,
    questionList: [],
    questionNo:1,
    score:0,
    ranking:[]
}


export const questionReducer = createSlice({
    name: "question",
    initialState,
    reducers: {
        setQuestions:(state, action: PayloadAction<Question[]>) => {
            state.questionList = action.payload
        },
        setUpdateDoneQuestion:(state, action: PayloadAction<string>) => {
            const doneID:string = action.payload
            let tempQuestion = [...state.questionList]
            tempQuestion = tempQuestion.map((item:Question) => {
                if (item.done) {
                    return item
                } else { 
                    return ({...item , done: item.id === doneID})
                }
            })
            state.questionList = tempQuestion
        },
        setScore:(state) => {
            state.score = state.score+1
        },
        setQuestionNo:(state) => {
            state.questionNo = state.questionNo+1
        },
        setRanking:(state , action: PayloadAction<number>) => {
            const tempRanking:number[] = [...state.ranking]
            tempRanking.push(action.payload)
            state.ranking = tempRanking
        },
        reset:(state) => ({...initialState , ranking:state.ranking})
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    setQuestions,
    setUpdateDoneQuestion,
    setScore,
    setQuestionNo,
    setRanking,
    reset
  } = questionReducer.actions;
  
  export default questionReducer.reducer;