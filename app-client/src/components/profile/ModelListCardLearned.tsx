import dayjs from 'dayjs';
import { Modal } from 'flowbite-react';
import React from 'react';
interface cardlearned {
    id: number,
    score_gain: number,
    created_at: string,
    flashcard: {
        id: number,
        term: string,
        meaning: string,
        example: string
    }
}
interface typeProps {
    results: cardlearned[],
    showModel: boolean,
    onClose: () => void
}
const ModelListCardLearned = (props: typeProps) => {
    const { results, showModel, onClose } = props
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            size={'4xl'}
            className='h-screen'
        >
            <Modal.Header>

            </Modal.Header>
            <Modal.Body>
                <div className='h-full sm:h-[500px] overflow-y-auto'>
                    <div className='flex flex-col gap-8 first:mt-5'>
                        {
                            results.map((result: cardlearned) => {
                                return (
                                    <div
                                        key={result.id}
                                        className={`card-result relative  px-4 py-5 rounded-lg drop-shadow-lg
                                            ${result.score_gain === 5 ? 'bg-[#06a352]' : `${result.score_gain === 3 ? 'bg-[#ff993a]' : 'bg-[#f83823]'}`}
                                        `}
                                    >
                                        <div className="absolute top-0 -translate-y-1/2">
                                            <div className='bg-violet-600 py-1 px-3 rounded-md'>
                                                <p className='text-white text-sm'>{dayjs(result.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-center">
                                            <div className="term w-full sm:w-1/3 px-3">
                                                <p className='text-white font-semibold'>{result.flashcard.term}</p>
                                            </div>
                                            <div className="meaning w-full sm:w-2/3 px-3">
                                                <p className='text-white font-semibold'>{result.flashcard.meaning}</p>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelListCardLearned;