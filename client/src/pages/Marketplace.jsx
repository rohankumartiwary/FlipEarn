import { ArrowLeftIcon, FilterIcon, Search } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ListingCard from '../component/ListingCard';
import FilterSideBar from '../component/FilterSideBar';


const Marketplace = () => {
    const [showFilterPhone,setShowFilterName]=React.useState(false);
    const [filters,setFilters]=React.useState({
        platform:null,
        maxPrice:100000,
        minFollowers:0,
        niche:null,
        monetized:false,
    });
    const [searchParams]=useSearchParams();
    const search=searchParams.get("search");

    const navigate = useNavigate();
    const {listings}=useSelector(state=>state.listing);
    
    const filteredListings=listings.filter((listing)=>{

        if(filters.maxPrice){
            if(listing.price > filters.maxPrice) return false;
        }

        if(filters.platform && filters.platform.length > 0){
            if(!filters.platform.includes(listing.platform)) return false;
        }

        if(filters.minFollowers){
            if(listing.followers_count < filters.minFollowers) return false;
        }

        if(filters.niche && filters.niche.length > 0){
            if(!filters.niche.includes(listing.niche)) return false;
        }

        if(filters.verified && listing.verified!==filters.verified) return false;

        if(filters.monetized && listing.monetized !== filters.monetized) return false;

        if(search){
            const trimed=search.trim();

            if(
                !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
                !listing.niche.toLowerCase().includes(trimed.toLowerCase())
            ) return false;
        }

        return true;

    })

    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex items-center justify-between text-slate-500'>
                <button onClick={() => { navigate('/'); scrollTo(0, 0) }}
                    className='flex items-center gap-2 py-5'>
                    <ArrowLeftIcon className='size-4' />
                    Back to home
                </button>

                <button  onClick={()=>setShowFilterName(true)} 
                    className='flex sm:hidden items-center gap-2 py-5'
                    >
                    <FilterIcon className='size-4'/>
                    Filters</button>
            </div>

            <div className='flex items-start justify-between gap-8 pb-8'>
               <FilterSideBar setFilters={setFilters} filters={filters} showFilterPhone={showFilterPhone}  />
                <div className='flex-1 grid xl:grid-cols-2 gap-4'>
                    {filteredListings.sort((a,b)=>a.featured ? -1 : b.featured? 1 : 0).map((listing,index)=>(
                        <ListingCard listing={listing} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Marketplace;
