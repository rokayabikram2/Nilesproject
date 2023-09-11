import React,{useState,useEffect} from "react";
import axios from 'axios';

function WhoWeAre() {
    const [weAre, setWeAre] = useState([]);

    const weAreData = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/navigations/"
            );
            const whoWeAreData = response.data.filter((item, id) => {
                return item.page_type == "About/Who we are";
            });
            setWeAre(whoWeAreData[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        weAreData();
    }, []);
    console.log(weAre)

    
    // const word = weAre[0].name;
    // const words = word.split(' ')
    // const firstWord = words[0];
    // const otherWords = words.slice(1).join(' ');
    const word = weAre.name || "";
    const words = word.split(" ");
    const firstWord = words[0];
    const otherWords = words.slice(1).join(" ");
  

    return (
        <>
           
                <>
                    <section className="py-20 relative">
                        <img
                            className="absolute h-full w-full top-0 left-0 object-cover"
                            src={weAre.slider_image}
                            alt="background"
                        />
                        <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
                        <div
                            className="container py-12 relative z-20 mt-10"
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-once="true"
                        >
                            <h1 className="md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white">
                                    <big className="text-yellow-300">{firstWord} </big>{otherWords}
                            </h1>
                        </div>
                    </section>
                    <section className="py-12">
                        <div className="container grid md:grid-cols-2 grid-cols-1 gap-8">
                            <div
                                className="md:mb-0 mb-5"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                data-aos-once="true"
                            >
                                <h2 className="lg:text-4xl sm:text-3xl text-2xl font-bold">
                                    <big className="md:text-6xl sm:text-4xl text-3xl font-bold">
                                        {weAre.meta_title}
                                    </big>{" "}
                                    {weAre.meta_keyword}
                                </h2>
                                <p className="mb-2 mt-5 text-gray-700" dangerouslySetInnerHTML={{__html:weAre.short_desc}}>
                                
                                </p>
                             
                            </div>
                            <div
                                className="image-shape"
                                data-aos="zoom-in"
                                data-aos-duration="1000"
                                data-aos-once="true"
                            >
                                <img
                                    className="h-[450px] w-full object-cover"
                                    src={weAre.bannerimage}
                                    alt="image"
                                />
                            </div>
                        </div>
                    </section>
                </>;
            
        </>
    );
}

export default WhoWeAre;
