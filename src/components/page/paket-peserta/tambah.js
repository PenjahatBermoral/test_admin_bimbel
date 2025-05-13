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

function PaketPesertaTambah() {
    const [data, setData] = useState({
        'bidang':'',
        'idpeserta':0,
        'periode':'',
        'expired':''
    });
    const [bidang, setBidang] = useState([]);
    const [periode, setPeriode] = useState([]);
    const [peserta, setPeserta] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getBidang();
      getPeriode();
    }, []);


    const getPeriode = async()=>{
        const hasil = await getRequest(token, 'periode');
        console.log('Hasil : ', hasil);
        setPeriode(hasil);
    }

    const getBidang = async () => {
        const hasil = await getRequest(token, "bidang");
        console.log('hasil', hasil);
        setBidang(hasil);
    }

    const handleBidang = (e) => {
        setData((prevData) => ({
        ...prevData,
        bidang: e.target.value
    }));
    }

    const handlePeriode = (e) => {
        const nilai = e.target.value;
        setData((prevData)=> (
            {
                ...prevData,
                periode:e.target.value
            }
        ));

        console.log("Periode = ", nilai);
        getPeserta(nilai);
    }

    const handlePeserta = (e) => {
        setData((prevData)=>({
            ...prevData,
            idpeserta:parseInt(e.target.value)
        }));
    }

    const handleExpired = (e) => {
        setData((prevData)=>({
            ...prevData,
            expired : e.target.value
        }));
    }

    const getPeserta = async(nilai)=>{
        if(nilai!==''){
            const hasil = await getRequest(token, 'peserta/bidang/periode/' + nilai);
            setPeserta(hasil);
        }
        
    }

    const simpanData = async() => {
        const json = {
            'BidangId':parseInt(data.bidang),
            'PesertaId':parseInt(data.idpeserta),
            'Expired': data.expired
        }

        if(data.bidang===0 || data.periode==='' || data.expired===''){
            Swal.fire({
                title   : 'Error',
                text    : 'Data tidak lengkap!',
                icon    : 'error'
            });
            return false;
        }

        const hasil = await postRequest(token, 'peserta/bidang', json);
        if(hasil.code===200 || hasil.code===201){
            document.location.reload();
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
                  <div className='card-header'>Tambah Paket</div>
                  <div className='card-body'>
                    <div className='mb-3 mt-3'>
                        <label>Bidang</label>
                        <select className='form-control' value={data.bidang} onChange={handleBidang}>
                            <option value=''>Pilih</option>
                            {bidang && bidang.map((item, index)=>(
                                    <option key={index} value={item.BidangId}>{item.BidangNama}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Periode Peserta</label>
                        <select className='form-control' value={data.periode} onChange={handlePeriode}>
                            <option value=''>Pilih</option>
                            {periode && periode.map((item, index)=>(
                                <option key={index} value={item.PeriodeNama}>{item.PeriodeNama}</option>
                            ))}
                        </select>
                        <p>Periode yang dipilih: {data.periode}</p> {/* Menampilkan periode yang dipilih */}
                    </div>
                    <div className='mb-3'>
                        <label>Peserta</label>
                        <select className='form-control' value={data.idpeserta} onChange={handlePeserta}>
                            <option value=''>Pilih</option>
                            {peserta && peserta.map((item, index)=>(
                                <option key={index} value={item.PesertaId}>{item.Nama}</option>
                            ))}
                        </select>
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
                            onClick={simpanData}>
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

export default PaketPesertaTambah;
