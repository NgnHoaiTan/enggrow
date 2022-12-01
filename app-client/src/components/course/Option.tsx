import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import SearchModel from './SearchModel';
import { RiFilter3Line } from 'react-icons/ri'
import ResponsiveFilter from './ResponsiveFilter';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Option = () => {
    const [showFilter, setShowFilter] = React.useState(false)
    const [showModelSearch, setShowModelSearch] = React.useState(false)
    const [search, setSearch] = useSearchParams();
    const location = useLocation()
    const navigate = useNavigate()
    const onClose = () => {
        setShowModelSearch(false)
    }

    const handleSelectLevel = (e: any) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                level: e.target.value
            }).toString()
        });
    }
    return (
        <div className=''>
            <div className='flex flex-wrap items-center justify-between px-2 md:px-0'>
                <div className="sm:hidden relative">
                    <button onClick={() => setShowFilter(!showFilter)} className='py-1 px-2 cursor-pointer bg-blue-500 ml-3 hover:bg-blue-600 rounded-md'>
                        <RiFilter3Line size="20px" color="white" className="" />
                    </button>
                    {
                        showFilter && <ResponsiveFilter showFilter={showFilter} setShowFilter={setShowFilter} />
                    }
                    
                </div>
                <div className="hidden sm:flex left-option items-center">
                    <div className="choose-level ">
                        <select 
                        onChange={handleSelectLevel}
                        value={search.get('level') || 'all'}
                        className='bg-white text-sm sm:text-base border border-solid border-gray-300 w-32 sm:w-40 rounded-md px-2 py-1 focus:border-blue-600 focus:outline-none bg-clip-padding bg-no-repeat'>
                            <option value="all">
                                Tất cả
                            </option>
                            <option value="beginner">
                                Căn bản
                            </option>
                            <option value="intermediate">
                                Trung cấp
                            </option>
                            <option value="upper intermediate">
                                Trên trung cấp
                            </option>
                            <option value="advanced">
                                Cao cấp
                            </option>
                        </select>

                    </div>
                    <button className='py-1 px-2 cursor-pointer bg-blue-500 ml-3 hover:bg-blue-600 rounded-md'>
                        <RiFilter3Line size="20px" color="white" className="" />
                    </button>

                </div>
                <div className="right-option">
                    <div className="search">
                        <div onClick={() => setShowModelSearch(true)} className="flex overflow-hidden items-center relative outline-none border-none ring-gray-200 ring-1 focus:ring-gray-400 w-28 md:w-32 lg:w-40 xl:w-64 bg-white rounded-lg py-1 pr-3 pl-10 text-sm md:text-base cursor-pointer focus:border-blue-500 border-1">
                            <AiOutlineSearch color='#9f9f9f' size='22px' className='absolute top-1/2 -translate-y-1/2 left-2 cursor-pointer' />
                            <input className="invisible" />
                            <p className='absolute text-gray-400 text-sm md:text-base top-1/2 -translate-y-1/2'>Tìm</p>
                        </div>
                    </div>
                </div>

            </div>
            <SearchModel showModelSearch={showModelSearch} onClose={onClose} />
        </div>

    );
};

export default Option;