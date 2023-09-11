import React, {useState,useEffect} from 'react';
import axios from 'axios';

function Contact() {
  const [contacts,setContacts] = useState([]);
  const contactData= async () =>{
    try {
        const response = await axios.get(
            "http://127.0.0.1:8000/api/navigations/"
        );
        
        const contactsDatas = response.data.filter(
            (item) => item.status ==="Publish" && item.page_type ==="contact us"

        );
        setContacts(contactsDatas[0]);

    
    }catch (error){
        console.error("Error on fetching data:",error);


    }

  };


  const [successMessage, setSuccessMessage] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile : '',
    subject: '',
    message: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/contacts/",  // Update with your Django API endpoint
            formData
        );
        
        // Display success message
        // setSuccessMessage(alert("Contact form submitted successfully!"));
        setSuccessMessage("Contact form submitted successfully!");

        
        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            mobile: '',
            subject: '',
            message: ''
        });

        // Clear error message
        // setErrorMessage('');

    }catch (error) {
      console.error("Error on fetching data:", error);
  
        // Display error message
        // setErrorMessage("Error submitting contact form. Please try again.");

        // Clear success message
        // setSuccessMessage('');
    }
};

useEffect(() => {
  contactData();

},[]);
// console.log(contacts);

const word = contacts.name || "";
const words = word.split(" ");
const firstWord = words[0];
const otherWords = words.slice(1).join(" ");


  return (
    <>
      <section className='py-20 relative'>
        <img className='absolute h-full w-full top-0 left-0 object-cover' src={contacts.slider_image} alt="background" />
        <div className="bg-gradient-to-t from-black to-transparent opacity-50 absolute w-full z-10 h-full top-0 left-0"></div>
        <div className="container py-12 relative z-20 mt-10" data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true'>
          <h1 className='md:text-6xl sm:text-4xl text-3xl font-extrabold text-center text-white'><big className='text-yellow-300'>{firstWord} </big>{otherWords}</h1>
        </div>
      </section>
      <section className='py-12'>
            <div className="container grid md:grid-cols-2 grid-cols-1 gap-6">
                <div className='shadow-[0_0_20px_2px_rgba(0,0,0,0.2)] p-5 rounded-xl md:mb-0 mb-6' data-aos="zoom-in" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                    <h2 className='md:text-2xl text-xl font-semibold mb-4'>{contacts.title}</h2>
                    <form onSubmit={handleSubmit}>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                        {/* {errorMessage && <p className="text-red-500">{errorMessage}</p>} */}
                        <div className='flex flex-col items-start'>
                            <label className='mb-1 relative' htmlFor="name">Name<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                            <input className='p-3 bg-gray-200 rounded focus:outline outline-sky-500 w-full' type="text" id='name' value={formData.name} onChange={handleInputChange} name='name' placeholder='Your Name' required />
                        </div>
                        <div className='flex flex-col items-start my-4'>
                            <label className='mb-1 relative' htmlFor="email">Email<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                            <input className='p-3 bg-gray-200 rounded focus:outline outline-sky-500 w-full' type="email" id='email' value={formData.email}  onChange={handleInputChange} name='email' placeholder='Your Email' required />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label className='mb-1 relative' htmlFor="mobile">Mobile No.<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                            <input className='p-3 bg-gray-200 rounded focus:outline outline-sky-500 w-full' type="tel" id='mobile' value={formData.mobile}  onChange={handleInputChange} name='mobile' placeholder='Your Mobile No.' required />
                        </div>
                        <div className='flex flex-col items-start my-4'>
                            <label className='mb-1 relative' htmlFor="subject">Subject<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                            <input className='p-3 bg-gray-200 rounded focus:outline outline-sky-500 w-full' type="text" id='subject' value={formData.subject} onChange={handleInputChange} name='subject' placeholder='Subject' required />
                        </div>
                        <div className='flex flex-col items-start'>
                            <label className='mb-1 relative' htmlFor="message">Message<i className="fa-sharp fa-solid fa-star absolute top-1.5 right-[-8px] text-red-600" style={{ fontSize: '5px' }}></i></label>
                            <textarea className='p-3 bg-gray-200 focus:outline outline-sky-500 w-full' type="text" id='message' value={formData.message} onChange={handleInputChange} name='message' rows='5' placeholder='Your Message' required />
                        </div>
                        <input className='bg-sky-500 text-white py-2 px-3 rounded hover:bg-sky-600 hover:border hover:border-sky-600 cursor-pointer my-3' type="submit" value='SUBMIT' />
                    </form>
                    {/* <script src =" https://smtpjs.com/v3/smtp.js"></script>
                    <script>
                      function sendEmail(){
                          Email.send({
                            Host : "smtp.elasticemail.com",
                            Username : "username",
                            Password : "password",
                            To : 'them@website.com',
                            From : "you@isp.com",
                            Subject : "This is the subject",
                            Body : "And this is the body"
                          }).then(
                          message => alert(message)
                          )

                      }
                    </script> */}
                </div>
                <div>
                    <div className='mb-6' data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                        {/* <h3 className='md:text-xl text-lg font-semibold mb-4'>Nile International Manpower Agency Pvt. Ltd.</h3>
                        <span className="flex items-center font-regular text-gray-700">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            <p>Sinamangal, Kathmandu, Nepal</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700 my-2">
                            <i className="fa-solid fa-mobile me-2"></i>
                            <p>+977-9851051559</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700">
                            <i className="fa-solid fa-phone me-2"></i>
                            <p>+977-1-4599491,4578036</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700 my-2">
                            <i className="fa-solid fa-fax me-2"></i>
                            <p>00977-1-4594529</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700">
                            <i className="fa-solid fa-envelope me-2"></i>
                            <p>nileintl@wlink.com.np,<br /> nileintl1@gmail.com,<br />nileintl2008@yahoo.com</p>
                        </span> */}
                         <p dangerouslySetInnerHTML={{__html : contacts.desc}}></p>

                    </div>
                    <div data-aos="fade-right" data-aos-duration="1000" data-aos-once='true' data-aos-delay='200'>
                      <p dangerouslySetInnerHTML={{__html : contacts.short_desc}}></p>
                        {/* <h3 className='md:text-xl text-lg font-semibold mb-4'>Nile International Technical Training Center</h3>
                        <span className="flex items-center font-regular text-gray-700">
                            <i className="fa-solid fa-location-dot me-2"></i>
                            <p>Sinamangal, Kathmandu, Nepal</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700 my-2">
                            <i className="fa-solid fa-phone me-2"></i>
                            <p>+977-1-4594529</p>
                        </span>
                        <span className="flex items-center font-regular text-gray-700">
                            <i className="fa-solid fa-envelope me-2"></i>
                            <p>trainingnile@gmail.com</p>
                        </span> */}
                    </div>
                </div>
            </div>
        </section>
      <section className='py-4'>
        <iframe className="w-full border-2" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.601159402349!2d85.34929757393606!3d27.698719425874703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1986e9bdcec3%3A0x54389fea89ce22e5!2sNile%20International%20Manpower%20Agency%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1690868161348!5m2!1sen!2snp" allowFullScreen="" loading="lazy" height='300px' referrerPolicy="no-referrer-when-downgrade"></iframe>
      </section>

    </>
  )
}

export default Contact;
