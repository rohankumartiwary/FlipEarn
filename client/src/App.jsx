import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Marketplace from './pages/Marketplace';
import MyListing from './pages/MyListing';
import ListingDetails from './pages/ListingDetails';
import ManageListing from './pages/ManageListing';
import Messages from './pages/Messages';
import Loading from './pages/Loading';
import NavBar from './component/NavBar.jsx';
import ChatBox from './component/ChatBox.jsx';
import { Toaster } from 'react-hot-toast'
import MyOrders from './pages/MyOrders.jsx';
import Layout from './pages/admin/Layout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import AllListings from './pages/admin/AllListings.jsx';
import CredentialChange from './pages/admin/CredentialChange.jsx';
import CredentialVerify from './pages/admin/CredentialVerify.jsx';
import Transactions from './pages/admin/Transactions.jsx';
import WithdrawModal from './component/WithdrawModal.jsx';
import Withdrawal from './pages/admin/Withdrawal.jsx';

const App = () => {
  const {pathname}=useLocation();
  return (
    <div>
      <Toaster/>
      {!pathname.includes('/admin') && <NavBar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/marketplace' element={<Marketplace />} />
        <Route path='/my-listings' element={<MyListing/>}/>
        <Route path='listing/:listingId' element={<ListingDetails />} />
        <Route path='create-listing' element={<ManageListing/>}/>
        <Route path='edit-listing/:id' element={<ManageListing/>}/>
        <Route path='/messages' element={<Messages/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loading' element={<Loading/>}/>
        
        <Route path='/admin' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='verify-credentials' element={<CredentialVerify/>}/>
            <Route path='change-credentials' element={<CredentialChange/>}/>
            <Route path='list-listings' element={<AllListings/>}/>
            <Route path='transactions' element={<Transactions/>}/>
            <Route path='withdrawal' element={<Withdrawal/>}/>
        </Route>
      </Routes>
      <ChatBox/>
    </div>
  )
}

export default App;
