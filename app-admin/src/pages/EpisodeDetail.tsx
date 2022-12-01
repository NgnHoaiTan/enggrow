import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import { picturePlanet } from '../common/Image';

import CreateExercise from '../components/episodeDetail/CreateExercise';
import EpisodeTool from '../components/episodeDetail/EpisodeTool';
import ListExercises from '../components/episodeDetail/ListExercises';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetEpisodeById } from '../features/episode/episodeAPIs';
import { getEpisode } from '../features/episode/episodeSlice';
import { asyncGetAllIdentificationExercisesByEpisode, asyncGetAllPronunciationExercisesByEpisode } from '../features/exercise/exerciseAPIs';
import { getListPronunciationExercises, getListIdentificatonExercises } from '../features/exercise/exerciseSlice';
const EpisodeDetail = () => {
    const [loadingEpisode, setLoadingEpisode] = useState(true)
    const [loadingExercises, setLoadingExercises] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const episode = useAppSelector(getEpisode)
    const identification_exercises = useAppSelector(getListIdentificatonExercises)
    const pronunciation_exercises = useAppSelector(getListPronunciationExercises)
    const { episodeId } = useParams()
    const accessToken = useAppSelector(getCurrentToken)
    useEffect(() => {
        const actionGetEpisode = async () => {
            setLoadingEpisode(true)
            try {
                const dataGet = {
                    id: episodeId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetEpisodeById(dataGet)).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
        actionGetEpisode()
        setLoadingEpisode(false)
    }, [])
    useEffect(() => {
        const actionGetExercises = async () => {
            setLoadingExercises(true)
            try {
                const dataGet = {
                    episodeId: episodeId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetAllPronunciationExercisesByEpisode(dataGet)).unwrap()
            } catch (error) {
                console.log(error)
            }
        }
        actionGetExercises()
        setLoadingExercises(false)
    }, [episodeId])
    return (
        <div className='relative'>
            <div className='absolute bg-space-1 bg-center w-full h-[160px] md:h-[200px] -z-50'>

            </div>
            <EpisodeTool />
            <div className="top-content relative mt-5 md:mt-10">
                <div className='flex flex-col items-center'>
                    <div className='w-[170px] h-[170px] md:w-[205px] md:h-[205px]  rounded-full bg-white flex items-center justify-center'>
                        <img src={picturePlanet} alt="rocket" className='w-40 h-40 md:w-48 md:h-48 rounded-full object-cover' />
                    </div>

                    {
                        episode ?
                            <>
                                <div className="name mt-5">
                                    <p className='text-center font-bold text-xl lg:text-[22px] xl:text-2xl line-clamp-2'>
                                        {episode.name}
                                    </p>
                                    <p className='text-base w-full px-3 sm:w-[500px] md:w-[600px] xl:w-[800px] md:text-lg xl:text-xl my-3 text-center'>
                                        {episode.description}
                                    </p>
                                </div>
                                {
                                    episode.video_url &&
                                    <div className='flex justify-center mt-8 px-3 w-full sm:w-[500px] xl:w-[600px] rounded-xl overflow-hidden object-cover video-guide'>
                                        <video src={episode.video_url} controls className='w-full h-full object-cover rounded-xl'></video>
                                    </div>
                                }
                                <div className='mt-5 text-base w-full px-3 sm:w-[500px] md:w-[600px] xl:w-[800px] md:text-lg xl:text-xl text-center'>
                                    <p>{episode.fundamentals ? episode.fundamentals : ''}</p>
                                </div>

                            </>
                            :
                            <>
                                {
                                    !episode || loadingEpisode ?
                                        <>
                                            <div className="name mt-5">
                                                <div className="w-[200px] mx-auto mb-3 h-[30px] block after:content-[' '] bg-gray-100 rounded-sm">
                                                </div>
                                                <div className="w-[300px] mx-auto h-[30px] block after:content-[' '] bg-gray-100 rounded-sm">
                                                </div>
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
            <div className="main-content p-4">
                <CreateExercise />
                <ListExercises 
                    pronunciation_exercises={pronunciation_exercises}
                    loadingExercises={loadingExercises} 
                />
            </div>
        </div>
    );
};

export default EpisodeDetail;