import React, { useState, useEffect } from 'react';
import ModelShowParticipants from './ModelShowParticipants';
import { MdOutlineGroups } from 'react-icons/md';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { getParticipantsOfCourse } from '../../features/participant/participantSlice';
import { asyncGetParticipantsByCourse } from '../../features/participant/participantApis';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import DOMPurify from 'dompurify';

interface typeProps {
    loading: boolean,
    error: string,
    course: any
}
const DetailCourse = (props: typeProps) => {
    const { loading, error, course } = props
    const [errorParticipants, setErrorParticipants] = useState('')
    const [showParticipants, setShowParticipants] = useState(false)
    const [loadingParticipants, setLoadingParticipants] = useState(true)
    const accessToken = useAppSelector(getCurrentToken)
    const listParticipant = useAppSelector(getParticipantsOfCourse)
    const { courseId } = useParams()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setErrorParticipants('')
                setLoadingParticipants(true)
                let data = {
                    courseId: courseId,
                    accessToken: accessToken
                }
                await dispatch(asyncGetParticipantsByCourse(data)).unwrap()
            } catch (error: any) {
                if (error.message) {
                    setErrorParticipants(error.message)
                }
                else setErrorParticipants('Unknow error happen, try again')
            }
        }
        fetchMembers()
        setLoadingParticipants(() => false)
    }, [courseId])


    const handleCloseParticipants = () => {
        setShowParticipants(false)
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }


    if(loading) {
        return (
            <div>

            </div>
        )
    }
    else if(!course) {
        return (
            <div>
                <p>{error || 'Not found result'}</p>
            </div>
        )
    }
    return (
        <div className="top-content relative ">
            <div className=''>
                <div className="flex flex-col justify-center items-center">
                    <div className='w-full relative px-5 sm:px-0 sm:w-[500px] md:w-[600px] xl:w-[700px]'>
                        <img src={course.poster} alt="poster"
                            className='w-full rounded-xl object-cover drop-shadow-md'
                        />
                        <div className='absolute bottom-0 -translate-y-1/3 left-10 sm:left-5 sm:-translate-x-0'>
                            <div className="flex items-center gap-3">
                                <div className="min-w-fit">
                                    <p className='font-semibold text-xs md:text-base py-1 px-5 rounded-xl bg-white border-2 border-blue-500 drop-shadow-lg'>Trình độ: {course.level}</p>
                                </div>
                                <div className="min-w-fit">
                                    <p
                                        onClick={() => setShowParticipants(true)}
                                        className='font-semibold flex items-center gap-2 cursor-pointer text-xs md:text-base py-1 px-5 rounded-xl bg-white border-2 border-blue-500 drop-shadow-lg'>
                                        {course.members ? course.members.length : 0}
                                        <MdOutlineGroups size="20px" color='#3f3f3f' />
                                    </p>
                                    <ModelShowParticipants
                                        members={listParticipant}
                                        loading={loadingParticipants}
                                        error={errorParticipants}
                                        showModel={showParticipants}
                                        onClose={handleCloseParticipants}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="flex flex-col sm:flex-row gap-1 items-center mt-3">
                        <p className='text-center xl:text-lg mr-3'>
                            Ngày tạo khóa học: {dayjs(course.created_at).format('DD-MM-YYYY hh:mm:ss')}
                        </p>
                        <p className='text-center xl:text-lg'>
                            <Link to={`/staff/${course.creator.id}`}>
                                Bởi:
                                <span className='text-blue-600 ml-1'>
                                    {course.creator.name}
                                </span>
                            </Link>

                        </p>
                    </div>
                </div>

                <div className="name mt-5">
                    {
                        course ?
                            <>
                                <p className='text-center font-bold text-xl lg:text-[22px] xl:text-2xl line-clamp-2 my-5'>
                                    {course.name}
                                </p>


                                <div className="description text-base w-full xl:w-4/5 mx-auto leading-tight px-3 sm:px-8 md:text-lg xl:text-xl my-3"
                                    dangerouslySetInnerHTML={createMarkup(course.description)}></div>

                            </>
                            :
                            <>
                                {
                                    !course || loading ?
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
    );
};

export default DetailCourse;