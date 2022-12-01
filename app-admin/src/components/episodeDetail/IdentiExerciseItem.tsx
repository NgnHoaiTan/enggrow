import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import {TiDelete} from 'react-icons/ti'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { AppDispatch } from '../../app/store';
import { asyncDeleteIdentificationExercise, asyncDeletePronunciationExercise, asyncGetAllIdentificationExercisesByEpisode, asyncGetAllPronunciationExercisesByEpisode } from '../../features/exercise/exerciseAPIs';

interface typeProps {
    exercise: {
        id: number,
        true_word: string
        false_word: string,
        audio: any,
        episodeId: number
    }
}

const IdentiExerciseItem = (props: typeProps) => {
    const { exercise } = props
    const {episodeId} = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const handleConfirmDelete=()=>{
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
    const handleDeleteExercise =async()=>{
        try{
            const dataDelete = {
                id: exercise.id,
                accessToken: 'accessToken'
            }
            const dataGet= {
                episodeId: episodeId,
                accessToken: 'accessToken'
            }
            await dispatch(asyncDeleteIdentificationExercise(dataDelete)).unwrap()
            await dispatch(asyncGetAllIdentificationExercisesByEpisode(dataGet)).unwrap()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='bg-[#fdfdfd] relative min-w-[120px] text-[#333333] shadow-card py-3 px-4 mr-4 my-2 rounded-lg'>
            <div className=''>
                <div className="words">
                    <p className='text-center font-semibold'>
                        {exercise.true_word} / {exercise.false_word}
                    </p>
                </div>
            </div>
            <div 
            onClick={handleConfirmDelete}
            className="absolute right-0 top-0 cursor-pointer">
                <TiDelete size='20px'/>
            </div>
        </div>
    );
};

export default IdentiExerciseItem;