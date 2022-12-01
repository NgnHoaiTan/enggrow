import React,{useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../app/hooks';
import { AppDispatch } from '../app/store';
import CarouselListeningEx from '../components/detailEpisode/CarouselListeningEx';
import CarouselPronounceEx from '../components/detailEpisode/CarouselPronounceEx';
import { getCurrentToken } from '../features/authentication/authSlice';
import { asyncGetEpisodeById } from '../features/episode/episodeAPIs';
import { getEpisode } from '../features/episode/episodeSlice';
import { asyncGetAllIdentificationExercisesByEpisode, asyncGetAllPronunciationExercisesByEpisode } from '../features/exercise/exerciseAPIs';
import { getListPronunciationExercises } from '../features/exercise/exerciseSlice';


const DetailEpisode = () => {
    const [loadingEpisode, setLoadingEpisode] = useState(true)
    const [loadingPronounExercises, setLoadingPronounExercises] = useState(true)
    const [loadingIdentifiExercises, setLoadingIdentifiExercises] = useState(true)
    const dispatch = useDispatch<AppDispatch>()
    const episode = useAppSelector(getEpisode)
    // const identiExercises = useAppSelector(getListIdentificatonExercises)
    const pronounExercises = useAppSelector(getListPronunciationExercises)
    const accessToken = useAppSelector(getCurrentToken)
    const {episodeId} = useParams()
    useEffect(()=>{
        const action =async()=>{
            try{
                setLoadingEpisode(true)
                let dataGet = {
                    id: episodeId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetEpisodeById(dataGet)).unwrap()
            }catch(error: any) {
                console.log(error)
                // if server error -> redirect to page error
                // if not found -> redirect to page not found
            }
            
        }
        action()

        setLoadingEpisode(false)
    },[episodeId])

    // fetching pronounce exercises
    useEffect(()=>{
        const action =async()=>{
            try{
                setLoadingPronounExercises(true)
                let dataGet = {
                    episodeId: episodeId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetAllIdentificationExercisesByEpisode(dataGet)).unwrap()
                await dispatch(asyncGetAllPronunciationExercisesByEpisode(dataGet)).unwrap()
            }catch(error: any) {
                console.log(error)
                // if server error -> redirect to page error
                // if not found -> redirect to page not found
            }
            
        }
        action()

        setLoadingPronounExercises(false)
    },[episodeId])

    // fetching identification exercises
    // useEffect(()=>{
    //     const action =async()=>{
    //         try{
    //             setLoadingIdentifiExercises(true)
    //             let dataGet = {
    //                 episodeId: episodeId,
    //                 accessToken: accessToken
    //             }
    //             await dispatch(asyncGetAllIdentificationExercisesByEpisode(dataGet)).unwrap()
    //             await dispatch(asyncGetAllPronunciationExercisesByEpisode(dataGet)).unwrap()
    //         }catch(error: any) {
    //             console.log(error)
                
    //         }
            
    //     }
    //     action()

    //     setLoadingIdentifiExercises(false)
    // },[episodeId])

    if(loadingEpisode) {
        return (
            <div>

            </div>
        )
    }
    else if(!episode) {
        return (
            <div>
                error happen
            </div>
        )
    }

    return (
        <div className='pt-[60px]'>
            {/* top content - info episode */}
            <div className='relative bg-gradient-to-b from-[#0F2027] to-[#2C5364] w-full h-[200px]'>
                <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <div className='w-[350px] sm:w-[350px] md:w-[500px] lg:w-[550px] xl:w-[650px]'>
                        <p className='text-white font-bold text-3xl sm:text-5xl my-3 text-center w-full font-Bebas'>
                            {episode.name}
                        </p>
                        <p className='text-white text-lg text-center w-full '>
                            {episode.description}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-wrap lg:flex-row my-5 lg:my-8 items-center justify-center">
                <div className='fundamental w-full px-4 my-3 lg:my-0 lg:w-[500px] lg:mr-5'>
                    <p className='font-bold text-xl md:text-2xl lg:text-3xl w-full mb-2 lg:text-right'>Kiến thức cần nắm</p>
                    <p className='w-full lg:text-right '>
                        {episode.fundamentals ? episode.fundamentals : ''}
                    </p>
                </div>
                <div className='rounded-lg w-full px-4 lg:ml-5 sm:w-[500px] md:w-[700px] lg:w-[500px] overflow-hidden'>
                    <video src={episode.video_url} controls className='w-full rounded-lg'></video>
                </div>

            </div>
            {/* practice */}
            <div className='my-3 px-3 flex flex-col items-center'>
                <p className='font-bold text-xl lg:text-2xl'>Bài tập luyện tập</p>
                <div className="exercise-2 my-5 bg-white shadow-card p-5
                        h-[500px] rounded-lg w-full sm:w-[500px] md:w-[800px] lg:w-[1000px] "
                >
                    <p className='font-semibold text-lg md:text-xl'>Bài tập: Lắng nghe và luyện tập phát âm</p>
                    <CarouselPronounceEx exercises={pronounExercises} loading={loadingPronounExercises}/>
                </div>
            </div>
        </div>
    );
};

export default DetailEpisode;