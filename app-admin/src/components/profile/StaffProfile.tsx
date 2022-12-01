import React, { useState } from 'react';
import ModelCreateStaffInfo from './ModelCreateStaffInfo';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import StaffExperience from './StaffExperience';
import { BiMessageSquareEdit } from 'react-icons/bi'
import ModelEditStaffInfo from './ModelEditStaffInfo';



interface staff_profile {
    id: number,
    introduction: string,
    certification_url: string,
    staff_experience: any[]
}
interface typeProps {
    staff_profile: staff_profile
}
const StaffProfile = (props: typeProps) => {
    const { staff_profile } = props
    const [showModelEdit, setShowModelEdit] = useState(false)


    const handleOpenModelEdit = () => {
        setShowModelEdit(true)
    }

    const handleCloseModelEdit = () => {
        setShowModelEdit(false)
    }

    return (
        <div className='mt-5'>
            <div className="flex items-center gap-3  mb-3">
                <h2 className='font-bold text-2xl'>Thông tin nhân viên của tôi</h2>
                <div
                    onClick={handleOpenModelEdit}
                    className="cursor-pointer">
                    <BiMessageSquareEdit size={'25px'} color='#237cc9' />
                </div>

            </div>

            <div className="about-me mb-3">
                <p className='font-bold text-lg mb-2'>Giới thiệu</p>
                <p className='text-lg'>{staff_profile.introduction}</p>
            </div>
            <div className="certification">
                <p className='font-bold text-lg mb-2'>Chứng chỉ</p>
                <div className='flex justify-center'>
                    <Zoom>
                        <img src={staff_profile.certification_url} alt="certification"
                            className='w-[300px]'
                        />
                    </Zoom>

                </div>
            </div>
            <div className="experience">
                {
                    staff_profile.staff_experience ?
                        <StaffExperience
                            staff_experience={staff_profile.staff_experience}
                        />
                        :
                        <div>
                            
                        </div>
                }

            </div>
            <ModelEditStaffInfo showModel={showModelEdit} onClose={handleCloseModelEdit} information={staff_profile} />
        </div>
    );
};

export default StaffProfile;