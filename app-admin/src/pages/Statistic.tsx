import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import TopCoursesStatistic from '../components/statistic/TopCoursesStatistic';
import TrendingLevel from '../components/statistic/TrendingLevel';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetAllRegisterParticipants, asyncGetRecentRegistered } from '../features/participant/participantApis';
import { getParticipants, getRecentRegistered } from '../features/participant/participantSlice';
import { asyncGetTopInterestedPronunCourse, asyncStatisticTrendingLevel } from '../features/pronunciation_course/pronunCourseAPIs';
import { getStatisticTrendingLevel, getTopCourses } from '../features/pronunciation_course/pronunCourseSlice';

const Statistic = () => {
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const topCourses = useAppSelector(getTopCourses)
    const recentRegister = useAppSelector(getRecentRegistered)
    const trendingLevel = useAppSelector(getStatisticTrendingLevel)
    const allRegisters = useAppSelector(getParticipants)
    const [errorLoadingData, setErrorLoadingData] = useState('')
    const [loadingTopCourse, setLoadingTopCourse]  = useState(true)
    // load trending data
    const [errorLoadingTrendingLevel, setErrorLoadingTrendingLevel] = useState('')
    const [loadingTrendingLevel, setLoadingTrendingLevel]  = useState(true)

    useEffect(()=>{
        const action=async()=>{
            try {
                setErrorLoadingData('')
                setLoadingTopCourse(true)
                dispatch(asyncGetAllRegisterParticipants(accessToken)).unwrap()
                dispatch(asyncGetRecentRegistered(accessToken)).unwrap()
                await dispatch(asyncGetTopInterestedPronunCourse(accessToken)).unwrap()  
            }catch(error: any) {
                if(error.message) {
                    setErrorLoadingData(error.message)
                }
                else {
                    setErrorLoadingData('Lỗi không xác định')
                }
            }
        }
        action()
        setLoadingTopCourse(()=>false)
    },[])
    useEffect(()=>{
        const action=async()=>{
            try {
                setErrorLoadingTrendingLevel('')
                setLoadingTrendingLevel(true)
                await dispatch(asyncStatisticTrendingLevel(accessToken)).unwrap()               
            }catch(error: any) {
                if(error.message) {
                    setErrorLoadingTrendingLevel(error.message)
                }
                else {
                    setErrorLoadingTrendingLevel('Lỗi không xác định')
                }
            }
        }
        action()
        setLoadingTrendingLevel(()=>false)
    },[])
    if(errorLoadingData) {
        return (
            <div className='p-2'>
                <p className='text-red-500 font-semibold text-center text-lg my-5'>{errorLoadingData}</p>
            </div>
        )
    }
    return (
        <div className='p-2'>
            <TopCoursesStatistic 
                loading={loadingTopCourse} 
                courses={topCourses}
                participants={allRegisters}
                recentRegister={recentRegister}
            />
            <TrendingLevel 
                trending_level={trendingLevel}
                loading={loadingTrendingLevel}
                error={errorLoadingTrendingLevel}
            />
        </div>
    );
};

export default Statistic;