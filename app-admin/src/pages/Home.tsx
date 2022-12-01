import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import Banner from '../components/dashboard/Banner';
import MyCourses from '../components/home/MyCourses';
import { getCurrentToken, getCurrentUser } from '../features/authentication/authSlice';
import { asyncGetReviewMyPronunCourses } from '../features/pronunciation_course/pronunCourseAPIs';
import { getReviewMyCourses } from '../features/pronunciation_course/pronunCourseSlice';

const Home = () => {
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const [loadingMyCourses, setLoadingMyCourses] = useState(true)
    const reviewMyCourses = useAppSelector(getReviewMyCourses)
    const user = useAppSelector(getCurrentUser)
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoadingMyCourses(()=>true)
                let dataGet = {
                    accessToken: accessToken,
                    // query: {
                    //     quantity: 4,
                    //     order: 'ASC'
                    // }
                }
                await dispatch(asyncGetReviewMyPronunCourses(dataGet)).unwrap()
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
        setLoadingMyCourses(()=>false)
    },[])
    return (
        <div className='p-2'>
            <Banner />
            <MyCourses loadingMyCourses={loadingMyCourses} courses={reviewMyCourses} title={`Những khóa học ${user.name.split(' ').slice(-1).join(' ')} đã tạo`}/>
        </div>
    );
};

export default Home;