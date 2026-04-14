import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar/Index';
import Navbar from './Navbar/Index';

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <div className="ml-[240px] w-[calc(100%-240px)]">
        <Navbar />
        <div className="pt-[64px] bg-gray-50 p-[0px_70px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
