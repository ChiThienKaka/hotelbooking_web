import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {DefaultLayout, HomeLayout, RegisterHotelLayout} from '../layouts';
import {
  HomePage, RegisterManager, ContactInfoManager, CreatePasswordManager, VerifyAccountManager,
  LoginEmailMn, LoginPassMn,HomeMnPage,
  //Hotel
  TypeHotel, TypeHotel_P2, TypeHotel_P3,TypeHotel_P4,
  LocationHotel,
  NameHotel,
  AmenitiesHotel,
  CheckInOutHotel,
  MultiStepHotel,
  RoomDetails,
  BathRoom,
  RoomAmenities,
  NameRoom,
  ImageRoom
} from '../pages';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login, User } from '../redux/Slice/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
const AppRoutes = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      // Đưa token này lên dữ liệu store của redux 
      const token = localStorage.getItem('token');
      if(token){
          const decode : User = jwtDecode(token);
          dispatch(login(decode));
      }
  },[])
    return (
      <Router>
          <Routes>
            {/* Route chung  */}
            <Route path='/' element={<DefaultLayout><HomePage /></DefaultLayout>} />

            {/* Route cho quản lý  */}
            <Route path='/manage'>
                <Route index element={<DefaultLayout><RegisterManager/></DefaultLayout>} />
                <Route path='register' element={<DefaultLayout><RegisterManager/></DefaultLayout>} />
                <Route path='contact-info' element={<DefaultLayout><ContactInfoManager/></DefaultLayout>} />
                <Route path='create-password' element={<DefaultLayout><CreatePasswordManager /></DefaultLayout>} />
                <Route path='verify-account' element={<DefaultLayout><VerifyAccountManager /></DefaultLayout>} />
                <Route path='sigin-manage' element= {<DefaultLayout><LoginEmailMn /></DefaultLayout>} />
                <Route path='sigin-pass-manage' element={<DefaultLayout><LoginPassMn /></DefaultLayout>} />

                {/* Home  */}
                <Route path='home' element={<HomeLayout><HomeMnPage/></HomeLayout>} />
                {/* RegisterHotel  */}
                <Route path='register-hotel/type' element={<RegisterHotelLayout><TypeHotel/></RegisterHotelLayout>} />
                <Route path='register-hotel/type-part-2' element={<RegisterHotelLayout><TypeHotel_P2/></RegisterHotelLayout>} />
                <Route path='register-hotel/type-part-3' element={<RegisterHotelLayout><TypeHotel_P3/></RegisterHotelLayout>} />
                <Route path='register-hotel/type-part-4' element={<RegisterHotelLayout><TypeHotel_P4/></RegisterHotelLayout>} />
                {/* Setup - Hotel  */}
                <Route path='register-hotel/setup-hotel/location-hotel' element={<RegisterHotelLayout><LocationHotel/></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-hotel/name-hotel' element={<RegisterHotelLayout><NameHotel /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-hotel/amenities-hotel' element={<RegisterHotelLayout><AmenitiesHotel /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-hotel/check-in-out-hotel' element={<RegisterHotelLayout><CheckInOutHotel /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-hotel/multi-step-hotel' element={<RegisterHotelLayout><MultiStepHotel /></RegisterHotelLayout>} />
                {/* Setup - Room  */}
                <Route path='register-hotel/setup-room/room-details' element={<RegisterHotelLayout><RoomDetails /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-room/bath-room' element={<RegisterHotelLayout><BathRoom /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-room/room-amenities' element={<RegisterHotelLayout><RoomAmenities /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-room/name-room' element={<RegisterHotelLayout><NameRoom /></RegisterHotelLayout>} />
                <Route path='register-hotel/setup-room/image-room' element={<RegisterHotelLayout><ImageRoom /></RegisterHotelLayout>} />
                
            </Route>

          </Routes>
      </Router>
    );
  };
  
  export default AppRoutes;