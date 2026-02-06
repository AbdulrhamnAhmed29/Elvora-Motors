import { Outlet } from 'react-router-dom';
import TopHeader from '../../component/Layout/TopHeader';
import Sidebar from '../../component/Layout/Sidebar';

function Dashboard() {
    return (
        <div className="min-h-screen bg-[#0c0a09] text-white overflow-x-hidden">
            <TopHeader />


            <div className="flex flex-row justify-between  items-start">
                <div className=''>
                    <Sidebar />

                </div>
                {/* 3. Main content Area */}
                <main className=" transition-all duration-500 ease-in-out ml-0 w-full lg:ml-20 pt-24 px-4 md:px-8">



                    <div className="   ">
                        <Outlet />
                    </div>
                </main>
            </div>

            <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-white/[0.01] rounded-full blur-[120px] pointer-events-none"></div>
        </div>
    );
}

export default Dashboard; 