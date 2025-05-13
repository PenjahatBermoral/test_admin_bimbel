import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import '../../../App.css';
import './materi.css';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function Materi() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampilData();
    }, []);

    const tampilData = async()=>{
        const res = await getRequest(token, "materi/filter/" + id);
        setData(res);
    }

    const halamanTambah = ()=>{
        navigate('/materi/tambah/' + id);
    }

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
                <div className='judul-halaman'>Materi</div>
                <button onClick={halamanTambah} className='btn btn-primary'><i className='fa fa-plus'></i> Tambah</button>
                <div className='baris'/>
              {data && data.map((item) => (
                <div className='materi border-biru' key={item.MateriId}>
                    <div className='materi-header bg-biru'>{item.MateriJudul}</div>
                    <div className='materi-body'>
                        <div
                            className="teks"
                            dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.MateriIsi) // Sanitize the HTML content
                            }}
                        />
                        <button className='btn btn-danger btn-xs'><i className='fa fa-trash'></i></button>
                        <button className='btn btn-info btn-xs'><i className='fa fa-edit'></i></button>
                        <div className='baris'>
                            
                        </div>
                        <Link to={`/dashboard/soal/${id}`}><i className='fa fa-eye'></i></Link>
                    </div>
                    
                </div>
                ))}
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

export default Materi;
