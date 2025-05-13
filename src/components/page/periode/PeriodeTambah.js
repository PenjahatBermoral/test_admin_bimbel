import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux';
import {postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function PeriodeTambah() {
    const [periode, setPeriode] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');


    const simpanData = async() => {
        const json = {
            "PeriodeNama":periode
        }

        if(periode.trim()==''){
            Swal.fire({
                title : 'warning',
                text : 'Periode tidak boleh kosong!',
                icon : 'warning'
            })
            return;
        }
        
        const hasil = await postRequest(token, 'periode', json);

        if(hasil.code==200 || hasil.code==201){
            navigate('/dashboard/periode');
        }else{
            Swal.fire({
                title : 'Error',
                text : hasil.msg,
                icon : 'error'
            });
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
                  <div className='card-header'>Tambah Periode</div>
                  <div className='card-body'>
                    <div className='mb-3 mt-3'>

                        <label className='form-label'>Periode</label>
                        <input type='text' className='form-control' value={periode} onChange={(e)=>setPeriode(e.target.value)}/>
                    </div>

                    <button className='btn btn-success' onClick={simpanData}>
                        <i className='fa fa-save'></i> Simpan
                    </button>&nbsp;
                    <Link to='/dashboard/periode' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default PeriodeTambah;
