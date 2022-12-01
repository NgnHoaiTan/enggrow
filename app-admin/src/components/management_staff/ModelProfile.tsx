import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import { useAppSelector } from '../../app/hooks';
import { getStaffProfile } from '../../features/staff_management/staff_managementSlice';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncDeleteStaff, asyncGetListStaffs } from '../../features/staff_management/staff_managementApis';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import DOMPurify from 'dompurify';

interface typeProps {
    showModel: boolean,
    onClose: () => void,
    onDeleteStaff: (param: string) => void,
    loading: boolean,
    error: string
}
const ModelProfile = (props: typeProps) => {
    const { showModel, onClose, loading, error, onDeleteStaff } = props
    const profile = useAppSelector(getStaffProfile)
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)


    const notifyError = (message: string) => toast.error(message)

    const handleConfirmDelete = () => {
        confirmAlert({

            title: 'Xác nhận xóa nhân viên',
            message: 'Vui lòng xác nhận',
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => handleDeleteStaff()
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
    const handleDeleteStaff = async () => {
        try {
            let oldProfile = profile
            let data = {
                id: profile.id,
                accessToken: accessToken
            }
            await dispatch(asyncDeleteStaff(data)).unwrap()
            await dispatch(asyncGetListStaffs(accessToken)).unwrap()
            onDeleteStaff(`Đã xóa nhân viên ${oldProfile.name}`)
            onClose()

        } catch (error: any) {
            if (error.message) {
                notifyError(error.message)
            }
            else {
                notifyError('Lỗi không xác định')
            }

        }
    }
    const createMarkup = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    }

    if (loading) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                size={'3xl'}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Hồ sơ nhân viên
                </Modal.Header>
                <Modal.Body>
                    <div className='h-[300px]'>

                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (error) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                size={'3xl'}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Hồ sơ nhân viên
                </Modal.Header>
                <Modal.Body>
                    <div className='h-[300px]'>
                        <p className='text-red text-center font-semibold text-lg'>{error}</p>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (!profile) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                size={'3xl'}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Hồ sơ nhân viên
                </Modal.Header>
                <Modal.Body>
                    <div className='h-[300px]'>
                        <div className="flex justify-center flex-col items-center mt-10">

                            <div className='w-full px-10 sm:w-[200px] sm:px-0 md:w-[400px] lg:w-[500px]'>
                                <img
                                    className='w-full drop-shadow-md'
                                    src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                            </div>
                            <h2 className='font-bold text-lg sm:text-2xl text-center text-[#3f3f3f] mt-5'>Không tìm thấy, vui lòng thử lại sau</h2>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'3xl'}
            className='h-screen'
        >
            <Modal.Header className='ml-3 text-base'>
                Hồ sơ nhân viên {profile.name.split(' ').slice(-1).join(' ')}
            </Modal.Header>
            <Modal.Body>
                <div className='h-[500px] overflow-y-auto'>
                    <div className='flex justify-center'>
                        <div className="avatar w-[80px] h-[80px] sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full drop-shadow-md">
                            <img
                                className='w-full h-full rounded-full object-cover'
                                src={profile.current_avatar} alt="user" />
                        </div>
                    </div>
                    <div>
                        <p className='font-bold text-lg  text-center mt-2'>
                            {profile.name}
                        </p>
                        <div className="info sm:px-10">
                            <div className="about_me flex items-start mb-2">
                                <p className='font-semibold w-36'>Giới thiệu</p>
                                {
                                    profile.staff_profile ?
                                        <React.Fragment>
                                            {
                                                profile.staff_profile.introduction ?
                                                    <p className='w-fit'>
                                                        {profile.staff_profile.introduction}
                                                    </p>
                                                    :
                                                    <p className='text-[#537fd0]'>
                                                        Chưa cập nhật
                                                    </p>
                                            }
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <p className='text-[#537fd0]'>
                                                Chưa cập nhật
                                            </p>
                                        </React.Fragment>

                                }

                            </div>
                            <div className="phone_number flex items-center">

                                <p className='w-36 font-semibold'>Số điện thoại</p>
                                {
                                    profile.phone_number ?
                                        <p>
                                            {profile.phone_number}
                                        </p>
                                        :
                                        <p className='text-[#537fd0]'>
                                            Chưa cập nhật
                                        </p>
                                }
                            </div>
                            <div className="address flex items-start">
                                <p className='w-36 font-semibold'>Địa chỉ</p>
                                {
                                    profile.address ?
                                        <p>
                                            {profile.address}
                                        </p>
                                        :
                                        <p className='text-[#537fd0]'>
                                            Chưa cập nhật
                                        </p>
                                }
                            </div>
                            <div className="created_at flex items-center">
                                <p className='w-36 font-semibold'>Ngày tham gia</p>
                                <p>{dayjs(profile.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                            </div>
                            <div className="experience my-3">
                                <p className='text-lg font-bold mb-2'>Chứng chỉ</p>
                                <div>
                                    {
                                        profile.staff_profile ?
                                            <React.Fragment>
                                                {
                                                    profile.staff_profile.certification_url ?
                                                        <React.Fragment>
                                                            {
                                                                showModel &&
                                                                <Zoom>
                                                                    <img src={profile.staff_profile.certification_url} alt="certification"
                                                                        className='w-[100px]'
                                                                    />
                                                                </Zoom>
                                                            }
                                                        </React.Fragment>
                                                        :
                                                        <p className='text-[#537fd0]'>
                                                            Chưa cập nhật chứng chỉ
                                                        </p>
                                                }
                                            </React.Fragment>
                                            :
                                            <React.Fragment>
                                                <p className='text-[#537fd0]'>Chưa cập nhật hồ sơ nhân viên</p>
                                            </React.Fragment>
                                    }


                                </div>
                            </div>
                            <div className="experience my-3">
                                <p className='text-lg font-bold mb-2'>Experience</p>
                                {
                                    profile.staff_profile ?
                                        <React.Fragment>
                                            {
                                                profile.staff_profile.staff_experience ?
                                                    <React.Fragment>
                                                        {
                                                            profile.staff_profile.staff_experience.map((experience: any) => {
                                                                return (
                                                                    <div className='mb-3'>
                                                                        <p className='font-bold mb-2 text-green-600'>{experience.position}</p>
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
                                                                    </div>

                                                                )
                                                            })
                                                        }

                                                    </React.Fragment>
                                                    :
                                                    <p className='text-[#537fd0]'>Chưa cập nhật kinh nghiệm làm việc</p>
                                            }
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <p className='text-[#537fd0]'>Chưa cập nhật kinh nghiệm làm việc</p>
                                        </React.Fragment>

                                }
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <button
                            onClick={handleConfirmDelete}
                            className='rounded-lg py-2 px-5 font-semibold text-white bg-gradient-to-r from-[#8c28ce] to-[#3f3ff3]'>Delete staff</button>
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        draggable={true}
                        autoClose={5000}
                    />
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelProfile;