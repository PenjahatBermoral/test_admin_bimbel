import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { deleteRequest, getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SectionPesertaDataTambah() {
    const {id} = useParams();
    const [data, setData] = useState({
      periode : '',
      idpeserta : 0,
      sectionnama : '',
      waktucreate : '',
      waktuupdate : '',
      tampil : 0
    });
    const [periode, setPeriode] = useState([]);
    const [peserta, setPeserta] = useState([]);
    const [pesertaujian ,setPesertaUjian] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getPeriode();
      getData();
      getSectionDetail();
    }, []);

    const getPeriode = async () => {
      const hasil = await getRequest(token, 'periode');
      if(hasil!=null){
        setPeriode(hasil);
      }
    }

    const handlePeriode = (e)=>{
      let nilai = e.target.value;
      getPeserta(nilai);
      setData((prevData)=>({
        ...prevData,
        periode : nilai
      }));

      
    }

    const getPeserta = async(nilai) =>{
      if(nilai==='' || nilai==null){
        setPeserta([]);
      }else{
        const hasil = await getRequest(token, "peserta/periode/" + nilai);
        if(hasil!=null){
          setPeserta(hasil);
        }
      }
      
    }

    const handlePeserta = (e) => {
      setData((prevData)=>({
        ...prevData,
        idpeserta : parseInt(e.target.value)
      }));
    }

    const simpanData = async () => {

      if(data.idpeserta===0 || data.idpeserta==null){
        Swal.fire({
          title : 'Warning',
          text  : 'Form tidak boleh kosong!',
          icon : 'warning'
        });
        return false;
      }

      const json = {
        "SectionId" : parseInt(id),
        "PesertaId": data.idpeserta
      }

      const hasil = await postRequest(token, 'ujian/peserta', json);
      if(hasil.code===200 || hasil.code===201){
        document.location.reload();
      }else{
        Swal.fire({
          title   : 'error',
          text  : hasil.msg,
          icon  : 'error'
        });
      }
    }
    const getData = async()=> {
      const hasil = await getRequest(token, "ujian/peserta/" + id);
      if(hasil!=null){
        setPesertaUjian(hasil);
      }else{
        setPesertaUjian([]);
      }
    }

    const hapusData = async(nilai)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to undo this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const hasil = await deleteRequest(token, 'ujian/peserta/' + nilai);
          if(hasil.code===200 || hasil.code==201){
            document.location.reload();
          }else{
            Swal.fire({
              title   : 'error',
              text    : hasil.msg,
              icon    : 'error'
            });
          }
        
        }
      });
      
    }

    const getSectionDetail = async () => {
      const hasil = await getRequest(token, 'soal/section/pilih/' + id);
      if(hasil!=null){
        setData((prevData)=>({
          ...prevData,
          sectionnama : hasil.SectionNama,
          waktucreate : hasil.WaktuCreate,
          waktuupdate : hasil.WaktuUpdate,
          tampil : hasil.SectionTampil
        }));
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
                <div className='col-sm-3'>
                    <div className='cardku'>
                        <div className='cardku-header'><div className='cardku-title'>Informasi</div></div>
                        <div className='cardku-body'>
                          <p><Link to={`/dashboard/section/peserta/${id}`}><i className='fa fa-arrow-left'></i></Link></p>
                          <div className='list-kiri'>
                            <ul>
                              <li><small>Section :</small><p className='data-abu tebal'>{data.sectionnama}</p></li>
                              <li>Tampil di Client :  {data.tampil}</li>
                              <li><small>Waktu Create : </small>
                              <p className='data-abu tebal'>{data.waktucreate}</p>
                              </li>
                              <li><small>Waktu Update : </small>
                              <p className='data-abu tebal'>{data.waktuupdate}</p>
                              </li>
                            </ul>
                          </div>
                        </div>
                    </div>
                </div>
              <div className="col-sm-6">
                <div className='card'>
                  <div className='card-header'>Data Peserta Section</div>
                  <div className='card-body'>
                    <div className='table-responsive'>
                      <div
                        class="table-responsive"
                      >
                        <table
                          class="table table-bordered"
                        >
                          <thead>
                            <tr>
                              <th scope="col" width="10%">No</th>
                              <th scope="col"width="40%">Peserta</th>
                              <th scope="col"width="40%">Section</th>
                              <th scope="col"width="10%">&nbsp;</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pesertaujian && pesertaujian.map((item, index)=>(
                            <tr class="" key={index}>
                              <td scope="row">{index+1}</td>
                              <td>{item.PesertaNama}</td>
                              <td>{item.SectionNama}</td>
                              <td><button className='btn btn-danger btn-xs' onClick={()=>hapusData(item.Id)}><i className='fas fa-trash'></i></button></td>
                            </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
                <div className='col-sm-3'>
                    <div className='cardku'>
                        <div className='cardku-header'><div className='cardku-title'>Tambah Data</div></div>
                        <div className='cardku-body'>
                          <div className='mb-3'>
                            <label>Periode</label>
                            <select className='form-control' value={data.periode} onChange={handlePeriode}>
                              <option value=''>Pilih</option>
                              {periode && periode.map((item, index)=>(
                                <option key={index} value={item.PeriodeNma}>{item.PeriodeNama}</option>
                              ))}
                            </select>
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

                          <p>
                            <button className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Simpan</button>
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

export default SectionPesertaDataTambah;
