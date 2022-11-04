import React, {useState} from 'react';
import { BiEdit } from 'react-icons/bi';
import { IoVolumeMediumOutline } from 'react-icons/io5';
import EditModel from './EditModel';

interface cardProps {
    type: string
}
const MiniCard = (props: cardProps) => {
    const [showModelEdit, setShowModelEdit] = useState(false)
    const handleCloseEdit = () =>{
        setShowModelEdit(false)
    }
    return (
        <div className={` bg-white shadow-card 
            w-full rounded-md py-2 px-4 h-fit min-h-[70px] even:my-3 `}>
                {/* ${props.type === 'finished' ? 'bg-[#2bb354]' :
            (props.type === 'in-progress' ? 'bg-[#1e61b1]' : 'bg-[#370e6c]')} */}
            <div className="content flex items-center align-middle justify-between">
                <div className="term-part w-2/5">
                    <p className='#1c1c1c font-semibold text-base'>Beef</p>
                </div>
                <div className="meaning-part w-3/6">
                    <p className='#1c1c1c text-base'>Thịt bò (n)</p>
                </div>
                <div className="action w-fit flex items-center justify-evenly">
                    <div className={`cursor-pointer z-10 w-6 h-6 md:w-7 md:h-7 p-1`}>
                        <IoVolumeMediumOutline size="100%" color='#1c1c1c' />
                    </div>
                    <div onClick={()=>setShowModelEdit(true)} className="cursor-pointer edit w-6 h-6 md:w-7 md:h-7 p-1 ml-1">
                        <BiEdit size="100%" color="#1c1c1c" />
                    </div>
                </div>

            </div>
            {/* <EditModel showModelEdit={showModelEdit} onClose = {handleCloseEdit} /> */}
        </div>
    );
};

export default MiniCard;