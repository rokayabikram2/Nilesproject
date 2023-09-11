import React,{useState,useEffect} from 'react'
import Categories from './Categories';
import axios from 'axios';

function Category() {
    const [job,setJob]= useState([])
 

    const jobData = async () => {
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const JobDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Job Category"
            );
            setJob(JobDatas[0]);
          
        }catch (error){
            console.error("Error on fetching data:", error);
        }
    };
    useEffect(() => {
        jobData();

    }, []);

    const word = job.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");
    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={job.slider_image} alt="background" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord} </big>{otherWords}</h1>
                </div>
            </section>
            <Categories />
        </>
    )
}

export default Category;
