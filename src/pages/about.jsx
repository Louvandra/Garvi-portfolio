import React from 'react';
import AboutImage from "../assets/images/profil2.jpeg";
const About = () => {
  return (
    <div className="about bg-gray-500 grid md:grid-cols-2 grid-cols-1 items-center md:gap-30 gap-10 mb:pt-20 pt-32" >
          <div className="box md:order-1 order-2  flex justify-center">
          <img src={AboutImage} alt="About Image" className="rounded-full border-8 border-gray-300  w-[450px]  md:m-0 mx-auto"/>
          </div>
          <div className="box md:order-2 order-1">
          <h1 className="lg:text-5xl/tight font-bold mb-7">I'm Louvandra</h1>
          <p className="text-base/loose font-semibold">seorang Full Stack Developer yang memiliki keahlian mendalam dalam frontend development,
            backend development, serta desain UI/UX. Dalam frontend development,
             mahir menggunakan teknologi seperti HTML, CSS, JavaScript, dan framework modern seperti React atau Vue.js untuk menciptakan antarmuka yang responsif dan
             interaktif. Dalam backend development, Saya juga memiliki pemahaman yang baik tentang prinsip-prinsip UI/UX design, 
            memastikan aplikasi yang Anda kembangkan tidak hanya fungsional tetapi juga intuitif dan user-friendly.</p>
          
        
          <div className="social-footer space-x-5">
        <i className="ri-facebook-circle-fill text-5xl"></i>
        <i className="ri-twitter-fill text-5xl"></i>
        <i className="ri-youtube-fill text-5xl"></i>
        <i className="ri-linkedin-box-fill text-5xl"></i>
        <i className="ri-reddit-fill text-5xl"></i>
        </div>
          </div>
          </div>
  );
};

export default About;
