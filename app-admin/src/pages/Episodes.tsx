import React, { useState, useEffect } from 'react';
import EpisodesList from '../components/episode/EpisodesList';
import { pictureRocket } from '../common/Image';
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
import DOMPurify from 'dompurify';

const Episodes = () => {
    const [loadingEpisodes, setLoadingEpisodes] = useState(true)
    const [loadingCourse, setLoadingCourse] = useState(true)
    const [stopSearch, setStopSearch] = useState<boolean | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const [errorFetching, setErrorFetching] = useState<string | null>(null)
    const episodes = useAppSelector(getAllEpisodes)
    const { courseId } = useParams()
    const course = useAppSelector(getCourse)
    useEffect(() => {
        setErrorFetching(null)
        const action = async () => {
            try {
                setLoadingEpisodes(true)
                const dataSubmit = {
                    courseId: courseId,
                    accessToken: 'accessToken'
                }
                let result = await dispatch(asyncGetAllEpisodesByCourse(dataSubmit))
                unwrapResult(result)
                const dataGetCourse = {
                    id: courseId,
                    accessToken: 'accessToken'
                }
                await dispatch(asyncGetPronunCourseById(dataGetCourse))

            } catch (error: AxiosError | any) {
                if (error.code) {
                    if (error.code === 'ERR_NETWORK') {
                        setErrorFetching("ERR_NETWORK")
                    }
                }
                console.log(error)
            }
        }
        action()
        setLoadingEpisodes(false)
    }, [])
    useEffect(() => {
        const action = async () => {
            try {
                setLoadingCourse(true)

                await handleFetchEpisodes()
            } catch (error: any) {
                console.log(error)
            }

        }
        action()
        setLoadingCourse(false)
    }, [])

    useEffect(() => {
        if (stopSearch) {
            const action = async () => {
                setLoadingCourse(true)
                await handleFetchEpisodes()
            }
            action()
            setLoadingCourse(false)
            setStopSearch(null)
        }

    }, [stopSearch])

    const handleSearchEpisodes = async (valueSearch: any) => {
        if (valueSearch.name) {
            const dataSearch = {
                query: valueSearch,
                courseId: courseId,
                accessToken: 'accessToken'
            }
            await dispatch(asyncGetAllEpisodesByCourse(dataSearch))
        }
    }
    const handleFetchEpisodes = async () => {
        const dataSubmit = {
            courseId: courseId,
            accessToken: 'accessToken'
        }
        const result = await dispatch(asyncGetAllEpisodesByCourse(dataSubmit))
        unwrapResult(result)
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return (
        <div className='relative'>
            <div className='absolute bg-space-1 bg-center w-full h-[160px] md:h-[200px] -z-50'>

            </div>
            <CourseTool />
            <div className="top-content relative mt-5 md:mt-10">
                <div className='flex flex-col items-center'>
                    <div className='w-[170px] h-[170px] md:w-[205px] md:h-[205px]  rounded-full bg-white flex items-center justify-center'>
                        <img src={pictureRocket} alt="rocket" className='w-40 h-40 md:w-48 md:h-48 rounded-full object-cover' />
                    </div>
                    <div className="name mt-5">
                        {
                            course ?
                                <>
                                    <p className='text-center font-bold text-xl lg:text-[22px] xl:text-2xl line-clamp-2'>
                                        {course.name}
                                    </p>
                                    <div className="description text-base w-full xl:w-4/5 mx-auto leading-tight px-3 sm:px-8 md:text-lg xl:text-xl my-3" dangerouslySetInnerHTML={createMarkup(course.description)}></div>
                                </>
                                :
                                <>
                                    {
                                        !course || loadingCourse ?
                                            <>
                                                <div className="w-[200px] mx-auto mb-3 h-[30px] block after:content-[' '] bg-gray-100 rounded-sm">
                                                </div>
                                                <div className="w-[300px] mx-auto h-[30px] block after:content-[' '] bg-gray-100 rounded-sm">
                                                </div>
                                            </>
                                            :
                                            <>
                                            </>
                                    }
                                </>

                        }

                    </div>
                </div>
            </div>
            <div className="main-content p-4 relative">
                <CreateEpisode />
                <SearchEpisode onSubmit={handleSearchEpisodes} setStopSearch={setStopSearch} />
                <EpisodesList episodes={episodes} loadingEpisodes={loadingEpisodes} />
            </div>
        </div>
    );
};

export default Episodes;