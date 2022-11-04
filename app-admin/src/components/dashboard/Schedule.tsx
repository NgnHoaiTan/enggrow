
import React, { useEffect } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import ScheduleTask from './ScheduleTask';

const Schedule = () => {
    const [nextTask, setNextTask] = React.useState(false);
    const [prevTask, setPrevTask] = React.useState(false);
    const [position, setPosition] = React.useState(0)
    const slider = React.useRef<HTMLDivElement>(null)


    
    useEffect(() => {
        const action = async () => {
            if (nextTask) {
                await handleDownSchedule();
            }
        }
        action();
        setNextTask(false)
        return

    }, [nextTask])
    useEffect(() => {
        const action = async () => {
            if (prevTask) {
                await handleUpSchedule();
            }
        }
        action();
        setPrevTask(false)
        return

    }, [prevTask])
    const handleUpSchedule = () => {
        const childSlider = slider.current?.childElementCount
        if (childSlider) {
            if (Math.abs(position) >= 116) {
                setPosition(position + 116)
            }
        }
    }
    const handleDownSchedule = () => {
        const childSlider = slider.current?.childElementCount
        console.log(position)
        console.log(((childSlider! - 3) * 116))
        if (childSlider) {
            if (Math.abs(position) >= 0 && Math.abs(position) < ((childSlider - 3) * 116)) {
                setPosition(position - 116)
            }
            else if (Math.abs(position) >= (childSlider - 3) * 116) {
                setPosition(0)
            }

        }
    }
    return (
        <div className='relative h-[450px] overflow-hidden p-3 my-2'>
            <div className="flex flex-col items-center justify-between">
                <div className="pre-btn absolute top-0 z-50">
                    <FaAngleUp onClick={() => setPrevTask(true)} size="25px" className="p-1 rounded-full bg-gray-100 cursor-pointer" />
                </div>
                <div className="next-btn absolute top-full -translate-y-full z-50">
                    <FaAngleDown onClick={() => setNextTask(true)} size="25px" className="p-1 rounded-full bg-gray-100 cursor-pointer" />
                </div>
            </div>
            {/* slider vertical translate-y-[${position}px] */}
            <ScheduleTask
                slider={slider}
                transition={`translateY(${position}px)`}
            />
        </div>
    );
};

export default Schedule;