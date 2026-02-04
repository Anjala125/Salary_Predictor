import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AiFillDashboard, AiOutlineFileText, AiOutlineGlobal, AiOutlineMessage, AiOutlineUser} from 'react-icons/ai';

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [predictionData, setPredictionData] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('latest_prediction');
    if (stored) {
      const parsed = JSON.parse(stored);
      setPredictionData(parsed);
    } 
    else if (location.state?.predictionData) {
      setPredictionData(location.state.predictionData);
    }
  }, [location]);
//  chart
  const chartData = predictionData &&[
    {
      year: '2023',
      salary: parseInt(predictionData.salary2023) || 0
    },
    {
      year: '2024',
      salary: parseInt(predictionData.salary2024) || 0
    },
    {
      year: '2025',
      salary: parseInt(predictionData.salary2025) || 0
    },
    {
      year: '2026',
      salary: parseInt(predictionData.salary2026) || 0
    }
  ];

  return (
    <div className="min-h-screen flex bg-[#0b0f2f] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0f1535] hidden md:flex flex-col p-6">
        <h1 className="text-xl font-bold mb-10">VISION </h1>

        <nav className="space-y-4 text-gray-300">
          <p onClick={()=>{navigate('/dashboard')}} className="hover:text-white cursor-pointer flex items-center gap-3"> <AiFillDashboard size={22} /><span>DASHBOARD</span></p>
          <p onClick={()=>{navigate('/predictionform')}} className="hover:text-white cursor-pointer flex items-center gap-3"> <AiOutlineFileText size={22} /><span>SALARY PREDICTION</span></p>
          <p className="hover:text-white cursor-pointer flex items-center gap-3"> <AiOutlineGlobal size={22} /><span>OPPORTUNITY HUB</span></p>
          <p className="hover:text-white cursor-pointer flex items-center gap-3"> <AiOutlineMessage size={22} /><span>AI CHATBOT</span></p>
          <p onClick={()=>{navigate('/profile')}} className="hover:text-white cursor-pointer flex items-center gap-3"><AiOutlineUser size={22} /><span>PROFILE</span></p>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 space-y-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">DASHBOARD</h2>
        </div>

        {/* GRID START */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* WELCOME CARD */}
          <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6">
            <p className="text-sm text-gray-200">Welcome back,</p>
            <h3 className="text-2xl font-bold mt-2">{userData?.name || 'User'}</h3>
            <p className="text-sm mt-4 text-gray-100">
              Predict salaries and explore insights.
            </p>
          </div>

          {/* SALARY SUMMARY */}
          <div className="lg:col-span-2 bg-[#111636] rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Salary Overview</h4>

            {predictionData ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1f4a] p-4 rounded-xl">
                  <p className="text-sm text-gray-400">2026 (Current)</p>
                  <p className="text-lg font-bold">
                    ₹{predictionData.salary2026}
                  </p>
                </div>

                <div className="bg-[#1a1f4a] p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Experience</p>
                  <p className="text-xl font-bold">{predictionData.experience} Years</p>
                </div>

                <div className="bg-[#1a1f4a] p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Role</p>
                  <p className="text-lg font-bold">{predictionData.role}</p>
                </div>

                <div className="bg-[#1a1f4a] p-4 rounded-xl">
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-lg font-bold">{predictionData.location}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>No prediction data available.</p>
                <button 
                  onClick={() => navigate('/predictionform')}
                  className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  Make a Prediction
                </button>
              </div>
            )}
          </div>
        </div>

        {/* SECOND ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* INSIGHTS */}
          <div className="bg-[#111636] rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Insights</h4>
            {predictionData ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">
                  <strong>Education:</strong> {predictionData.education}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Skills:</strong> {predictionData.skills}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No insights available yet. Make a salary prediction to see insights.
              </p>
            )}
          </div>

          {/* SALARY TRENDS - All 4 years */}
          <div className="lg:col-span-2 bg-[#111636] rounded-2xl p-6">
            <h4 className="font-semibold mb-4">Salary Trends (2023-2026)</h4>
            {predictionData && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#1a1f4a] p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-400 mb-2">2023</p>
                  <p className="text-xl font-bold text-purple-400">₹{predictionData.salary2023}</p>
                </div>
                
                <div className="bg-[#1a1f4a] p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-400 mb-2">2024</p>
                  <p className="text-xl font-bold text-blue-400">₹{predictionData.salary2024}</p>
                </div>
                
                <div className="bg-[#1a1f4a] p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-400 mb-2">2025</p>
                  <p className="text-xl font-bold text-green-400">₹{predictionData.salary2025}</p>
                </div>
                
                <div className="bg-[#1a1f4a] p-4 rounded-xl text-center">
                  <p className="text-xs text-gray-400 mb-2">2026</p>
                  <p className="text-xl font-bold text-yellow-400">₹{predictionData.salary2026}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CHART SECTION */}
        {predictionData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LINE CHART */}
            <div className="bg-[#111636] rounded-2xl p-6">
              <h4 className="font-semibold mb-4">Salary Growth Trend</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f4a" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis dataKey="salary" stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1f4a', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Line 
                    type="linear" 
                    dataKey="salary" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* BAR CHART */}
            <div className="bg-[#111636] rounded-2xl p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1f4a" />
                  <XAxis dataKey="year" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1f4a', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="salary" 
                    fill="#3b82f6"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Dashboard
