import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Brand = () => {
    const [formData, setFormData] = useState({ name: '', followers: 0, age: '', mobile: '', email: '', niche: '', likes: 0, comments: 0 });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("https://api.assetorix.com/media/brand/", formData)
        if (response.status == 201) {
            alert("Data sent successfully")
        } else {
            alert("Failed to send data")
        }
    }

    return (
        <div>
            <div className='sm:px-10 px-5 py-3 flex bg-[#BD5524] justify-between'>
                <div className='flex'>
                    <a href="https://unifie.in/"> <img src="./logo.webp" alt="unifie logo" className='w-20 ' /> </a>
                    <p className='ml-5 mt-2 text-white text-[16px] font-medium italic sm:block hidden'> " THE JOURNEY WILL START WHEN
                        <br />YOU REACH THE RIGHT SOLUTIONS "
                    </p>
                </div>

                <ul className='text-white flex items-center'>
                    <Link to = "/brand">
                        <li className='mx-4 text-[16px] font-semibold font-serif cursor-pointer'>
                            Brand
                        </li>
                    </Link>
                    <Link to = "/">
                        <li className='mx-4 text-[16px] font-semibold font-serif cursor-pointer'>
                            Influencer
                        </li>
                    </Link>
                </ul>
            </div>
            <div>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Name of your Brand</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Followers of influncer that you want</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Age of influncer</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Your Mobile Number</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Your Email Address</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Niche of your Brand</label>
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
                                <option value="gaming">Gaming</option>
                                <option value="entertainment">Entertainment</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Expected average Likes (Engagement)</label>
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
                            <label className="block text-gray-700 font-bold mb-2">Expected average Comments (Engagement)</label>
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
                        Send Request
                    </button>
                </form>
            </div>

        </div>
    )
}

export default Brand