import { useAppSelector } from '@/store/hook'
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { memo } from 'react'

const RankingComponent = () => { 


    const { ranking } = useAppSelector(state => state.question)
    // console.log("🚀 ~ RankingComponent ~ ranking:", ranking.sort())
    const { push } = useRouter();

    const goToHome = () => {
        push('/')
    }


    const renderRanking = () => {
        if (ranking && ranking.length) {
            const sortRank = _.orderBy(ranking,[],['desc'])
            return (
                <>
                    {
                        sortRank.map((item:number,index:number) => (
                        <div key={index} className=' rounded-xl flex justify-between !pl-10 !pr-8 xl:!pl-[7.5rem] xl:!pr-[7rem] '>
                            <div>
                                {index+1}
                            </div>
                            <div>
                                {item}/20
                            </div>
                        </div>
                        ))
                    }
                </>
            )
        } else {
            return (<div className='text-center'> NO RANKING</div>)
        }
    }

    return (
        <div className='h-screen flex flex-col items-center transition-transform '>
        <div className='bg-slate-400 duration-200 w-[90%] xl:w-2/6 h-2/6 rounded-xl text-center p-4 m-4 flex justify-center items-center '>
            <label className='text-3xl xl:text-5xl'>
                Ranking
            </label>
        </div>

        <div className='w-[90%] xl:w-[70%] flex flex-col gap-4 h-full p-4 bg-slate-300 [&>div]:px-5 xl:[&>div]:px-24 rounded-lg overflow-y-auto'>
            <div className=' sticky bg-slate-300 top-0 p-4 rounded-xl flex justify-between text-xl font-bold'>
            {/* <div className='flex justify-around bg-slate-300 rounded-xl w-full gap-4 m-4 [&>div]:flex [&>div]:justify-center [&>div]:mt-4 [&>div]:rounded-xl [&>div]:w-2/4 [&>div]:text-2xl [&>div]:text-black'> */}
                <div>
                    Ranking#
                </div>
                <div>
                    Score
                </div>
            </div>
            {
                renderRanking()
            }
        </div>
        

        <div className='w-full p-4 flex justify-end'>
            <div className='bg-slate-400 rounded-lg p-4 text-xl xl:text-3xl cursor-pointer border-2' onClick={goToHome}>
                Back
            </div>
        </div>

    </div>
    )
}


export default memo(RankingComponent) 
