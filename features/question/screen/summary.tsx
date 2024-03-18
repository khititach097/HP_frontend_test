import { useAppDispatch, useAppSelector } from '@/store/hook'
import { setRanking } from '@/store/questionReducer';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const SummaryComponent = () => { 


    const { score } = useAppSelector(state => state.question)
    const { push } = useRouter();

    const goToHome = () =>{
        push('/')
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center transition-transform '>
        <div className='bg-slate-400 relative duration-200 w-[90%] h-2/6 rounded-xl text-center p-4 m-4 flex justify-center items-center xl:w-5/6'>
            <label className='text-3xl xl:text-5xl'>
              Score :  {score}/20
            </label>
        </div>


        <div className="w-full flex justify-center [&>div]:flex [&>div]:justify-center [&>div]:items-center [&>div]:rounded-xl [&>div]:w-3/4 xl:[&>div]:w-2/6 [&>div]:h-20 [&>div]:text-2xl [&>div]:text-white">
            <div className='bg-slate-300 border-2 border-black cursor-pointer' onClick={goToHome}>
                home
            </div>
        </div>

    </div>
    )
}


export default SummaryComponent

