import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import open from "../assets/open.mp3"
import axios from 'axios'
import { userDataContext } from '../context/UserContext';



function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  let openingSound = new Audio(open)
  let serverUrl = "https://shopai-rr1q.onrender.com"
  const { getCurrentUser, userData, setUserData } = useContext(userDataContext);
  const [isGenerating, setIsGenerating] = useState(false);

  
 const getRecommendations = async (transcript) => {
  setIsGenerating(true);
  try {
    speak("Finding clothing options for you...");
    
    const response = await axios.post(`${serverUrl}/api/recommendations`, {
      userNeeds: transcript
    }, { 
      withCredentials: true,
      timeout: 8000
    });

    if (response.data?.success && response.data.recommendations?.length > 0) {
      const products = response.data.recommendations;
      
      // Create natural speech without prices
      const productList = products.map((p, i) => 
        `${i+1}. ${p.name}`
      ).join(", ");
      
      speak(`I found these options for "${transcript}": ${productList}. Showing details now.`);
      
      navigate("/recommendations", { 
        state: { 
          recommendations: products,
          userQuery: transcript,
          summary: `Matches for "${transcript}"`
        }
      });
      
    } else {
      speak("I found some options but couldn't get details. Try describing what you need differently.");
    }
    
  } catch (error) {
    console.error("Recommendation error:", error);
    speak("Sorry, I'm having trouble with recommendations right now. Please try again later.");
    
    if (error.response?.status === 429) {
      // Show visual feedback for rate limits
      showToast("Too many requests. Please wait a moment.");
    }
  } finally {
    setIsGenerating(false);
  }
};


  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      console.log(result.data);

      // Clear user data from context
      setUserData(null); // <-- This is crucial to update the UI



      // Redirect to login page
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }


  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()
  if (!recognition) {
    console.log("not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();
    if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collection")
    }
    else if (
  transcript.toLowerCase().includes("recommend") || 
  transcript.toLowerCase().includes("suggest") || 
  transcript.toLowerCase().includes("what should i buy")||
  transcript.toLowerCase().includes("i want") ||
  transcript.toLowerCase().includes("i need")
) {
  if (transcript.toLowerCase().includes("recommend") || 
      transcript.toLowerCase().includes("suggest") ||
      transcript.toLowerCase().includes("i want") ||
      transcript.toLowerCase().includes("looking for")) {
    getRecommendations(transcript);
    setShowSearch(false);
  }
}
    else if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)

    }
    else if (transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")) {
      speak("opening collection page")
      navigate("/collection")
    }
    else if (transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
      speak("opening about page")
      navigate("/about")
      setShowSearch(false)
    }
    else if (transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")) {
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
    }
    else if (transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat") || transcript.toLowerCase().includes("caat")) {
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false)
    }
    else if (transcript.toLowerCase().includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
    }

    else if (transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("orders") || transcript.toLowerCase().includes("my order")) {
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false)
    }
    else if (
      transcript.toLowerCase().includes("logout") ||
      transcript.toLowerCase().includes("sign out") ||
      transcript.toLowerCase().includes("log out") ||
      transcript.toLowerCase().includes("signout")
    ) {
      speak("Logging you out");
      handleLogout();
      setShowSearch(false);
    }
    else {
      toast.error("Try Again")
    }

  }
  recognition.onend = () => {
    setActiveAi(false)
  }
  return (
    <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] ' onClick={() => {
      recognition.start();
      openingSound.play()
      setActiveAi(true)
    }}>
      <img src={ai} alt="" className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 ' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} style={{
        filter: ` ${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
      }} />
    </div>
  )
}

export default Ai
