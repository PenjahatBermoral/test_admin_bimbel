import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function AsalDaerahTambah() {
    const [asal, setAsal] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      
    }, []);

    const simpanData = async()=>{
        const json = {
            "AsalDaerah": asal
        }
        if(asal.trim()==''){
            Swal.fire({
                title : 'Warning',
                text    : 'Asal tidak boleh kosong!',
                icon    : 'warning'
            });
            return;
        }
        const hasil = await postRequest(token, "peserta/asal", json);
        if(hasil.code==200 || hasil.code==201){
            navigate('/dashboard/asal-daerah');
        }else{
            Swal.fire({
                title : 'Error',
                text    : hasil.data,
                icon : 'error'
            })
        }
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
                <div className='card'>
                  <div className='card-header'>Tambah Asal Daerah</div>
                  <div className='card-body'>
                    <div className='mb-3 mt-3'>
                        <label className='form-label'>Asal Daerah</label>
                        <input
                            type='text'
                            value={asal}
                            onChange={(e)=>setAsal(e.target.value)}
                            placeholder='Masukkan asal peserta'
                            className='form-control'
                            />
                    </div>
                        <button 
                            onClick={simpanData}
                            className='btn btn-success'><i className='fa fa-save'></i> Simpan</button>&nbsp;
                        <Link to='/dashboard/asal-daerah' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default AsalDaerahTambah;
