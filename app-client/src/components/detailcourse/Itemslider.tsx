import React from 'react';
import { Link } from 'react-router-dom';
import { picturePlanet } from '../../common/Image';

interface episode {
    id: number,
    name: string,
    description: string,
}
interface typeProps {
    episode: episode
}
const Itemslider = (props: typeProps) => {
    const { episode } = props
    return (
        <div className='h-screen w-full flex justify-center overflow-y-auto'>
            <div className='w-full mt-28 mb-2 md:mt-40 px-3 sm:px-0 sm:w-[400px] md:w-[500px] lg:w-[550px] flex justify-center'>
                <div className="content-episode text-white">
                    <div className='w-40 h-40 rounded-full mx-auto'>
                        <img src={picturePlanet} alt="planet" className='w-full h-full object-cover rounded-full' />
                    </div>
                    <p className='my-3 text-xl md:text-2xl lg:text-3xl font-semibold text-center'>
                        {episode.name}
                    </p>
                    <p className='leading-snug text-center text-lg md:text-xl'>
                        {episode.description}
                    </p>
                    <div className="flex justify-center my-5">
                        <button className='py-2 px-5 text-white font-bold bg-transparent border-2 border-white hover:border-violet-700 duration-100 ease-in rounded-xl'>
                            <Link to={`${episode.id}`}>
                                Start
                            </Link>
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Itemslider;