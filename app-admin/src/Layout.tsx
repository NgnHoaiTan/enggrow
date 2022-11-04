import React, {useEffect} from 'react';
import LeftBar from './components/navbar/LeftBar';
import TopBar from './components/navbar/TopBar';


const Layout = (props: any) => {
    const [showLeftBar, setShowLeftBar] = React.useState(false)
    const handleCloseLeftBar = () => {
        setShowLeftBar(false)
    }
    const handleOpenLeftBar = () => {
        setShowLeftBar(true)
    }

    return (
        <React.Fragment>
            <div className="flex items-start">
                <LeftBar show={showLeftBar} handleOpenLeftBar={handleOpenLeftBar} handleCloseLeftBar={handleCloseLeftBar} />
                <div className='flex flex-col w-full '>
                    <TopBar showLeftBar={showLeftBar} handleOpenLeftBar={handleOpenLeftBar} handleCloseLeftBar={handleCloseLeftBar} />
                    <div className='lg:ml-[235px]'>
                        {props.page}
                    </div>

                </div>

            </div>

        </React.Fragment>
    );
};

export default Layout;