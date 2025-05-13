import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest, postRequest, putRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../template/Sidebar';
import Navbar from '../../template/Navbar';
import Footer from '../../template/Footer';
import Header from '../../template/Header';

function FormUjianEdit() {
    const {id} = useParams();
    const [data, setData] = useState({
      ujianid : 0,
      sectionid : 0,
      tampil : 0,
      durasi : 0,
      tglujian : '',
      mulai : '',
      akhir : ''
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampilData();
    }, []);

    const tampilData = async()=>{
      const hasil = await getRequest(token, 'ujian/data/pilih/' + id);
      if(hasil!=null){
        setData((prevData)=>({
          ...prevData,
          akhir : hasil.AkhirUjian,
          durasi: hasil.Durasi,
          mulai : hasil.AwalUjian,
          sectionid : hasil.SectionId,
          tampil : hasil.Tampil,
          tglujian : hasil.TglUjian,
          ujianid : hasil.UjianId
        }));
      }
    }

    const handleTgl = (e) => {
      setData((prevData)=>({
        ...prevData,
        tglujian : e.target.value
      }));
    }

     const handleMulai = (e) => {
      setData((prevData)=>({
        ...prevData,
        mulai : e.target.value
      }));
    }

     const handleSelesai = (e) => {
      setData((prevData)=>({
        ...prevData,
        akhir : e.target.value
      }));
    }

     const handleTampil = (e) => {
      setData({...data, 
        tampil: parseInt(e.target.value)});
    }

    const updateData = async()=> {

      if(data.akhir===null || data.mulai===null || data.tglujian==null){
        Swal.fire({
          title   : 'Error',
          text  : 'Form tidak lengkap!',
          icon  : 'warning'
        });
        return false;
      }

      const json = {
        'Akhir':data.akhir,
        'Durasi' : parseInt(data.durasi),
        'Mulai': data.mulai,
        'SectionId' : parseInt(data.sectionid), 
        'Tampil' : data.tampil,
        'TglUjian' : data.tglujian, 
        'UjianId': parseInt(data.ujianid)
      }

      const hasil = await putRequest(token, "ujian/data/update/" + id, json);
      if(hasil.code===200 || hasil.code===201){
        toast.success('Data berhasil diupdate!', {
          position : 'top-right',
          autoClose : 1500
        });
      }else{
        Swal.fire({
          title   : 'error',
          text  : hasil.msg,
          icon  : 'error'
        })
      }

      console.log('json : ', json);
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
                  <div className='card-header'>Edit Data Ujian</div>
                  <div className='card-body'>
                    <div className='mb-3'>
                      <label>Tanggal Ujian</label>
                      <input type='date' className='form-control col-sm-3' value={data?.tglujian} onChange={handleTgl}></input>
                    </div>
                    <div className='mb-3'>
                      <label>Jam Mulai {data.mulai}</label>
                      <input type='datetime-local' className='form-control col-sm-3' value={data.mulai || ''} onChange={handleMulai}></input>
                    </div>
                    <div className='mb-3'>
                      <label>Jam Selesai</label>
                      <input type='datetime-local' className='form-control col-sm-3' value={data.akhir || ''} onChange={handleSelesai}></input>
                    </div>
                    <div className='mb-3'>
                      <label>Tampil</label>
                      <p>
                        <label><input type='radio' value='1' checked={data.tampil===1} onChange={handleTampil}/> Tampil</label>
                        <label><input type='radio' value='0' checked={data.tampil===0} onChange={handleTampil}/> Tidak Tampil</label>
                      </p>
                    </div>

                    <button className='btn btn-success' onClick={updateData}><i className='fa fa-save'></i> Update</button>&nbsp;
                    <Link to={`/dashboard/ujian`} className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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
export default FormUjianEdit;