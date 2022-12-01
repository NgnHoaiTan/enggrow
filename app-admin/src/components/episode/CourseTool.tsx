import React, {useState} from 'react';
import { useAppSelector } from '../../app/hooks';
import { getCourse } from '../../features/pronunciation_course/pronunCourseSlice';
import EditCourse from '../courses/EditCourse';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { asyncDeletePronunCourse, asyncGetAllPronunCourses } from '../../features/pronunciation_course/pronunCourseAPIs';
import { useNavigate, useParams } from 'react-router';
import { getCurrentToken } from '../../features/authentication/authSlice';

const CourseTool = () => {
    const [showModelEdit, setShowModelEdit] = useState(false)
    const handleCloseEditModel =()=>{
        setShowModelEdit(false)
    }
    const course = useAppSelector(getCourse)
    const navigate = useNavigate()
    const {courseId} = useParams()
    const accessToken = useAppSelector(getCurrentToken)
    const dispatch = useDispatch<AppDispatch>()
    const handleConfirmDelete=()=>{
        confirmAlert({
            
            title: 'Xác nhận xóa khóa học',
            message: 'Vui lòng xác nhận',
            buttons: [
              {
                label: 'Xác nhận',
                onClick: () => handleDeleteCourse()
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

    const handleDeleteCourse= async()=>{
        try{
            const dataSubmit= {
                id: courseId,
                accessToken:accessToken
            }
            const deleteResult = await dispatch(asyncDeletePronunCourse(dataSubmit)).unwrap()
            const dataGet = {
                accessToken:accessToken
            }
            dispatch(asyncGetAllPronunCourses(dataGet))
            navigate('/management/courses', {replace: true})

        }catch(error){
            console.log(error)
        }
    }
    return (
        <div className='pr-5 mb-2'>
            <div className="flex flex-row justify-end items-center gap-5">
                <div className="update-btn  cursor-pointer">
                    <button 
                    onClick={()=>setShowModelEdit(true)}
                    className='text-sm md:text-base px-4 py-1 rounded-xl bg-green-400 text-white font-semibold'>
                        Cập nhật khóa học
                    </button>
                </div>
                <div className="delete-btn cursor-pointer">
                   <button 
                   onClick={handleConfirmDelete}
                   className='text-sm md:text-base px-4 py-1 rounded-xl bg-red-500 text-white font-semibold'>
                        Xóa khóa học
                   </button>
                </div>
            </div>
            {
                course &&  <EditCourse course={course} open={showModelEdit} onClose={handleCloseEditModel}/>
            }
           
        </div>
    );
};

export default CourseTool;