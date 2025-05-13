import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function Dashboard() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      
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
          <section className="content">
        <div className="container-fluid">
          <div className="row">
              <div className="col-sm-12">
                <div className='card'>
                  <div className='card-header'></div>
                  <div className='card-body'>

                  </div>
                </div>
              </div>
          </div>
        </div>
        </section>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    );
}
{
  /*
<Button variant="primary" onClick={handleShow}>
                            Show Modal
                        </Button>

                        <Modal show={show} onHide={handleClose} size='lg'>
                            <Modal.Header closeButton>
                            <Modal.Title>Modal Title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            This is the body of the modal.
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
  */
}
export default Dashboard;
