import React, { useEffect, useState } from 'react';
import { BsPlayFill } from 'react-icons/bs';
import urbanDictionary from '../../apis/urbanDictionary';
import Recorewave from '../pronunciationCard/Recorewave';
import ResultExercise1 from './ResultExercise1';
import { DotLoaderOverlay} from 'react-spinner-overlay'

interface identification_exercise {
    id: number,
    true_word: string
    false_word: string,
    audio_url: any,
    episodeId: number
}
interface typeProps {
    exercise: identification_exercise,

}
interface word {
    definition: string
}
const LoadingSpin = (props: any) => {
    return (
        <>
            <DotLoaderOverlay
                loading={props.loading}
                overlayColor="#ebebeb31"
                color='#3f3f3f'
            />
        </>
    )
}
const ItemListenExercise = (props: typeProps) => {
    const { exercise } = props
    const [loadingResult, setLoadingResult] = useState(false)
    const [showModelResult, setShowModelResult] = useState(false)
    const [audioPlaying, setAudioPlaying] = useState(false)
    const [selectAnswer, setSelectAnswer] = useState('')
    const [definitions, setDefinitions] = useState<{ true_word: any, false_word: any }>({
        true_word: '',
        false_word: ''
    })
    const [onSelect, setOnSelect] = useState(false)
    let audio = new Audio(exercise.audio_url)

    useEffect(() => {

    }, [])
    const playAudio = () => {
        setAudioPlaying(true)
        audio.play()
        setTimeout(() => {
            setAudioPlaying(() => false)
        }, 500)
    }
    const stopAudio = () => {
        setAudioPlaying(false)
        audio.pause()
    }
    const handleSubmitAnswer = async () => {
        try {
            setLoadingResult(()=>true)
            let true_word = await handleGetDefinition(exercise.true_word)
            let false_word = await handleGetDefinition(exercise.false_word)
            setDefinitions((prev) => ({
                ...prev,
                true_word: true_word.definition,
                false_word: false_word.definition
            }))
            setLoadingResult(()=>false)
            setShowModelResult(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCloseModelResult = () => {
        setShowModelResult(false)
    }
    const handleGetDefinition = async (word: string) => {
        try {
            const result = await urbanDictionary.get(`define?term=${word}`)
            return result.data.list[0]

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='mb-16'>
            <LoadingSpin loading={loadingResult} />
            <div className="my-10 flex flex-col items-center">
                <div className='h-[50px] relative'>
                    <div className='absolute left-1/2 -translate-x-1/2'>
                        {
                            !audioPlaying ?
                                <button
                                    onClick={playAudio}
                                    className='py-1 px-3 mt-5 rounded-2xl bg-gradient-to-r from-[#4568DC] to-[#b06ab3]'>
                                    <BsPlayFill size="20px" color='white' className='' />
                                </button>
                                :
                                <div onClick={stopAudio}>
                                    <Recorewave />
                                </div>

                        }
                    </div>

                </div>
            </div>
            <div className="answers flex items-center justify-center mb-8">
                <div
                    onClick={() => setSelectAnswer(exercise.true_word)}
                    className={`rounded-xl  ${selectAnswer === exercise.true_word ? 'bg-violet-600 text-white' : 'text-[#3f3f3f] bg-white'} drop-shadow px-5 py-2 ml-5 cursor-pointer`}>
                    <p className='font-bold'>
                        {exercise.true_word}
                    </p>
                </div>
                <div
                    onClick={() => setSelectAnswer(exercise.false_word)}
                    className={`rounded-xl  ${selectAnswer === exercise.false_word ? 'bg-violet-600 text-white' : 'text-[#3f3f3f] bg-white'} drop-shadow px-5 py-2 ml-5 cursor-pointer`}>
                    <p className='font-bold'>
                        {exercise.false_word}
                    </p>
                </div>
            </div>
            <div className="flex justify-center">
                {
                    selectAnswer ?
                        <button
                            onClick={handleSubmitAnswer}
                            className='px-4 py-2 drop-shadow-md border-[1px] bg-white text-[#434343] rounded-xl font-semibold'>
                            Submit
                        </button>
                        :
                        <button
                            disabled
                            className='px-4 py-2 drop-shadow-md border-[1px] bg-white text-[#a2a2a2] rounded-xl font-semibold'>
                            Submit
                        </button>

                }

            </div>
            <ResultExercise1
                showModelResult={showModelResult}
                onClose={handleCloseModelResult}
                selectAnswer={selectAnswer}
                exercise={exercise}
                definitions={definitions}
            />
        </div>
    );
};

export default ItemListenExercise;