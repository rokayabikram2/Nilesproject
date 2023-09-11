import React,{useState,useEffect} from 'react';
import axios from 'axios';

const HighSkilled = () => {
    const [HighJOb,setHighJOb]= useState([])
    const [High,setHigh] =useState([])

    const HighSkillData = async () => {
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const HighJObDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Highly-skilled/job"
            );
            setHighJOb(HighJObDatas);
            const HighDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Highly-skilled"
            );
            setHigh(HighDatas[0]);
        }catch (error){
            console.error("Error on fetching data:", error);
        }
    };

    useEffect(() => {
        HighSkillData();

    }, []);

    const word = High.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");

    console.log(HighJOb);
    console.log(High);
    
    const ShowData = (props) => {
        const { imageUrl, title } = props;
        return (
            <div className='mb-4' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                <img className='h-56 w-full object-cover' src={imageUrl} alt={title.toLowerCase()} />
                <h4 className='text-xl font-semibold text-center'>{title}</h4>
            </div>
        )
    }
    return (
        <>
            <section className='py-20 relative'>
                <img className='absolute h-full w-full top-0 left-0 object-cover' src={ High.slider_image } alt="slider" />
                <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
                    <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord} </big> {otherWords}</h1>
                </div>
            </section>
            <section className="py-12">
                <div className="container flex flex-col items-center">
                    <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{High.title}</h2>
                    <div className='text-gray-700' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                        <p className='mb-2' dangerouslySetInnerHTML={{__html : High.short_desc}}></p>
                    </div>
                    <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-10 '>
                        {HighJOb.map((data) => (
                            <ShowData key={data.id} imageUrl={data.bannerimage} title={data.meta_title} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default HighSkilled;
