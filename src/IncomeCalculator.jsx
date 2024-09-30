import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

// Register necessary components for ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const IncomeCalculator = () => {
    const [formData, setFormData] = useState({ name: '', instagramId: '', followers: 0, youtubeId: '', age: '', mobile: '', email: '', niche: '', likes: 0, comments: 0 });
    const [income, setIncome] = useState({ perPost: 0, monthly: 0 });
    const [showGraphs, setShowGraphs] = useState(false);
    const [baseRates, setBaseRate] = useState(1)

    const nicheFactors = {
        fashion: 1.5,
        beauty: 1.4,
        fitness: 1.3,
        tech: 1.6,
    };

    const baseRate = () => {
        if (formData.followers >= 10000) {
            setBaseRate(100);  // Maximum rate for 10k+ followers
        } else if (formData.followers >= 5000) {
            setBaseRate(80);
        } else if (formData.followers >= 2000) {
            setBaseRate(50);
        } else if (formData.followers >= 1000) {
            setBaseRate(30);
        } else if (formData.followers >= 500) {
            setBaseRate(20);
        } else if (formData.followers > 0) {
            setBaseRate(10);  // Minimum rate for followers between 1 and 499
        } else {
            setBaseRate(1);  // Base rate for no followers
        }
    };

    useEffect(() => {
        baseRate()
    }, [formData.followers, baseRates])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const followers = parseInt(formData.followers);
        const likes = parseInt(formData.likes || 1);
        const comments = parseInt(formData.comments || 1);
        const niche = formData.niche;

        // Engagement Rate
        const engagementRate = ((likes + comments) / followers) * 100;

        // Earnings per post calculation
        const earningsPerPost = ((followers / 1000) * baseRates * engagementRate * nicheFactors[niche]).toFixed(2);
        const monthlyIncome = (earningsPerPost * 4).toFixed(2); // Assuming 4 posts per month

        setIncome({
            perPost: earningsPerPost,
            monthly: monthlyIncome,
        });

        setShowGraphs(true);

        const sendData = async () => {
            const response = await axios.post("https://api.assetorix.com/media/list/", formData)
            if (response.status == 201) {
                alert("Data sent successfully")
            } else {
                alert("Failed to send data")
            }
        }
        sendData()
    };

    // Data for the Bar chart
    const barData = {
        labels: ['Earnings Per Post', 'Monthly Income'],
        datasets: [
            {
                label: 'Income in Rupees',
                data: [income.perPost, income.monthly],
                backgroundColor: ['#4CAF50', '#2196F3'],
            },
        ],
    };

    // Data for the Pie chart
    const pieData = {
        labels: ['Earnings Per Post', 'Monthly Income'],
        datasets: [
            {
                label: 'Income Distribution',
                data: [income.perPost, income.monthly],
                backgroundColor: ['#4CAF50', '#2196F3'],
            },
        ],
    };


    return (
        <>
            <div className='sm:px-10 px-5 py-3 flex bg-[#BD5524]'>
                <a href="https://unifie.in/"> <img src="./logo.webp" alt="unifie logo" className='w-20 ' /> </a>
               
                <p className='ml-5 mt-2 text-white text-[16px] font-medium italic sm:block hidden'> " THE JOURNEY WILL START WHEN
                    <br />YOU REACH THE RIGHT SOLUTIONS "
                </p>
            </div>

            <div className="container mx-auto p-6">
                <h1 className="text-4xl font-bold mb-6 text-center">Money Calculator how much you can earn by having followes.</h1>

                {/* Form to collect user data */}
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Instagram ID</label>
                            <input
                                type="text"
                                name="instagramId"
                                value={formData.instagramId}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Followers</label>
                            <input
                                type="number"
                                name="followers"
                                value={formData.followers}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Youtube Channel</label>
                            <input
                                type="text"
                                name="youtubeId"
                                value={formData.youtubeId}
                                onChange={handleChange}
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Mobile Number</label>
                            <input
                                type="number"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Niche</label>
                            <select
                                name="niche"
                                value={formData.niche}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[#BD5524]"
                            >
                                <option value="">Select Niche</option>
                                <option value="fashion">Fashion</option>
                                <option value="beauty">Beauty</option>
                                <option value="fitness">Fitness</option>
                                <option value="tech">Tech</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Likes (Engagement)</label>
                            <input
                                type="number"
                                name="likes"
                                value={formData.likes}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[[#BD5524]"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Comments (Engagement)</label>
                            <input
                                type="number"
                                name="comments"
                                value={formData.comments}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border rounded-md focus:outline-none focus:border-[[#BD5524]"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 bg-[#BD5524] text-white font-bold py-3 px-4 rounded-md hover:bg-[#974b28] transition duration-300"
                    >
                        Calculate Income
                    </button>
                </form>

                {/* Income Summary */}
                {showGraphs && (
                    <>
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-[#BD5524]">Estimated Sponser Ship Income:</h2>
                            <p className="text-lg">Earnings per Post:  ₹{income.perPost}</p>
                            <p className="text-lg">Monthly Income (4 posts):  ₹{income.monthly}</p>
                        </div>
                        <div className='flex sm:flex-row flex-col justify-between items-center'>
                            <div className='sm:w-[50%] w-[90%]'>
                                {/* Bar Chart */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-bold mb-4">Income Chart (Bar)</h3>
                                    <Bar data={barData} />
                                </div>
                            </div>
                            {/* Pie Chart */}
                            <div className='sm:w-[50%] w-auto flex ml-10'>
                                <div className="mb-6  sm:h-[350px] h-auto ">
                                    <h3 className="text-lg font-bold mb-4">Income Distribution (Pie)</h3>
                                    <Pie data={pieData} />
                                </div>
                            </div>

                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default IncomeCalculator;
