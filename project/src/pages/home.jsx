import React from 'react';
import HeroImage from "../assets/images/profil.jpeg";
const Home = () => {
  return (
    <div className="homepage pb-10 bg-gray-500">
      <div className="container mx-auto px-4 ">
        <div className="hero grid md:grid-cols-2 grid-cols-1 items-center md:gap-20 gap-10 pt-32">
          <div className="box">
          <h1 className="lg:text-5xl/tight font-bold mb-7 ">Hi, I'm Louvandra, </h1>
          <h1 className="lg:text-5xl/tight animate-typing overflow-hidden whitespace-nowrap border-r-4 font-bold mb-7 text-sky-400 ">Frontend Development.</h1>
            <p className="text-base/8 mb-7 font-semibold">seorang Full Stack Developer yang memiliki keahlian mendalam dalam frontend development,
            backend development, serta desain UI/UX. Dalam frontend development . mahir menggunakan teknologi seperti HTML, CSS, JavaScript, dan framework</p>
            <a href="#about" className="bg-sky-400 hover:bg-sky-500 transition-alll py-2 px-4 text-white shadaw rounded-full">Tentang Saya <i className="ri-eye-line ms-1"></i></a> <br></br>
              <br></br></div>
          <div className="box">
            <img src={HeroImage} alt="Hero Image" className="rounded-full  border-8 border-gray-300  md:w-[450px] md:m-0 "/>
          </div>
           </div>
            </div>
            </div>
            
            
  );
};

export default Home;
