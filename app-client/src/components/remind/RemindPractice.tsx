import React from 'react';
import robotface from '../../images/robot-remind.png'
import { Modal } from 'flowbite-react/lib/esm/components';
import { greatJob } from '../../common/Image';
import { useNavigate } from 'react-router';

interface typeProps {
    showModel: boolean,
    onClose: () => void,
    listRemind: any[]
}
const RemindPractice = (props: typeProps) => {
    const { showModel, onClose, listRemind } = props
    const navigate = useNavigate()

    const handleNavigateToFolder = (folderId: number) => {
        onClose()
        navigate(`/folders/flashcard/${folderId}`)
    }
    return (
        <div className=''>
            <Modal
                show={showModel}
                onClose={onClose}

                popup={true}
                size={'3xl'}
                className={`${showModel ? 'animate-showRemind block' : 'opacity-0 duration-1000'} `}
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='h-[400px] overflow-y-auto'>
                        <p className='text-lg font-bold text-[#3f3f3f]'>Nhắc nhở học từ vựng</p>
                        <div className="my-3">
                            {
                                listRemind &&
                                <React.Fragment>
                                    {
                                        listRemind.length > 0 ?
                                            <div>
                                                <table className='w-full p-3'>
                                                    <thead>
                                                        <tr>
                                                            <th className='text-left'>Tên thư mục</th>
                                                            <th className='text-left'>Tổng số từ cần học</th>
                                                            <th className='text-left'>Từ mới</th>
                                                            <th className='text-left'>Tùy chọn</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            listRemind.map((folder: any) => {
                                                                return (
                                                                    <tr
                                                                        key={folder.id}
                                                                        className=''>
                                                                        <td className='font-semibold'>
                                                                            {folder.name}
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                folder.flashcard ?
                                                                                    <>
                                                                                        {
                                                                                            folder.flashcard.filter((card: any) => card.type === 0 || 1).length
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    'NaN'
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                folder.flashcard ?
                                                                                    <>
                                                                                        {
                                                                                            folder.flashcard.filter((card: any) => card.type === 0).length
                                                                                        }
                                                                                    </>
                                                                                    :
                                                                                    'NaN'
                                                                            }
                                                                        </td>
                                                                        <td className='py-2'>
                                                                            <button 
                                                                            onClick={()=>handleNavigateToFolder(folder.id)}
                                                                            className='rounded-md py-1 px-3 text-white font-semibold bg-blue-500'>
                                                                                Học
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>
                                            :
                                            <div>
                                                <div className='w-[100px] sm:w-[150px] mx-auto'>
                                                    <img src={greatJob} alt="greatjob" className='w-full drop-shadow-md' />
                                                </div>
                                                <p className='font-bold text-[#3f3f3f] text-center'>Thật tuyệt, bạn không có từ vựng nào để học hôm nay</p>
                                            </div>
                                    }
                                </React.Fragment>
                            }
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </div>
    );
};

export default RemindPractice;