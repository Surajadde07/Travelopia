import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sec2 from './components/Sec2';
import Sec3 from './components/Sec3';
import Sec4 from './components/Sec4';
import Footer from './components/Footer';
import Login from './components/Login_page';
import Signup from './components/Signup'
import UserDashboard from './components/UserDashboard';
import UserEdit from './components/UserEdit';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import Tour from './components/Tour';
import Wishlist from './components/Wishlist';
import MyBooking from './components/MyBooking';
import { WishlistFull } from './components/WishlistFull';
import TourDetails from './components/TourDetails';
import AdminRegister from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import MyReviews from './components/MyReviews';
import AdminUsers from './components/AdminUsers';
import ReviewsPage from './components/Reviewpage';
import AdminBooking from './components/AdminBooking';
import CreateTour from './components/CreateTour';
import Adventure from './components/Adventure';
import Religious from './components/Religious';
import Historical from './components/Historical';
import Romantic from './components/Romantic';
import UpdateTour from './components/UpdateTour';
import Destinations from './components/Destinations';
import DestAdventure from './components/DestAdventure';
import DestHistorical from './components/DestHistorical';
import DestReligious from './components/DestReligious';
import DestRomantic from './components/DestRomantic';
import CreateMoment from './components/CreateMoment';
import AllMoments from './components/AllMoment';
import CommentMoment from './components/CommentMoment';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
            <Navbar />
              <Hero />
              <Sec2 />
              <Sec3 />
              <Sec4 />
              <Footer />
            </>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login/admindashboard" element={<AdminDashboard/>} />
          <Route path="/signup/admindashboard" element={<AdminDashboard/>} />
          <Route path="/login/userdashboard" element={<UserDashboard/>} />
          <Route path="/login/userdashboard/userprofile/useredit" element={<UserEdit/>} />
          <Route path="/login/userdashboard/userprofile" element={<UserProfile/>} />
          <Route path="/login/userdashboard/wishlist" element={<Wishlist/>}/>
          <Route path="/login/userdashboard/mybookings" element={<MyBooking/>}/>
          <Route path="/login/userdashboard/wishlistfull" element={<WishlistFull/>}/>
          <Route path="/dashboard/booknow/:tourId" element={<TourDetails/>}/>
          <Route path="/register/admin" element={<AdminRegister/>}/>
          <Route path="/login/admin" element={<AdminLogin/>}/>
          <Route path="/login/dashboard/myreviews" element={<MyReviews/>} />
          <Route path='/admindashboard' element={<AdminDashboard/>} />
          <Route path="/admindashboard/tours" element={<Tour/>} />
          <Route path='/admindashboard/users' element={<AdminUsers/>} />
          <Route path='/admindashboard/reviews' element={<ReviewsPage/>} />
          <Route path='/admindashboard/bookings' element={<AdminBooking/>} />
          <Route path="/admindashboard/tours/createtour" element={<CreateTour/>} />
          <Route path="/admin/tours/update/:id" element={<UpdateTour/>} />
          <Route path="/userdashboard/adventuretours" element={<Adventure/>} />
          <Route path="/userdashboard/religioustours" element={<Religious/>} />
          <Route path="/userdashboard/historicaltours" element={<Historical/>} />
          <Route path="/userdashboard/romantictours" element={<Romantic/>} />
          <Route path='/destinations' element={<Destinations/>} />
          <Route path='/destinations/adventure' element={<DestAdventure/>} />
          <Route path='/destinations/historical' element={<DestHistorical/>} />
          <Route path='/destinations/religious' element={<DestReligious/>} />
          <Route path='/destinations/romantic' element={<DestRomantic/>} />
          <Route path='/create' element={<CreateMoment/>}/>
          <Route path='/moments' element={<AllMoments/>}/>
          <Route path='/comment/:id' element={<CommentMoment/>}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
