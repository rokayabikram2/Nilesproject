import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Categories() {
    const [unskillJOb,setunSkillJob]= useState([])
    const [unskill,setUnskill] =useState([])
    const [skillJOb, setSkillJob] = useState([])
    const [skill, setskill] = useState([])
    const [semiJOb,setSemiJob]= useState([])
    const [semiskill,setSemiskill] =useState([])
    const [HighJOb,setHighJOb]= useState([])
    const [High,setHigh] =useState([])
    

    const categoriesData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const skillJObDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "skilled/job"
            );
            setSkillJob(skillJObDatas);
            const skillDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "skilled"
            );
            setskill(skillDatas[0]);
            const semiJObDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="semi-skilled/job"
            );
            setSemiJob(semiJObDatas);
            const semiskillDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="semi-skilled"
            );
            setSemiskill(semiskillDatas[0]);
            const unskillJobDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Unskilled/job"
            );
            setunSkillJob(unskillJobDatas);
            const unskillDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Unskilled"
            );
            setUnskill(unskillDatas[0]);
            const HighJObDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Highly-skilled/job"
            );
            setHighJOb(HighJObDatas);
            const HighDatas =response.data.filter (
                (item)=> item.status ==="Publish" && item.page_type ==="Highly-skilled"
            );
            setHigh(HighDatas[0]);
        } catch (error) {
            console.error("Error on fetching data:", error);
        }
    };

    useEffect(() => {
        categoriesData();

    }, []);

    // console.log(skillJOb);
    // console.log(skill);

    
   
    return (
        <>
            {/* ---unskilled area--- */}
            <section className='py-12 relative'>
                <img className='absolute top-0 left-0 h-full w-full z-[-2]' src={unskill.back_image} alt="background" />
                <div className='bg-black absolute w-full h-full top-0 left-0 z-[-1] opacity-75'></div>
                <div className="container">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className='flex flex-col md:items-start items-center md:mb-0 mb-5'>
                            <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 text-white relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{unskill.title}</h2>
                            <div className='text-white' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                <p className='mb-5' dangerouslySetInnerHTML={{ __html: unskill.short_desc }}></p>
                                <Link to="/Unskilled" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>View More <i className="fa fa-chevron-right ms-1"></i></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {unskillJOb.slice(0,4).map((jobItem) => (
                                <div className='mb-4' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                    <img className='h-56 w-full object-cover' src={jobItem.bannerimage} alt={jobItem.meta_title} />
                                    <h4 className='text-xl font-semibold text-center text-yellow-400'>{jobItem.meta_title}</h4>
                                </div>
                            ))}
                          
                        </div>
                    </div>
                </div>
            </section>
            {/* ---semi-skilled area--- */}
            <section className='py-12 relative'>
                <img className='absolute top-0 left-0 h-full w-full z-[-2]' src={semiskill.back_image} alt="background" />
                <div className='bg-black absolute w-full h-full top-0 left-0 z-[-1] opacity-75'></div>
                <div className="container">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className='flex flex-col md:items-start items-center md:mb-0 mb-5'>
                            <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 text-white relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{semiskill.title}</h2>
                            <div className='text-white' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                <p className='mb-5' dangerouslySetInnerHTML={{ __html: semiskill.short_desc }}></p>
                                <Link to="/SemiSkilled" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>View More <i className="fa fa-chevron-right ms-1"></i></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {semiJOb.slice(0,4).map((jobItem) => (
                                <div className='mb-4' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                    <img className='h-56 w-full object-cover' src={jobItem.bannerimage} alt={jobItem.meta_title} />
                                    <h4 className='text-xl font-semibold text-center text-yellow-400'>{jobItem.meta_title}</h4>
                                </div>
                            ))}
                          
                        </div>
                    </div>
                </div>
            </section>
            {/* ---skilled area--- */}
            <section className='py-12 relative'>
                <img className='absolute top-0 left-0 h-full w-full z-[-2]' src={skill.back_image} alt="background" />
                <div className='bg-black absolute w-full h-full top-0 left-0 z-[-1] opacity-75'></div>
                <div className="container">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className='flex flex-col md:items-start items-center md:mb-0 mb-5'>
                            <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 text-white relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{skill.title}</h2>
                            <div className='text-white' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                <p className='mb-5' dangerouslySetInnerHTML={{ __html: skill.short_desc }}></p>
                                <Link to="/Skilled" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>View More <i className="fa fa-chevron-right ms-1"></i></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {skillJOb.slice(0,4).map((jobItem) => (
                                <div className='mb-4' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                    <img className='h-56 w-full object-cover' src={jobItem.bannerimage} alt={jobItem.meta_title} />
                                    <h4 className='text-xl font-semibold text-center text-yellow-400'>{jobItem.meta_title}</h4>
                                </div>
                            ))}
                          
                        </div>
                    </div>
                </div>
            </section>
            {/* ---high-skilled area--- */}
            {/* <section className='py-12 relative'>
                <img className='absolute top-0 left-0 h-full w-full z-[-2]' src={High.back_image} alt="background" />
                <div className='bg-black absolute w-full h-full top-0 left-0 z-[-1] opacity-75'></div>
                <div className="container">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                        <div className='flex flex-col md:items-start items-center md:mb-0 mb-5'>
                            <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold pb-2 mb-6 text-white relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{High.title}</h2>
                            <div className='text-white' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                <p className='mb-5' dangerouslySetInnerHTML={{ __html: High.short_desc }}></p>
                                <Link to="/HighSkilled" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>View More <i className="fa fa-chevron-right ms-1"></i></Link>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-3'>
                            {HighJOb.slice(0,4).map((jobItem) => (
                                <div className='mb-4' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                                    <img className='h-56 w-full object-cover' src={jobItem.bannerimage} alt={jobItem.meta_title} />
                                    <h4 className='text-xl font-semibold text-center text-yellow-400'>{jobItem.meta_title}</h4>
                                </div>
                            ))}
                          
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Categories;
