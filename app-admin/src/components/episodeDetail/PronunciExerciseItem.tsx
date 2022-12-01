import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { TiDelete } from 'react-icons/ti'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncDeletePronunciationExercise, asyncGetAllPronunciationExercisesByEpisode } from '../../features/exercise/exerciseAPIs';
interface typeProps {
    exercise: {
        id: number,
        phrase: string,
        episodeId: number
    }
}

const PronunciExerciseItem = (props: typeProps) => {
    const { exercise } = props
    const { episodeId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const handleConfirmDelete = () => {
        confirmAlert({

            title: 'Xác nhận xóa bài tập',
            message: 'Vui lòng xác nhận.',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => handleDeleteExercise()
                },
                {
                    label: 'Hủy',
                    //onClick: () => alert('Click No')
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
        });
    }
    const handleDeleteExercise = async () => {
        try {
            const dataDelete = {
                id: exercise.id,
                accessToken:accessToken
            }
            const dataGet = {
                episodeId: episodeId,
                accessToken:accessToken
            }
            await dispatch(asyncDeletePronunciationExercise(dataDelete)).unwrap()
            await dispatch(asyncGetAllPronunciationExercisesByEpisode(dataGet)).unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-[#fdfdfd] relative min-w-[100px] text-[#333333] shadow-card py-3 px-4 mr-4 my-2 rounded-lg'>
            <div className=''>
                <div className="phrase">
                    <p className='text-center font-semibold line-clamp-2'>
                        {exercise.phrase}
                    </p>
                </div>
            </div>
            <div
                onClick={handleConfirmDelete}
                className="absolute right-0 top-0 cursor-pointer">
                <TiDelete size='20px' />
            </div>
        </div>
    );
};

export default PronunciExerciseItem;