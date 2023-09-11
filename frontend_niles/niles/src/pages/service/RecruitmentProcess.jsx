import React,{useState,useEffect} from 'react';
import axios from 'axios';

function RecruitmentProcess() {
    const [reqdProcess,setReqdProcess]=useState([]);

    const reqdProcessData = async () => {
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const reqdProcessDatas = response.data.filter(
                (item)=> item.status ==="Publish" && item.page_type ==="Recruitment Process"
                
            );
            setReqdProcess(reqdProcessDatas[0]);
        }catch (error){
            console.error("Errror on fetching data:", error);
        }
    };

    useEffect(() => {
        reqdProcessData();
    }, []);
    // console.log(reqdProcess);
    
    const word = reqdProcess.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");
    
    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={reqdProcess.slider_image} alt="background" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{reqdProcess.name} </big>{reqdProcess.caption}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container flex lg:flex-row flex-col justify-between gap-4">
                    <div className='flex flex-col items-start lg:w-5/12 w-full lg:mb-0 mb-5'>
                        <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{reqdProcess.title}</h2>
                        <div className='text-gray-700'>
                            <p className='mb-2' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200' dangerouslySetInnerHTML={{__html : reqdProcess.short_desc}}></p>
                            {/* <ul className='bg-gray-100 p-2' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                <li className='flex items-center'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Advertisement</p>
                                </li>
                                <li className='flex items-center my-1'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Legal Documentation & Registration</p>
                                </li>
                                <li className='flex items-center'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Prepares Schedule of Interview Dates</p>
                                </li>
                                <li className='flex items-center my-1'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Offer Letters, Medical & Relevant Documents</p>
                                </li>
                                <li className='flex items-center'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Deployment & Begins Deployment Process</p>
                                </li>
                                <li className='flex items-center my-1'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Visa, Other Processes & Orientation</p>
                                </li>
                                <li className='flex items-center'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Employment Contract Signing</p>
                                </li>
                                <li className='flex items-center my-1'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Pre-Departure Orientation</p>
                                </li>
                                <li className='flex items-center'>
                                    <i class="fa-sharp fa-solid fa-check me-2"></i>
                                    <p>Departure</p>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div className='lg:w-7/12 w-full' data-aos="zoom-in-up" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                        <img className='w-full' src={reqdProcess.bannerimage} alt="recruitment process" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default RecruitmentProcess;
