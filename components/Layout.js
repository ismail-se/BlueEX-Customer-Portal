import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="bg-[#f8f9fd] w-screen min-h-screen">
      <Header />
      <div className="flex flex-1 min-h-screen">
        <Sidebar />
        <div className="flex flex-col lg:ml-[16rem] relative w-full">
          <div className="h-screen flex-1 mt-[4rem] p-[1.5rem]">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
