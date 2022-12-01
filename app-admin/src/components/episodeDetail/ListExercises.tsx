import React from 'react';
import IdentiExerciseItem from './IdentiExerciseItem';
import NoEpisode from './NoEpisode';
import PronunciExerciseItem from './PronunciExerciseItem';
interface pronunciation_exercise {
    id: number,
    phrase: string,
    meaning: string,
    episodeId: number
}
// interface identification_exercise {
//     id: number,
//     true_word: string
//     false_word: string,
//     episodeId: number
// }
interface typeProps {
    pronunciation_exercises: pronunciation_exercise[],
    loadingExercises: boolean
}
const ListExercises = (props: typeProps) => {
    const { pronunciation_exercises, loadingExercises } = props
    if (loadingExercises) {
        return (
            <div>

            </div>
        )
    } else if (!pronunciation_exercises) {
        return (
            <div>
                Lỗi xảy ra trong quá trình lấy dữ liệu bài tập
            </div>
        )
    }
    return (
        <div>
            <div className="flex flex-col ">
                <div className=''>
                    <p className='text-xl font-semibold my-3'>Bài tập phát âm và kỹ năng nói</p>
                    <div className='flex items-center flex-wrap'>
                        {
                            pronunciation_exercises.map((exercise: any) => {
                                return (
                                    <React.Fragment key={exercise.id}>
                                        <PronunciExerciseItem exercise={exercise} />
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>

                </div>
                {/* <div>
                    <p className='text-xl font-semibold my-3'>Identification Exercises</p>
                    <div className='flex items-center flex-wrap'>
                        {
                            identification_exercises.map((exercise: any) => {
                                return (
                                    <React.Fragment key={exercise.id}>
                                        <IdentiExerciseItem exercise={exercise} />
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div> */}

            </div>
        </div>
    );
};

export default ListExercises;