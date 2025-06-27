import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Recommendations = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.recommendations) {
    return (
      <div className="min-h-screen bg-[#0d2026] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#1a3a44] rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">No recommendations found</h2>
          <p className="text-gray-300 mb-6">We couldn't find matches for your request</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] text-white rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { recommendations, userQuery, summary } = state;

  const handleProductSelect = (product) => {
    toast.success(`Selected: ${product.name}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="min-h-screen bg-[#0d2026] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9]">
            Your Perfect Matches
          </h1>
          <p className="text-lg text-gray-300">
            Showing results for: <span className="font-semibold text-[#12c2e9]">"{userQuery}"</span>
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendations.map((product, index) => (
            <div 
              key={index} 
              className="bg-[#1a3a44] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-[#0d5369] to-[#12c2e9] flex items-center justify-center">
                <span className="text-white text-xl font-bold">ShopAi's top pick for you</span>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <span className="inline-block bg-[#0d5369] text-cyan-200 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <p className="mt-3 text-gray-300">{product.description}</p>
                
                <div className="mt-4 flex items-center">
                  <span className="text-sm text-cyan-300">{product.reason}</span>
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleProductSelect(product)}
                  className="w-full py-3 bg-gradient-to-r from-[#f64f59] via-[#c471ed] to-[#12c2e9] text-white rounded-lg hover:opacity-90 transition-all"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-transparent text-cyan-300 border border-cyan-300 rounded-lg hover:bg-cyan-900/30 transition-colors duration-300"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;