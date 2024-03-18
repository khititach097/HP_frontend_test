import { useAppDispatch, useAppSelector } from '@/store/hook'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import {questions} from '@/store/questions'
import { reset, setQuestions } from '@/store/questionReducer';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../types';


const QuizComponent = () => { 
    const { push } = useRouter();
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(reset())
    },[dispatch])

    const startQuestion = () => {
        console.log(questions);
        let tempQuestion = [...questions]
        const makeQuestion:Question[] = tempQuestion.map((item: Record<string,any>) => {
            return {
                ...item,
                id: uuidv4(),
                question: item.question,
                choices: item.choices,
                answer: item.answer,
                correct: false,
                done: false
            }
        });

        dispatch(setQuestions(makeQuestion))

        push('/question')
    }

    const goToRanking = () => {
        push('/ranking')
    }


    return (
        <div className='h-screen flex flex-col justify-center items-center transition-transform '>
            <div className='bg-slate-400 duration-200 w-4/6 h-2/6 rounded-xl text-center p-4 m-4 flex justify-center items-center xl:w-2/6'>
                <label className='text-3xl xl:text-5xl'>
                    Questions ?
                </label>
            </div>

            <div className='flex flex-col items-center gap-4 w-full [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:rounded-xl [&>div]:w-2/4 xl:[&>div]:w-1/6 [&>div]:h-20 [&>div]:text-2xl [&>div]:text-white'>
                <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={startQuestion}>
                    Start
                </div>
                <div className='border-2 border-black cursor-pointer bg-gradient-to-tr from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500' onClick={goToRanking}>
                    Ranking
                </div>
            </div>
            
        </div>
    )
}


export default QuizComponent
