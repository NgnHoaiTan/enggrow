import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import ModelAddExperience from './ModelAddExperience';
import ModelEditExperience from './ModelEditExperience';

interface typeProps {
    experience: {
        id: number,
        position: string,
        description: string,
        from_time: string,
        to_time: string
    }
}
const ExperienceItem = (props: typeProps) => {
    const { experience } = props
    const [showModelEdit, setShowModelEdit] = useState(false)
    
    const handleOpenModelEdit = () => {
        setShowModelEdit(true)
    }
    const handleCloseModelEdit = () => {
        setShowModelEdit(false)
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    return (
        <div className='my-2'>
            <div className="">
                <div className="flex items-center  gap-3">
                    <div className='position  rounded-md py-1 px-3 w-fit bg-violet-500'>
                        <p className='text-white font-bold'>{experience.position}</p>
                    </div>

                    <div
                        onClick={handleOpenModelEdit}
                        className="cursor-pointer">
                        <BiMessageSquareEdit size={'25px'} color='#237cc9' />
                    </div>
                </div>

            </div>
            <div className='ml-3'>
                <div className="word-duration flex items-center gap-2 my-2">
                    <p className='font-semibold'>
                        {dayjs(experience.from_time).format('DD/MM/YYYY')}
                    </p>
                    <p className='font-semibold'> - </p>
                    <p className='font-semibold'>
                        {dayjs(experience.to_time).format('DD/MM/YYYY')}
                    </p>
                </div>
                <div className="description">
                    <div className="description leading-normal text-lg" dangerouslySetInnerHTML={createMarkup(experience.description)}></div>
                </div>
            </div>

            <ModelEditExperience
                onClose={handleCloseModelEdit}
                showModel={showModelEdit}
                experience={experience}
            />
        </div>
    );
};

export default ExperienceItem;