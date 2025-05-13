import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest,  putRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function DataSectionEdit() {
    const {id} = useParams();
    const [section, setSection] = useState('');
    const [aktif, setAktif] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
          getData();
        }, []);
    const handleAktif=(e)=>{
        setAktif(e.target.value);
    }

    const simpanData = async()=> {
        const json = {
            'SectionNama':section,
            'SectionTampil':parseInt(aktif)
        }

        const hasil = await putRequest(token, 'soal/section/' + id, json);
        if(hasil.code===200 || hasil.code===201){
            navigate('/dashboard/section');
        }else{
            Swal.fire({
                title : 'Error',
                text    : hasil.msg,
                icon    : 'error'
            });
        }
    }

    const getData = async()=>{
        const hasil = await getRequest(token, 'soal/section/pilih/' + id);
        if(hasil!=null){
            setSection(hasil.SectionNama);
            setAktif(hasil.SectionTampil);
        }else{
            Swal.fire({
                title : 'Error',
                text    : hasil.msg,
                icon    : 'error'
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
                  <div className='card-header'>Edit Section</div>
                  <div className='card-body'>
                    <div className='mb-3'>
                        <label>Nama Section</label>
                        <input
                            className='form-control'
                            value={section}
                            onChange={(e)=>setSection(e.target.value)}
                            />
                    </div>

                    <div className='mb-3'>
                        <label>Status</label>
                        <p>
                            <label><input type='radio' value='1' checked={aktif==1} onChange={handleAktif}/>Aktif</label>
                            <label><input type='radio' value='0' checked={aktif==0} onChange={handleAktif}/>Tidak Aktif</label>
                        </p>
                    </div>
                    <p>
                        <button
                        className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Update</button>&nbsp;
                        <Link to='/dashboard/section' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
                    </p>
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

export default DataSectionEdit;
