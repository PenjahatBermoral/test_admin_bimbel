import { useEffect } from 'react';
import Sidebar from '../components/template/Sidebar';
import Navbar from '../components/template/Navbar';
import Footer from '../components/template/Footer';
import Header from '../components/template/Header';
import Home from '../components/page/home';

function Dashboard() {
  useEffect(()=>{
    document.title='Dashboard';
  }, []);
  return (
    <div className="wrapper">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Navbar */}
      <Navbar />
      
      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Content Header */}
        
        <Header/>
        {/* Main Content */}
        <Home />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
