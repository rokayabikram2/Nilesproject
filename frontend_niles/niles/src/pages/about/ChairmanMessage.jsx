import React, { useState,useEffect } from 'react';
import axios from 'axios';

function ChairmanMessage() {
    const [chairman,setMessage]=useState([]);

    const MessageData = async () => {
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const MessageDatas = response.data.filter(
                (item)=> item.status ==="Publish" && item.page_type ==="Message from Chairman"
                
            );
            setMessage(MessageDatas[0]);
        }catch (error){
            console.error("Errror on fetching data:", error);
        }
    };

    useEffect(() => {
        MessageData();
    }, []);
    console.log(chairman);
    const word = chairman.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");


    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={chairman.slider_image} alt="background" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord} </big>{otherWords}</h1>
                </div>
            </section>
            <section className='py-12'>
                <div className="container flex md:flex-row flex-col justify-between gap-4">
                    <div className='md:w-2/3 w-full flex flex-col md:items-start items-center md:mb-0 mb-5'>
                        <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-8 text-black relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{chairman.title}</h2>
                        <div className='text-gray-700' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                            <p className='text-xl font-medium text-black' dangerouslySetInnerHTML={{ __html : chairman.short_desc }}></p>
                        </div>  
                             
                    </div>
                    <div className='md:w-1/3 w-full' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                        <img  src={chairman.bannerimage} alt="chairman image" />
                        <h3 className='text-xl text-center font-bold mt-1'>{ chairman.meta_title }</h3>
                        <p className='text-lg text-center font-semibold text-gray-700'>{ chairman.meta_keyword }</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ChairmanMessage;
