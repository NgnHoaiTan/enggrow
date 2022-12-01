import { Modal } from 'flowbite-react';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { AppDispatch } from '../../app/store';
import { getCurrentToken } from '../../features/authentication/authSlice';
import { asyncManuallyBackupData } from '../../features/backup/backupApi';

interface typeProps {
    showModel: boolean,
    onClose: () => void,
    onActionBackup: Dispatch<SetStateAction<boolean>>,
    onSetResult: Dispatch<SetStateAction<boolean>>,
}
const BackupModel = (props: typeProps) => {
    const { showModel, onClose, onActionBackup, onSetResult } = props
    const dispatch = useDispatch<AppDispatch>()
    const accessToken = useAppSelector(getCurrentToken)
    const handleBackup = async () => {
        onSetResult(() => false)
        onActionBackup(() => false)
        try {
            await dispatch(asyncManuallyBackupData(accessToken)).unwrap()
            onSetResult(() => true)
            onActionBackup(() => true)
            onClose()
        } catch (error: any) {
            onSetResult(() => false)
            onActionBackup(() => true)
            onClose()
        }
    }
    return (
        <Modal
            show={showModel}
            onClose={onClose}
            popup={true}
            size={'xl'}
            className='h-screen'
        >
            <Modal.Header className='ml-3 text-base'>
                Sao lưu dữ liệu
            </Modal.Header>
            <Modal.Body>
                <div className=' flex flex-col items-center my-5'>
                    <div className='mb-3'>
                        <img src="https://res.cloudinary.com/hoaitan/image/upload/v1667311147/engrow/image_processing20210907-13511-1juj33d_xrlfla.gif" alt="robot"
                            className='w-28'
                        />
                    </div>
                    <p className='text-center font-semibold text-xl text-[#3f3f3f]'>Xác nhận sao lưu</p>
                    <div className="flex items-center justify-center gap-5">
                        <button
                            onClick={onClose}
                            className='my-3 bg-violet-600 text-white rounded-xl font-bold py-1 px-4'
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleBackup}
                            className='my-3 bg-violet-600 text-white rounded-xl font-bold py-1 px-4'
                        >
                            Sao lưu
                        </button>
                    </div>

                </div>
            </Modal.Body>
        </Modal>
    );
};

export default BackupModel;