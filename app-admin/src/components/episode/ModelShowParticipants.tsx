import React from 'react';
import { Modal } from 'flowbite-react/lib/esm/components';
import dayjs from 'dayjs';
interface member {
    id: number,
    created_at: string,
    participant: any
}
interface typeProps {
    members: member[],
    loading: boolean,
    error: string,
    showModel: boolean,
    onClose: () => void
}
const ModelShowParticipants = (props: typeProps) => {
    const { members, loading, error, showModel, onClose } = props

    console.log(members)
    if (loading) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Danh sách Người dùng đã đăng ký
                </Modal.Header>
                <Modal.Body>
                </Modal.Body>
            </Modal>
        )
    }
    else if (!members || error) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Danh sách Người dùng đã đăng ký
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {
                            error &&
                            <p className='text-red-500 font-semibold text-center'>{error}</p>
                        }
                        <div className='flex items-center justify-center'>
                            <img src="" alt="" />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
    else if (members.length === 0) {
        return (
            <Modal
                show={showModel}
                onClose={onClose}
                popup={true}
                className='h-screen'
            >
                <Modal.Header className='ml-3 text-base'>
                    Danh sách Người dùng đã đăng ký
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="flex justify-center flex-col items-center mt-10">

                            <div className='w-full px-10 sm:w-[200px] '>
                                <img
                                    className='w-full drop-shadow-md'
                                    src="https://res.cloudinary.com/hoaitan/image/upload/v1668606328/engrow/Search_concept_Yellow_Folder_and_magnifier_icons_hand_drawn_cartoon_art_illustration-removebg-preview_ydpu85.png" alt="notfound" />
                            </div>
                            <h2 className='font-semibold text-center text-[#3f3f3f] mt-5'>Khóa học chưa có người dùng đăng ký</h2>
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
            className='h-screen'
        >
            <Modal.Header className='ml-3 text-base'>
                Danh sách Người dùng đã đăng ký
            </Modal.Header>
            <Modal.Body>
                <div className='my-3 h-[500px]  overflow-y-auto'>
                    {
                        members.map((member: any) => {
                            return (
                                <div 
                                key={member.id}
                                className="member-item flex items-center justify-between mb-4">
                                    <div className='flex items-center'>
                                        <div className="avatar w-9 h-9 rounded-full border-2 border-white drop-shadow-md mr-3">
                                            <img src={member.participant.current_avatar ? member.participant.current_avatar : 'https://res.cloudinary.com/hoaitan/image/upload/v1667311147/engrow/image_processing20210907-13511-1juj33d_xrlfla.gif'} alt="user avatar"
                                                className='w-full h-full rounded-full object-cover'
                                            />
                                        </div>
                                        <div className='flex-col sm:block'>
                                            <p className='font-semibold'>{member.participant.name}</p>
                                            <p className='block sm:hidden text-sm'>đăng ký vào ngày: {dayjs(member.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                                        </div>

                                    </div>
                                    <div className='hidden sm:block'>
                                        <p>đăng ký vào ngày: {dayjs(member.created_at).format('DD/MM/YYYY hh:mm:ss')}</p>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModelShowParticipants;