import React, { useState, useEffect } from 'react';
import EpisodesList from '../components/episode/EpisodesList';
import SearchEpisode from '../components/episode/SearchEpisode';
import CreateEpisode from '../components/episode/CreateEpisode';
import CourseTool from '../components/episode/CourseTool';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { asyncGetAllEpisodesByCourse } from '../features/episode/episodeAPIs';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppSelector } from '../app/hooks';
import { getAllEpisodes } from '../features/episode/episodeSlice';
import { AxiosError } from 'axios';
import { refreshError, setNetworkError } from '../features/error/errorSlice';
import { asyncGetPronunCourseById } from '../features/pronunciation_course/pronunCourseAPIs';
import { useParams } from 'react-router';
import { getCourse } from '../features/pronunciation_course/pronunCourseSlice';
import { getCurrentToken } from '../features/authentication/authSlice';
import DetailCourse from '../components/episode/DetailCourse';

const Episodes = () => {
    const [loadingEpisodes, setLoadingEpisodes] = useState(true)
    const [loadingCourse, setLoadingCourse] = useState(true)
    const [stopSearch, setStopSearch] = useState<boolean | null>(null)
    const [errorLoadEpisodes, setErrorLoadEpisodes] = useState('')
    const [errorLoadCourse, setErrorLoadCourse] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const episodes = useAppSelector(getAllEpisodes)
    const { courseId } = useParams()
    const course = useAppSelector(getCourse)
    const accessToken = useAppSelector(getCurrentToken)


    // get all episode by course
    useEffect(() => {
        const action = async () => {
            try {
                setLoadingEpisodes(true)
                const dataSubmit = {
                    courseId: courseId,
                    accessToken: accessToken
                }
                let result = await dispatch(asyncGetAllEpisodesByCourse(dataSubmit)).unwrap()
            } catch (error: AxiosError | any) {
                if(error.message) {
                    setErrorLoadEpisodes(error.message)
                }
                else {
                    setErrorLoadEpisodes('Lỗi không xác định khi tải thông tin bài học')
                }
            }
        }
        action()
        setLoadingEpisodes(false)
    }, [courseId])


    // get course
    useEffect(() => {
        const action = async () => {
            try {
                setErrorLoadCourse('')
                setLoadingCourse(()=>true)
                const dataGetCourse = {
                    id: courseId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetPronunCourseById(dataGetCourse)).unwrap()
            } catch (error: AxiosError | any) {
                if(error.message) {
                    setErrorLoadCourse(error.message)
                }
                else {
                    setErrorLoadCourse('Lỗi không xác định khi tải thông tin khóa học')
                }
                
            }
        }
        action()
        setLoadingCourse(()=>false)
    }, [courseId])

    useEffect(() => {
        if (stopSearch) {
            const action = async () => {
                setLoadingCourse(true)
                await handleFetchEpisodes()
            }
            action()
            setStopSearch(null)
        }

    }, [stopSearch])

    

    const handleSearchEpisodes = async (valueSearch: any) => {
        if (valueSearch.name) {
            const dataSearch = {
                query: valueSearch,
                courseId: courseId,
                accessToken:  accessToken
            }
            await dispatch(asyncGetAllEpisodesByCourse(dataSearch))
        }
    }
    const handleFetchEpisodes = async () => {
        const dataSubmit = {
            courseId: courseId,
            accessToken:  accessToken
        }
        const result = await dispatch(asyncGetAllEpisodesByCourse(dataSubmit))
        unwrapResult(result)
    }
    if(!course) {
        return (
            <div>
                <p className='text-red-500 font-bold my-8 text-center'>
                    Không tìm thấy khóa học, vui lòng thử lại sau
                </p>
            </div>
        )
    }

    return (
        <div className='relative mt-5'>
            <CourseTool />
            <DetailCourse loading={loadingCourse} course={course} error={errorLoadCourse}/>
            <div className="main-content p-4 relative">
                <CreateEpisode />
                <SearchEpisode onSubmit={handleSearchEpisodes} setStopSearch={setStopSearch} />
                <EpisodesList episodes={episodes} loadingEpisodes={loadingEpisodes} />
            </div>
        </div>
    );
};

export default Episodes;