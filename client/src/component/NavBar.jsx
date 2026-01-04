import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BoxIcon, ListIcon, MenuIcon, MessageCircleCode, XIcon } from 'lucide-react';
import { useUser, useClerk ,UserButton, SignIn} from '@clerk/clerk-react';
import { GripIcon } from 'lucide-react';
const NavBar = () => {
    
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate=useNavigate();
    const {user}=useUser();
    const {openSignIn}=useClerk();


  return (
      <nav className='h-20'>
                <div className='fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>
                   <img  onClick={()=>{navigate('/');scrollTo(0,0)}} src={assets.logo} alt="logo" className='h-10 cursor-pointer' />

                    {/* Desktop Menu */}
                    <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800'>
                        <Link to='/' onClick={() => scrollTo(0, 0)}> Home </Link>
                        <Link to='/marketplace' onClick={() => scrollTo(0, 0)}> Marketplace </Link>
                        <Link to={user? '/messages':'#'} onClick={() => user ? scrollTo(0, 0) : openSignIn()}> Messages </Link>
                        <Link to={user?'/my-listings' : '#'} onClick={() => user ? scrollTo(0, 0): openSignIn()}> My Listings </Link>
                    </div>

                    {!user ? (

                    <div>
                        <button onClick={openSignIn} className='max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <MenuIcon onClick={()=> setMenuOpen(true)} className='sm:hidden'/>
                    </div>
                    ) : (
                        <UserButton>
                            <UserButton.MenuItems>
                                <UserButton.Action label='Marketplace' labelIcon={<GripIcon size={16}/>} onClick={()=>navigate('/marketplace')}/>
                            </UserButton.MenuItems>

                            <UserButton.MenuItems>
                                <UserButton.Action label='Messages' labelIcon={<MessageCircleCode size={16}/>} onClick={()=>navigate('/messages')}/>
                            </UserButton.MenuItems>

                             <UserButton.MenuItems>
                                <UserButton.Action label='My Listings' labelIcon={<ListIcon size={16}/>} onClick={()=>navigate('/my-listings')}/>
                            </UserButton.MenuItems>

                             <UserButton.MenuItems>
                                <UserButton.Action label='My Order' labelIcon={<BoxIcon size={16}/>} onClick={()=>navigate('/my-orders')}/>
                            </UserButton.MenuItems>

                        </UserButton>
                    )}


                </div>
                {/* Mobile Menu */}
                <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'w-full' : 'w-0'} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}>
                    <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4'>
                        <Link to='/' onClick={()=>setMenuOpen(false)}>Home</Link>
                        <Link to='/marketplace' onClick={() => setMenuOpen(false)}> Marketplace </Link>
                        <button onClick={openSignIn}>Message</button>
                        <button onClick={openSignIn}>My Listings</button>
                        
                        <button onClick={openSignIn} className=' cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
                        <XIcon onClick={()=>setMenuOpen(false)} className='absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer'/>
                    </div>
                </div>
      </nav>
  )
}

export default NavBar;