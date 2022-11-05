import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { TiDelete } from 'react-icons/ti'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../app/store';
import { asyncDeletePronunciationExercise, asyncGetAllPronunciationExercisesByEpisode } from '../../features/exercise/exerciseAPIs';
interface typeProps {
    exercise: {
        id: number,
        phrase: string,
        meaning: string,
        episodeId: number
    }
}

const PronunciExerciseItem = (props: typeProps) => {
    const { exercise } = props
    const { episodeId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const handleConfirmDelete = () => {
        confirmAlert({

            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handleDeleteExercise()
                },
                {
                    label: 'No',
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
                accessToken: 'accessToken'
            }
            const dataGet = {
                episodeId: episodeId,
                accessToken: 'accessToken'
            }
            await dispatch(asyncDeletePronunciationExercise(dataDelete)).unwrap()
            await dispatch(asyncGetAllPronunciationExercisesByEpisode(dataGet)).unwrap()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='bg-[#eaeaea] relative min-w-[120px] text-[#333333] shadow-card py-4 px-5 mr-4 my-2 rounded-lg'>
            <div className=''>
                <div className="phrase">
                    <p className='text-center font-bold text-lg lg:text-lg line-clamp-2'>
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