import React from 'react';
import { MdFirstPage, MdLastPage, MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';


interface user {
    id: number,
    username: string,
    name: string,
    current_avatar: string,
    email: string,
    address: string,
    phone_number: string,
    dob: string
}
interface dataPagination {
    data: user[],
    count: number,
    currentPage: number,
    nextPage: number | null,
    prevPage: number | null,
    lastPage: number,
    firstPage: number
}
interface typeProps {
    listusers: dataPagination
}
const PaginationUser = (props: typeProps) => {
    const { listusers } = props
    const navigate = useNavigate()
    const location = useLocation()
    const handleChangePage = (page: any) => {
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                page: page
            }).toString()
        });
    }
    return (
        <div className='flex items-center justify-between'>
            <div>
                <p>{listusers.currentPage}/{listusers.lastPage}</p>
            </div>
            <div className="flex items-center">
                <div className="first">
                    <button
                        onClick={() => handleChangePage(listusers.firstPage)}
                        className='py-1 px-2'>
                        <MdFirstPage size={'20px'} />
                    </button>
                </div>
                <div className="previous ">
                    {
                        listusers.prevPage ?
                            <button
                                onClick={() => handleChangePage(listusers.prevPage)}
                                className='py-1 px-2'>
                                <MdNavigateBefore size={'20px'} />
                            </button>
                            :
                            <button
                                className='py-1 px-2'>
                                <MdNavigateBefore size={'20px'} />
                            </button>
                    }

                </div>
                <div className="current_page">
                    <button className='py-1 px-2'>
                        {listusers.currentPage}
                    </button>
                </div>
                <div className="next">
                    {
                        listusers.nextPage ?
                            <button
                                onClick={() => handleChangePage(listusers.nextPage)}
                                className='py-1 px-2'>
                                <MdNavigateNext size={'20px'} />
                            </button>
                            :
                            <button
                                className='py-1 px-2'>
                                <MdNavigateNext size={'20px'} />
                            </button>
                    }

                </div>
                <div className="last ">
                    <button
                        onClick={() => handleChangePage(listusers.lastPage)}
                        className='py-1 px-2'>
                        <MdLastPage size={'20px'} />
                    </button>

                </div>
            </div>

        </div>
    );
};

export default PaginationUser;