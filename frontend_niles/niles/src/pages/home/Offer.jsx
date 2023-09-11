import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Offer() {
    const [offer,setWeOffer] = useState([]);

    const ShowData = (props) => {
        const { imageUrl, title, id } = props;
        return (
            <div className='mb-6' data-aos="flip-up" data-aos-duration="1000" data-aos-once='true'>
                <Link to={`/Offer/${id}`} className="block relative after:absolute after:h-full after:w-0 after:content-['View_Details'] after:top-0 after:left-0 after:opacity-0 after:bg-yellow-500 after:text-white after:text-[30px] after:flex after:justify-center after:items-center after:transition-all after:duration-[0.4s] after:ease-in-out hover:after:opacity-[0.85] hover:after:w-full">
                    <img className='h-64 w-full object-cover' src={imageUrl} alt="image" />
                </Link>
                <h3 className='text-center text-xl text-yellow-400 font-bold mt-4'>{title}</h3>
            </div>
        )
    }


    const offerData= async () =>{
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const offerDatas = response.data.filter(
                (item) => item.status ==="Publish" && item.page_type ==="what we offer"

            );
            setWeOffer(offerDatas);

        
        }catch (error){
            console.error("Error on fetching data:",error);


        }

    };
    useEffect(() => {
        offerData();

    },[]);
    console.log(offer)

    const heading = offer[0] ? offer[0].caption: '';
    const background = offer[0] ? offer[0].back_image : '';

    return (
        <section className='py-12 relative'>
            <img className='absolute w-full h-full top-0 left-0' src={background} alt="background-images" />
            <div className="bg-black opacity-80 absolute w-full h-full top-0 left-0"></div>
            <div className='container flex flex-col items-center relative z-10'>
                <h2 className='lg:text-4xl sm:text-3xl text-2xl font-bold text-center pb-2 mb-8 relative pseudo-border text-white' data-aos="fade-up" data-aos-duration="1000" data-aos-once='true'>{heading}</h2>
                <div className='grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                    {offer.map((data) => (
                        <ShowData key={data.id} imageUrl={data.bannerimage} title={data.name} id={data.id} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Offer;
