import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.png'
import founder1 from '../assets/founder1.png' 
import founder2 from '../assets/founder2.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-12 pt-20 pb-10'>
      <Title text1={'ABOUT'} text2={'US'}/>
      
      {/* Main Content Section */}
      <div className='w-full flex items-center justify-center flex-col lg:flex-row px-4 lg:px-0'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img 
            src={about} 
            alt="About our company" 
            className='lg:w-4/5 w-5/6 shadow-lg shadow-black/50 rounded-sm hover:scale-105 transition-transform duration-300' 
          />
        </div>
        
        <div className='lg:w-1/2 w-5/6 flex flex-col gap-5 mt-5 lg:mt-0'>
          <p className='lg:w-4/5 w-full text-white text-sm md:text-base'>
            <span className='bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] text-transparent bg-clip-text font-bold'>
              AI product recommendations
            </span>, ShopAI offers a personalized shopping experience that saves time and effort. Our platform is designed to help you discover new products and trends.
          </p>
          
          <p className='lg:w-4/5 w-full text-white text-sm md:text-base'>
            Modern shoppers—combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform.
          </p>
          <span className='bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] text-transparent bg-clip-text '>
              Say these,better recommendations!
            </span>

          <span className='bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] text-transparent bg-clip-text font-bold'>
              ("suggest"  ,  "recommend"  ,  "i want"  ,  "what should i buy"  , "i need")
            </span>
          
          <h3 className='lg:w-4/5 w-full text-lg text-white lg:text-xl mt-2 font-bold'>Our Mission</h3>
          <p className='lg:w-4/5 w-full text-white text-sm md:text-base'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. ShopAI connects customers with trusted products and brands.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className='w-full flex flex-col items-center justify-center mt-10 px-4'>
        <Title text1={'OUR'} text2={'FOUNDERS'}/>
        
        <div className='w-full max-w-6xl flex flex-wrap justify-center gap-8 mt-8'>
          {/* Founder 1 */}
          <div className='w-full sm:w-5/6 md:w-2/5 flex flex-col items-center bg-gradient-to-br from-[#ffffff0a] to-[#ffffff05] p-6 rounded-lg border border-gray-700 hover:border-indigo-400 transition-all duration-300'>
            <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-400 mb-4'>
              <img 
                src={founder1} 
                alt="Founder 1" 
                className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
              />
            </div>
            <h3 className='text-xl font-bold text-white'>UDDHAV PAWAR</h3>
            <p className='text-indigo-300 mb-2'>MCA, NIT Raipur</p>
            <p className='text-gray-300 text-center text-sm'>
Architect of ShopAI built the backend infrastructure and intelligent recommendation engine with his expertise in AI and MERN stack.
           </p>
          </div>
          
          {/* Founder 2 */}
          <div className='w-full sm:w-5/6 md:w-2/5 flex flex-col items-center bg-gradient-to-br from-[#ffffff0a] to-[#ffffff05] p-6 rounded-lg border border-gray-700 hover:border-indigo-400 transition-all duration-300'>
            <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-400 mb-4'>
              <img 
                src={founder2} 
                alt="Founder 2" 
                className='w-full h-full object-cover hover:scale-110 transition-transform duration-300'
              />
            </div>
            <h3 className='text-xl font-bold text-white'>SAKSHI SOLANKI</h3>
            <p className='text-indigo-300 mb-2'>MCA, NIT Raipur</p>
            <p className='text-gray-300 text-center text-sm'>
 Crafts the seamless user experience of ShopAI with cutting-edge frontend technologies. 
        Implements the interfaces that bring our AI recommendations to life with intuitive design.            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='w-full flex flex-col items-center justify-center mt-10'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
        
        <div className='w-5/6 max-w-6xl flex flex-wrap justify-center gap-6 py-10'>
          {[
            {
              title: "Quality Assurance",
              description: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.",
              icon: "🔍"
            },
            {
              title: "Convenience",
              description: "Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.",
              icon: "⏱️"
            },
            {
              title: "Exceptional Service",
              description: "Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience.",
              icon: "💬"
            }
          ].map((item, index) => (
            <div 
              key={index}
              className='w-full sm:w-5/6 md:w-1/3 h-auto min-h-[250px] border border-gray-600 flex flex-col items-center justify-center gap-4 p-6 text-white backdrop-blur-sm bg-[#ffffff0b] hover:bg-[#ffffff15] transition-all duration-300 rounded-lg'
            >
              <span className='text-3xl'>{item.icon}</span>
              <h3 className='text-xl font-semibold text-[#bff1f9] text-center'>{item.title}</h3>
              <p className='text-gray-300 text-center text-sm'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      <NewLetterBox/>
    </div>
  )
}

export default About