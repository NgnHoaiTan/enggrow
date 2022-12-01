import React from 'react';
import bootsVocab from "../images/boots-vocab-review.jpg";
import courseReview from "../images/course-review.png";
import callReview from "../images/call-video-review.png";
import heroImage from "../images/heroimage.jpeg";
import { useNavigate } from "react-router-dom";
import {SiWebmoney} from 'react-icons/si'
interface Nav {
    name: string,
    url: string
}
const Redirect: Nav[] = [
    {
        name:'Đăng nhập',
        url:'/login'
    },
    {
        name:'Đăng ký',
        url:'/signup'
    },
]
const Landingpage = () => {
    let navigate = useNavigate();
    return (
        <div className='h-screen'>
            <nav className='flex bg-navbar py-2 items-center flex-shrink-0 justify-between px-5 md:px-10 fixed top-0 w-full z-50 shadow'>
                <div className='w-8 md:w-10'>
                    <SiWebmoney color='#393939' size='100%'/>
                </div>
                <ul className='invisible sm:visible sm:flex text-[#393939]'>
                    {
                        Redirect.map((item, index) => {
                            return (
                                <li key={index} className='first:mr-3 font-medium'>
                                    <a href={item.url} className='p-2 hover:border-b-2'>{item.name}</a>
                                </li>
                            )

                        })
                    }
                </ul>
            </nav>
            <section className='md:flex items-center md:justify-between md:h-5/6 h-72 pt-20'>
                <div className='hidden md:block md:items-center md:justify-self-center md:w-1/2'>
                    {/* <div className='rounded-full w-96 h-96 bg-slate-400 mx-auto bg-cover'>
                        
                    </div> */}
                    <img src={heroImage} alt="hero img" className="rounded-full object-cover bg-transparent mx-auto bg-cover" />
                </div>
                <div className='text-center md:text-left md:w-1/2'>
                    <h1 className='font-bold text-2xl mb-1 md:text-7xl md:mb-4 lg:w-2/3 md:leading-tight'>
                        Cải thiện kỹ năng tiếng anh của bạn
                        </h1>
                    <p className='w-2/3 my-0 mx-auto md:text-left md:mx-0 md:text-2xl md:mb-5'>
                        Trở nên tốt hơn và kết nối với mọi người trên thế giới
                    </p>
                    <div className='hidden sm:block'>
                        <button className='rounded-xl sm:text-xl lg:text-2xl text-white bg-violet-700 py-2 px-7'>Tham gia ngay</button>
                    </div>
                    <div className='visible sm:invisible flex justify-center items-center mt-3'>
                        <button className='rounded-lg text-white text-16 bg-violet-600 py-1 px-2 mr-2' onClick={()=>navigate('/login')}>
                            Đăng nhập
                        </button>
                        <button className='rounded-lg text-white text-16 bg-sky-600 py-1 px-2 ml-2'  onClick={()=>navigate('/signup')}>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
            {/* why choose us */}
            <section id='why-choose-us' className='md:my-10'>
                <h2 className='text-center font-semibold text-xl py-2 md:text-3xl md:font-bold'>Why choose us ?</h2>
                <div className='mt-5 sm:mt-14 md:flex sm:items-center sm:justify-center'>
                    <div className='md:w-1/2'>
                        <img src={bootsVocab} alt="review" className='w-2/3 mx-auto' />
                    </div>
                    <div className='px-1 w-5/6 mx-auto md:w-1/2 md:px-10 relative'>
                        <h3 className='text-center text-lg font-bold text-violet-500 mb-2 md:text-left md:text-2xl lg:text-3xl'>
                            Cải thiện vốn từ vựng qua Flashcard
                        </h3>
                        <p className='text-16 text-center md:text-left md:text-lg lg:text-2xl md:font-light'>
                            Tạo những thẻ từ vựng giúp ghi nhớ và cải thiện vốn từ vựng, đồng thời được học với phương pháp lặp lại ngắt quãng. Hệ thống
                            sẽ tính toán thời gian học tập lần tiếp theo cho bạn một cách khoa học
                        </p>
                        <div className="after:content-[''] after:absolute after:w-10 after:h-10 lg:after:w-28 lg:after:h-28 after:rounded-full after:bg-blue-600 opacity-10 blur-md -z-10">
                        </div>
                        <div className="after:content-[''] after:absolute after:right-7 after:-top-20 after:w-14 after:h-14 lg:after:w-36 lg:after:h-36 after:rounded-full after:bg-blue-600 opacity-20 blur-md after:-z-10">
                        </div>
                    </div>
                </div>
                <div className='mt-5 sm:mt-14 md:flex sm:items-center sm:justify-center md:flex-row-reverse'>
                    <div className='md:w-1/2'>
                        <img src={courseReview} alt="review" className='w-2/3 mx-auto' />
                    </div>
                    <div className='px-1 w-5/6 mx-auto md:w-1/2 md:px-10'>
                        <h3 className='text-center text-lg font-bold text-violet-500 mb-2 md:text-right md:text-2xl lg:text-3xl'>
                            Tham gia các khóa học cải thiện kỹ năng nói và phát âm
                        </h3>
                        <p className='text-16 text-center md:text-right md:text-lg lg:text-2xl md:font-light'>
                            Với hệ thống phân tích và đánh giá phát âm, bạn sẽ được đánh giá phát âm của bản thân khi sử dụng các khóa học
                        </p>
                        <div className="after:content-[''] after:absolute after:-top-20 after:w-14 after:h-14 lg:after:w-36 lg:after:h-36 after:rounded-full after:bg-violet-600 opacity-20 blur-md after:-z-10">
                        </div>
                        <div className="after:content-[''] after:absolute after:right-0 after:w-10 after:h-10 lg:after:w-28 lg:after:h-28 after:rounded-full after:bg-red-600 opacity-10 blur-md -z-10">
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>

    );
};

export default Landingpage;