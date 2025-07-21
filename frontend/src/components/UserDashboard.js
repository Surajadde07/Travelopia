import React, { useEffect, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import Sidebar from './Slidebar';
import ResortCard from './ResortCard';
import PackageCard from './PackageCard';
import myVideo from '../assets/Userdashvideo.mp4';
import globevideo from '../assets/Globe.mp4';
import ManyAeroplane from '../assets/Plane.png';
import adventure from '../assets/Adventure.jpg';
import religious from '../assets/Religious-place.jpg';
import historical from '../assets/historical.png';
import romantic from '../assets/romantic.png';
import { Link } from 'react-router-dom';
import axios from 'axios';


function User_dashboard() {
  const [tours, setTours] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState(""); // State for the username
  const token = localStorage.getItem('token');

  // Fetch all tours, wishlist, and user details
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tours
        const toursResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTours(toursResponse.data);

        // Fetch wishlist
        const wishlistResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/wishlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWishlist(wishlistResponse.data.wishlist.map((tour) => tour._id));

        // Fetch user details
        const userResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(userResponse.data.username); // Set the username
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Handle search input change
  const handleSearch = async (event) => {
    setSearchQuery(event.target.value);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/dashboard/search?query=${event.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTours(response.data);
    } catch (error) {
      console.error("Error searching tours:", error);
    }
  };

  return (
    <div className='flex-col bg-sky-50 items-center justify-center w-screen h-auto relative overflow-x-hidden'>
      {/* Header */}
      <div className='bg-[#00a7c7] h-[18%] w-full flex items-center justify-between px-5 relative'>
        <div className="bg-repeat w-full h-full absolute flex justify-start left-[17.3rem] top-[-4.4rem]">
          <img src={ManyAeroplane} alt="" className='tanisha h-[15rem] w-[30rem]' />
        </div>

        <h1 className='logo text-[4.5rem] font-extrabold text-white w-[20%]'>Travelopia</h1>
        <div className='flex gap-3 justify-center items-center'>
          <div className='flex w-[100%] h-[2.7rem] px-2 py-1 rounded-md bg-white'>
            <IoMdSearch className='text-xl text-gray-400 w-[15%] bg-white h-full' />
            <input
              type="text"
              className='w-[80%] h-full outline-none'
              placeholder='Search'
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex items-center w-[170px] flex-col ">
            <Link
              to="/login/userdashboard/userprofile"
              className="bg-[#0044C7] border-white border-[2px] h-[2rem] w-[2rem] rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md hover:bg-[#0046c78a] cursor-pointer"
            >
              {username.charAt(0).toUpperCase()} {/* Display the first letter of the username */}
            </Link>

            <div className=" rounded-md capitalize text-white font-semibold">{username}</div> {/* Display the username */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full min-h-screen overflow-hidden flex'>
        <div className="flex w-full h-auto mt-8 gap-5">
          <div className="w-[220px]">
            <Sidebar />
          </div>

          <div className="flex h-full scroll-smooth overflow-y-visible ">
            <div className="flex-1 w-full">
              <h2 className="text-6xl pt-3 flex justify-center  items-center popular pb-5 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Popular Destinations</h2>
              <section className="mb-5 ">
                <div className="flex gap-6 mt-2 overflow-x-auto px-4">
                  <Link to="/userdashboard/adventuretours"><ResortCard title="Adventure Tours" rating="4.8" image={adventure} /></Link>
                  <Link to="/userdashboard/religioustours"><ResortCard title="Religious Tours" rating="4.8" image={religious} /></Link>
                  <Link to="/userdashboard/historicaltours"><ResortCard title="Historical and Cultural Tours" rating="4.7" image={historical} /></Link>
                  <Link to="/userdashboard/romantictours"><ResortCard title="Romantic Tours" rating="4.4" image={romantic} /></Link>
                </div>
              </section>

              {/* Packages Section */}
              <div className='flex flex-wrap justify-between items-start w-full'>
                <section className="flex-1 min-w-[60%] max-w-[70%]">
                  <h2 className="text-3xl  font-bold heading flex justify-center items-center popular text-transparent pt-2 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Best Packages</h2>
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {tours.map((tour, index) => (
                      <PackageCard
                        key={index}
                        title={tour.title}
                        price={`₹${tour.pricePerPerson}`}
                        image={tour.image}
                        tourId={tour._id}
                        token={token}
                        isLikedInitially={wishlist.includes(tour._id)}
                        onWishlistChange={(id, isAdding) => {
                          setWishlist((prev) =>
                            isAdding ? [...prev, id] : prev.filter((tourId) => tourId !== id)
                          );
                        }}
                      />
                    ))}
                  </div>
                </section>

                {/* Sidebar Videos */}
                <div className='w-[25%] flex flex-col gap-5'>
                  <video className="w-full h-full object-cover rounded-md" loop autoPlay muted>
                    <source src={myVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <video className="w-full h-full object-cover rounded-md" loop autoPlay muted>
                    <source src={globevideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_dashboard;
