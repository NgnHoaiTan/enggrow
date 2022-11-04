import React from 'react';
import ExerciseItem from './ExerciseItem';
import NoEpisode from './NoEpisode';
interface exercise {
    id: number,
    phrase: string,
    meaning: string
}
interface typeProps {
    exercises: exercise[],
    loadingExercises: boolean
}
const ListExercises = (props: any) => {
    const { exercises, loadingExercises } = props
    if (loadingExercises) {
        return (
            <div>

            </div>
        )
    } else if (!exercises) {
        return (
            <div>

            </div>
        )
    } else if (exercises.length === 0) {
        return (
            <div className='my-20'>
                <NoEpisode />
            </div>
        )
    }
    return (
        <div>
            <div className="flex items-center flex-wrap">
                {
                    exercises.map((exercise: any) => {
                        return (
                            <React.Fragment key={exercise.id}>
                                <ExerciseItem exercise={exercise} />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ListExercises;