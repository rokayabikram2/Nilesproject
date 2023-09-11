import React,{useState,useEffect} from 'react';
import axios from 'axios';

function Objective() {
    const [objective,setobjective]=useState([]);

    const objectiveData = async () => {
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const objectiveDatas = response.data.filter(
                (item)=> item.status ==="Publish" && item.page_type ==="objective"
                
            );
            setobjective(objectiveDatas[0]);
        }catch (error){
            console.error("Errror on fetching data:", error);
        }
    };

    useEffect(() => {
        objectiveData();
    }, []);
    console.log(objective);

    const word = objective.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");
    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={ objective.slider_image }alt="background" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord}</big> {otherWords}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container flex flex-col items-center">
                    <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-8 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{objective.title}</h2>
                    <div data-aos="fade-right" data-aos-duration="1000" data-aos-once='true'>
                       <p dangerouslySetInnerHTML={{__html : objective.short_desc}}></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Objective;
