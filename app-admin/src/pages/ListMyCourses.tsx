import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import MyCourses from '../components/home/MyCourses';
import ListCourses from '../components/mycourses/ListCourses';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetAllMyPronunCourses } from '../features/pronunciation_course/pronunCourseAPIs';
import { getAllMyCourses } from '../features/pronunciation_course/pronunCourseSlice';

const ListMyCourses = () => {
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const [loadingMyCourses, setLoadingMyCourses] = useState(true)
    const allMyCourses = useAppSelector(getAllMyCourses)
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                setLoadingMyCourses(()=>true)
                let dataGet = {
                    accessToken: accessToken,
                    query: {
                        order: 'ASC'
                    }
                }
                await dispatch(asyncGetAllMyPronunCourses(dataGet)).unwrap()
            }catch(error){
                console.log(error)
            }
        }
        fetchData()
        setLoadingMyCourses(()=>false)
    },[])
    return (
        <div className='p-2'>
            <ListCourses loadingMyCourses={loadingMyCourses}  courses={allMyCourses}/>
        </div>
    );
};

export default ListMyCourses;