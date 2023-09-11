import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PageNotFound from '../../components/PageNotFound';




function Work() {
    const [work, setWork] = useState([])

    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);

    const workData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const workDatas = response.data.filter(
                (item) => item.status === "Publish" && item.page_type === "what we do"

            );
            setWork(workDatas);
            const navigationResponse = await axios.get(
                "http://127.0.0.1:8000/api/navigations/",
                {
                    params: {
                        parent_id: parentId,      // Set the parentId as a parameter
                        page_type: "Group"        // Filter by page_type
                    }
                }
            );

            if (navigationResponse.data) {
                const navigationData = navigationResponse.data.filter(
                    (item) => item.status === "Publish"
                );

                setNavigation(navigationData);
            }


        } catch (error) {
            console.error("Error on fetching data:", error);


        }

    };
    useEffect(() => {
        workData();

    }, [parentId]);
    // console.log(work)


    const ShowData = (props) => {
        const { imageUrl, title, description, id } = props;

        let url;
        if (id === 18) {
            url = '/RecruitmentProcess'
        }
        else if (id === 21) {
            url = '/IndustryExpertise'
        }
        else if (id === 20) {
            url = '/ClientCandidateMatching'
        }
        console.log("Item ID:", id);
        return (
            <div className='relative' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-deay='200'>
                <img className='h-full w-full top-0 left-0 absolute rounded-l-3xl rounded-ee-3xl' src={imageUrl} alt="background-images" />
                <div className="absolute w-full h-full rounded-l-3xl rounded-ee-3xl top-0 left-0 bg-black opacity-60"></div>
                <div className='relative z-10 text-white px-3 py-6'>
                    <h3 className='text-xl font-semibold mb-1'>{title}</h3>
                    <p className='mb-6'>{description}</p>
                    {navigation[navigation?.findIndex(item => item?.id === 67 || item?.id === 68 || item?.id === 69)] && (
                        <Link to={url} className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>Read More <i className="fa fa-chevron-right ms-1"></i></Link>
                    )}

                </div>
            </div>
        )
    }
    return (
        <section className='py-12 relative'>
            <div className='container flex flex-col items-center relative'>
                <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold text-center pb-2 mb-6 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>What We Do</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                    {work.map((data) => (
                        data.status === 'Draft' ? (
                            <PageNotFound key={data.id} />
                        ) :
                            (<ShowData key={data.id} imageUrl={data.bannerimage} title={data.name} description={data.desc} id={data.id} />)
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Work;