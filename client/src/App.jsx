import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Playbar from "./components/Playbar";
import Footer from "./components/Footer";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (

      <div className="flex flex-col h-screen bg-black p-2 gap-0.5">
        <div className="flex h-[93vh] w-full gap-0.5">
          <Sidebar />
          <div className="flex flex-col rounded-t w-[75vw] gap-0.5 bg-[#121212] relative">
            <Navbar />

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <Routes>
                <Route index element={<Home />} />
                {/* You can add more pages here */}
              </Routes>
            </div>

            <Playbar />
          </div>
        </div>
        <Footer />
      </div>
    
  );
}

export default App;
