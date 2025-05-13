import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest, putRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function PaketPesertaEdit() {
    const {id} = useParams();
    const [data, setData] = useState({
        'nama':'',
        'email':'',
        'expired':''
    });
    const [aktif, setAktif] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      requestData(id);
    }, []);

   
    const requestData = async(id)=> {
        const hasil = await getRequest(token, "peserta/bidang/pilih/" + id);
        if(hasil!='' || hasil!=null){
            setData((prevData)=>({
                ...prevData,
                expired : hasil.Expired
            }
            ));
        }

        const hasil1 = await getRequest(token, 'peserta/pilih/' + hasil.PesertaId);
        setData((prevData)=>({
            ...prevData,
            email   : hasil1.PesertaEmail,
            nama    : hasil1.PesertaNama
        }));

        setAktif(hasil.Aktif);
        console.log("Hasil 1 ", hasil);
    }

    const handleExpired = (e) => {
        setData((prevData)=>({
            ...prevData,
            expired : e.target.value
        }));
    }

    const handleData = (e)=> {
        setData((prevData)=>({
            ...prevData,
            nama : e.target.value
        }));
    }

    const handleAktif = (e) =>{
        setAktif(e.target.value);
    }
    
    const updateData = async()=>{
        const json = {
            "Expired" : data.expired,
            "Aktif" : parseInt(aktif)
        }

        const hasil = await putRequest(token, "peserta/bidang/" + id, json);
        if(hasil.code===200 || hasil.code===201){
            navigate('/dashboard/paket/peserta');
        }else{
            Swal.fire({
                title   : 'Error',
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
                  <div className='card-header'>Edit Data Paket Pesrta</div>
                  <div className='card-body'>
                    <div className='mb-3'>
                        <label>Nama</label>
                        <input
                        className='form-control' value={data.nama} onChange={handleData} readOnly/>
                    </div>
                    <div className='mb-3'>
                        <label>Email</label>
                        <input className='form-control' value={data.email} onChange={handleData} readOnly/>
                    </div>
                    <div className='mb-3'>
                        <label>Status</label>
                        <p>
                            <label><input type='radio' value='1' checked={aktif>=1} onChange={handleAktif} />Aktif</label>&nbsp;
                            <label><input type='radio' value='0' checked={aktif<=0} onChange={handleAktif} />Tidak Aktif</label>
                        </p>
                    </div>
                    <div className='mb-3'>
                        <label>Expired</label>
                        <input type='date'
                            className='form-control col-sm-3'
                            value={data.expired}
                            onChange={handleExpired}
                        />
                    </div>
                    <p>
                        <button 
                            className='btn btn-success'
                            onClick={updateData}>
                                <i className='fa fa-save'></i> Simpan
                            </button>&nbsp;
                        <Link to='/dashboard/paket/peserta' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default PaketPesertaEdit;
