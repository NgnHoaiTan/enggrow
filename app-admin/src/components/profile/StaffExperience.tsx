import React, { useState } from 'react';
import ExperienceItem from './ExperienceItem';
import ModelAddExperience from './ModelAddExperience';
import { IoIosAdd } from 'react-icons/io'
interface experience {
    id: number,
    position: string,
    description: string,
    from_time: string,
    to_time: string
}
interface typeProps {
    staff_experience: experience[] | null
}
const StaffExperience = (props: typeProps) => {
    const { staff_experience } = props
    const [showModelCreate, setShowModelCreate] = useState(false)


    const handleOpenModelCreate = () => {
        setShowModelCreate(true)
    }
    const handleCloseModelCreate = () => {
        setShowModelCreate(false)
    }

    if (!staff_experience) {
        return (
            <div className='my-3'>
                <p className='font-bold text-xl mb-2'>My Experience</p>
                <p className='text-red-500 font-bold md:text-lg text-center mt-10'>
                    Error happen when loading experience, try later
                </p>
            </div>
        )
    }
    else if (staff_experience.length === 0) {
        return (
            <div className='mt-3 mb-5'>
                <p className='font-bold text-xl mb-2'>Kinh nghiệm làm việc</p>
                <p className='text-orange-500 font-bold md:text-lg text-center mt-10'>
                    Vui lòng bổ sung thông kinh nghiệm làm việc, nếu có
                </p>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleOpenModelCreate}
                        className='px-5 py-2  bg-blue-500 text-white font-semibold rounded-xl'>
                        Thêm kinh nghiệm
                    </button>
                </div>
                <ModelAddExperience
                    onClose={handleCloseModelCreate}
                    showModel={showModelCreate}
                />
            </div>
        )
    }
    return (
        <div className='mt-3 mb-10'>
            <div className="flex mb-7 gap-5">
                <p className='font-bold text-xl'>Kinh nghiệm làm việc</p>
                <div className="add-experience">
                    <button
                        onClick={handleOpenModelCreate}
                        className='flex items-center gap-1 font-semibold text-sm bg-white drop-shadow-lg shadow-card py-1 px-3 rounded-md'>
                         Thêm
                        <IoIosAdd size={'18px'} color='#3f3f3f' />
                    </button>
                </div>
            </div>
            <div className="experience-list">
                {
                    staff_experience.map((experience: experience) => {
                        return (
                            <React.Fragment key={experience.id}>
                                <ExperienceItem experience={experience} />
                            </React.Fragment>

                        )
                    })
                }
            </div>
            <ModelAddExperience
                onClose={handleCloseModelCreate}
                showModel={showModelCreate}
            />
        </div>
    );
};

export default StaffExperience;