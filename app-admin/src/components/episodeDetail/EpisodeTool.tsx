import React, { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import { getEpisode } from '../../features/episode/episodeSlice';
import EditEpisode from '../episode/EditEpisode';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useNavigate, useParams } from 'react-router';
import { asyncDeleteEpisode, asyncGetAllEpisodesByCourse } from '../../features/episode/episodeAPIs';
import { getCurrentToken } from '../../features/authentication/authSlice';

const EpisodeTool = () => {
    const [showFormEdit, setShowFormEdit] = useState(false)
    const episode = useAppSelector(getEpisode)
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const handleCloseFormEdit = () => {
        setShowFormEdit(false)
    }
    const accessToken = useAppSelector(getCurrentToken)
    const { episodeId } = useParams()
    const handleConfirmDelete = () => {
        confirmAlert({

            title: 'Xác nhận xóa bài học',
            message: 'Vui lòng xác nhận',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => handleDeleteEpisode()
                },
                {
                    label: 'Hủy',
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }

    const handleDeleteEpisode = async () => {
        try {
            const courseId = episode.pronunciation_course ? episode.pronunciation_course.id : null
            if (courseId) {
                const dataSubmit = {
                    id: episodeId,
                    accessToken: accessToken
                }
                await dispatch(asyncDeleteEpisode(dataSubmit)).unwrap()
                const dataGet = {
                    courseId: courseId,
                    accessToken: accessToken,
                    query: null
                }
                dispatch(asyncGetAllEpisodesByCourse(dataGet)).unwrap()
                navigate(`/management/courses/${courseId}`, { replace: true })
            }
            else {
                throw new Error('courseId of episode is invalid')
            }

        } catch (error: any) {
            console.log(error)
            if(error.message)
            alert(error)
        }
    }
    return (
        <div className='pt-5 pr-5'>
            <div className="flex flex-row justify-end items-center">
                <div className="update-btn mr-5 cursor-pointer">
                    <button
                        onClick={() => setShowFormEdit(true)}
                        className='px-4 py-2 rounded-lg bg-green-600 text-white font-semibold'>
                        Cập nhật bài học
                    </button>
                </div>
                <div className="delete-btn cursor-pointer">
                    <button
                        onClick={handleConfirmDelete}
                        className='px-4 py-2 rounded-lg bg-red-500 text-white font-semibold'>
                        Xóa bài học
                    </button>
                </div>
            </div>
            {
                episode &&
                <EditEpisode episode={episode} showFormEdit={showFormEdit} onClose={handleCloseFormEdit} />
            }

        </div>
    );
};

export default EpisodeTool;