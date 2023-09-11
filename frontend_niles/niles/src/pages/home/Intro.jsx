import React ,{useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Intro() {
    const [intro, setIntro] = useState([])
    
    const [parentId, setParentId] = useState(null);

    const [navigation, setNavigation] = useState([]);

    const IntroData = async () =>{
        try{
            const response = await axios.get('http://127.0.0.1:8000/api/navigations/')
            const whoWeAreData = response.data.filter((item, id)=>{
                
                    return item.page_type == "who we are"
            })
            setIntro(whoWeAreData[0])
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
            

        }catch(error){
            console.error("Error fetching data:", error);


        }

    }

    useEffect(() => {
        IntroData();

    },[parentId]);
    // console.log(intro)

    return (
        <section className='py-12'>
            <div className='container flex flex-col items-center'>
                <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold text-center pb-2 mb-6 relative pseudo-border' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{intro.name}</h2>
                <div data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                    <h3 className='text-center md:text-2xl sm:text-xl text-lg font-bold'>{intro.title}</h3>
                   
                    <p className='text-gray-700 mb-5' dangerouslySetInnerHTML={{__html:intro.desc}}></p>
                    {navigation[navigation?.findIndex(item => item?.id === 31)] &&(
                    <Link to="/WhoWeAre" className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600'>Read More <i className="fa fa-chevron-right ms-1"></i></Link>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Intro;
