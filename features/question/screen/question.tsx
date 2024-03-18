import { useAppDispatch, useAppSelector } from '@/store/hook'
import React, { useEffect, useState } from 'react'
import { Question } from '../types'
import shuffle from "lodash/shuffle";
import { setQuestionNo, setRanking, setScore, setUpdateDoneQuestion } from '@/store/questionReducer';
import { useRouter } from 'next/router';

const QuestionComponent = () => { 


    const { questionList , questionNo , score } = useAppSelector(state => state.question)
    const [getQuestion , setQuestion] = useState<Question | undefined>(undefined)
    const [result , setResult] = useState<'correct' | 'wrong' | 'none'>('none')
    const dispatch = useAppDispatch()
    const { push } = useRouter();

    useEffect(() => {
        randomQuestion()
    },[questionNo])

    const randomQuestion = () => {
        const tempQuestions = questionList.filter((item:Question) => !item.done )
        const randomNum = Math.floor(Math.random() * tempQuestions.length)
        if (tempQuestions[randomNum] && tempQuestions[randomNum].choices) {
            setQuestion({...tempQuestions[randomNum], choices:shuffle(tempQuestions[randomNum].choices)})
        }
    }

    const selectAnswer = (answer:string) => {

        // check answer
        if (getQuestion?.answer === answer) {
            dispatch(setScore())
            dispatch(setUpdateDoneQuestion(getQuestion.id))
            setResult('correct')
        } else {
            setResult('wrong')
        }

        setTimeout(() => {
            if (questionNo == questionList.length) {
                push('summary')
                dispatch(setRanking(score+1))
            } else {
                // randomQuestion()
                dispatch(setQuestionNo())
            }
            setResult('none')
        }, 2000);

    }



    return (
        <>
        <div className='h-screen flex flex-col justify-center items-center transition-transform '>
            <div className='bg-slate-400 relative duration-200 w-[90%] h-2/6 rounded-xl text-center p-4 m-4 flex justify-center items-center xl:w-5/6'>
                <div className='text-xl xl:text-2xl absolute top-2 right-4'>
                   {questionNo}/20
                </div>
                <label className='text-3xl xl:text-5xl'>
                    Questions : {getQuestion && (getQuestion.question)}
                </label>
            </div>

            {
              getQuestion && (
                <div className="grid grid-cols-1 xl:grid-cols-2 p-4 m-4 place-items-center gap-4 w-full [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:rounded-xl [&>div]:w-3/4 xl:[&>div]:w-5/6 [&>div]:h-20 [&>div]:text-2xl [&>div]:text-white">
                    <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={() => selectAnswer(getQuestion.choices[0])}>
                        A : {getQuestion && (getQuestion.choices[0])}
                    </div>
                    <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={() => selectAnswer(getQuestion.choices[1])}>                   
                        B : {getQuestion && (getQuestion.choices[1])}
                    </div>
                    <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={() => selectAnswer(getQuestion.choices[2])}>
                        C : {getQuestion && (getQuestion.choices[2])}
                    </div>
                    <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={() => selectAnswer(getQuestion.choices[3])}>
                        D : {getQuestion && (getQuestion.choices[3])}
                    </div>
                </div>
              )  
            }
          
           
        </div>
         <div className={` ${result ==='none' ? 'hidden' : ''} flex top-[40vh] h-[50vh] w-screen  absolute z-10 justify-center `}>
                <div className={`  w-[10rem] h-[5rem] flex justify-center items-center ${result == 'correct' ? 'bg-green-400' : result == 'wrong' ? 'bg-red-500' : 'bg-slate-100'} border-2 border-black rounded-lg `}>
                    {result}
            </div>
        </div>

        </>

    )
}


export default QuestionComponent
