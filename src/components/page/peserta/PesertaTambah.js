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

function PesertaTambah() {
    const [email, setEmail] = useState('');
    const [nama, setNama] = useState('');
    const [jk, setJk] = useState('');
    const [alamat, setAlamat] = useState('');
    const [nohp, setNoHp] = useState('');
    const [pendidikanterakhir, setPendidikanTerakhir] = useState('');
    const [asalsekolah, setAsalSekolah] = useState('');
    const [periode, setPeriode] = useState('');
    const [password, setPassword] = useState('');
    const [arrasal, setArrAsal] = useState([]);
    const [arrperiode, setArrPeriode] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleJk = (event) => {
        setJk(event.target.value);
    }

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampilAsal();
      tampilPeriode();
    }, []);

    const tampilAsal = async () => {
      const hasil = await getRequest(token, "peserta/asal");
      setArrAsal(hasil);
    }

    const tampilPeriode = async () => {
      const hasil = await getRequest (token, "periode")
      setArrPeriode(hasil);
    }

    const  handleAsal = (event)=> {
      setAsalSekolah(event.target.value);
    }

    const handlePeriode = (event) => {
      setPeriode(event.target.value);
    }

    const simpanData = async () => {
      const json = {
        "PesertaEmail":email,
        "PesertaNama":nama,
        "PesertaJk":jk,
        "PesertaAlamat":alamat,
        "PesertaPendidikanTerakhir":pendidikanterakhir,
        "PesertaAsalSekolah":asalsekolah,
        "PesertaPeriode":periode,
        "PesertaPassword":password
      }


      if(email==='' || nama==='' || jk===null || alamat=='' || pendidikanterakhir==='' || asalsekolah===null || periode===null || password===''){
        Swal.fire({
          title : 'Warning',
          text  : 'Data tidak lengkap!',
          icon  : 'warning'
        });
        return;
      }

      const hasil = await postRequest(token, "peserta", json);
      if(hasil.code==200 || hasil.code==201){
        navigate('/dashboard/peserta');
      }else{
        Swal.fire({
          title : 'Error',
          text  : hasil.msg,
          icon  : 'error'
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
                  <div className='card-header'>Tambah Peserta</div>
                  <div className='card-body'>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                        className="form-control"
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Nama </label>
                        <input 
                        type="text"
                        value={nama} 
                        onChange={(e)=>setNama(e.target.value)}
                        className="form-control"
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>J. Kelamin</label>
                        <p>
                            <label><input type='radio' value='L' checked={jk==='L'} onChange={handleJk}/>Laki-laki</label> &nbsp;
                            <label><input type='radio' value='P' checked={jk==='P'} onChange={handleJk}/>Perempuan</label>
                        </p>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Alamat </label>
                        <input 
                        type="text" 
                        className="form-control"
                        value={alamat}
                        onChange={(e)=>setAlamat(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">No Hp </label>
                        <input 
                        type="text" 
                        className="form-control col-sm-5"
                        value={nohp}
                        onChange={(e)=>setNoHp(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Pendikan Terakhir </label>
                        <input 
                        type="text" 
                        className="form-control col-sm-3"
                        value={pendidikanterakhir}
                        onChange={(e)=>setPendidikanTerakhir(e.target.value)}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Asal Sekolah </label>
                        <select className='form-control' onChange={handleAsal} value={asalsekolah}>
                          <option value=''>Pilih</option>
                          {arrasal && arrasal.map((row, index)=>(
                            <option key={index} value={row.AsalDaerah}>{row.AsalDaerah}</option>
                          ))}
                        </select>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Periode </label>
                        <select className='form-control' value={periode} onChange={handlePeriode}>
                          <option value=''>Pilih</option>
                          {arrperiode && arrperiode.map((row, index)=>(
                            <option key={index} value={row.PeriodeNama}>{row.PeriodeNama}</option>
                          ))}
                        </select>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Password </label>
                        <input 
                        type="password" 
                        className="form-control"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <p>
                      <button className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Simpan</button>&nbsp;
                      <Link to='/dashboard/peserta' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default PesertaTambah;
