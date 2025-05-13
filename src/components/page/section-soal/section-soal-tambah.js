import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SectionSoalTambah() {
    const {id} = useParams();
    const [data, setData] = useState({
        bidang : 0,
        subbidang : 0,
        materi : 0,
        soal : 0,
        sectionnama : '',
        sectiontampil : 0
    });

    

    const [bidang, setBidang] = useState([]);
    const [subbidang, setSubBidang] = useState([]);
    const [materi, setMateri] = useState([]);
    const [soal, setSoal] = useState([]);
    const [jlhsoal, setJlhSoal]= useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getBidang();
      getSection();
      getJumlahSoal();
    }, []);

    const getBidang = async()=> {
        const hasil = await getRequest(token, 'bidang');
        setBidang(hasil);
    }

    const handleBidang = (e)=>{
        let nilai = parseInt(e.target.value);
        setData((prevData)=>(
            {
                ...prevData,
                bidang : parseInt(e.target.value)
            }
        ));

        getSubBidang(nilai);
    }

    const getSubBidang = async(nilai)=>{
        if(nilai!=null){
            const hasil = await getRequest(token, 'sub-bidang/filter/' + nilai);
            setSubBidang(hasil);
        }
    }

    const handleSubBidang = (e)=>{
        let nilai = parseInt(e.target.value);
        setData((prevData)=>(
            {
                ...prevData,
                subbidang : parseInt(e.target.value)
            }
        ));
        getMateri(nilai);
    }

    const getMateri = async(nilai)=> {
        if(nilai!=null){
            const hasil = await getRequest(token, 'materi/filter/' + nilai);
            setMateri(hasil);
        }
    }
    const handleMateri =(e)=>{
        let nilai = parseInt(e.target.value);
        setData((prevData)=>(
            {
                ...prevData,
                materi : nilai
            }
        ));

        getSoal(nilai);
    }

    const getSoal = async(nilai)=> {
        if(nilai!=null){
            const hasil = await getRequest(token, 'soal/filter/' + nilai);
            if(hasil!=null){
                setSoal(hasil);
            }else{
                setSoal([]);
            }
        }
    }

    const handleSimpan = async(nilai)=>{

        const json = {
            'SectionId' : parseInt(id),
            'SoalId' : parseInt(nilai),
            'Point' : 1
        }

        const hasil = await postRequest(token, 'soal/list', json);
        if(hasil.code===200 || hasil.code===201){
            toast.success('Soal berhasil ditambahkan!', {
                position : 'top-right',
                autoClose : 1500
            });

            getJumlahSoal();
        }else{
            Swal.fire({
                title : 'Error',
                text    : hasil.msg,
                icon    : 'error'
            });
        }
    }

    const getSection = async()=>{
        const hasil = await getRequest(token, 'soal/section/pilih/' + id);
        if(hasil!=null){
            setData((prevData)=>({
                ...prevData,
                sectionnama : hasil.SectionNama,
                sectiontampil : hasil.SectionTampil
            }));
        }
    }
    const getJumlahSoal = async()=>{
        const hasil = await getRequest(token, 'soal/list/' + id);
        setJlhSoal(hasil);
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
                        <div className='cardku-header'>
                            <div className='cardku-title'><Link to={`/dashboard/section/soal/${id}`}><i className='fa fa-arrow-left'></i></Link> Informasi</div>
                        </div>
                        <div className='cardku-body'>
                            <div className='list-kiri'>
                                <ul>
                                    <li><small>Nama Section :</small> <p>{data.sectionnama}</p></li>
                                    <li><small>Jumlah Soal :</small> <p>{jlhsoal?.length}</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              <div className="col-sm-9">
                <div className='card'>
                  <div className='card-header'>Tambah Soal</div>
                  <div className='card-body'>
                    <div className='mb-3'>
                        <label>Bidang</label>
                        <select className='form-control' value={data.bidang} onChange={handleBidang}>
                            <option value=''>Pilih</option>
                            {
                                bidang && bidang.map((item, index)=>(
                                    <option key={index} value={item.BidangId}>{item.BidangNama}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Sub Bidang</label>
                        <select className='form-control' value={data.subbidang} onChange={handleSubBidang}>
                            <option value=''>Pilih</option>
                            {subbidang && subbidang?.map((item, index)=> (
                                <option key={index} value={item.SubId}>{item.SubNama}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label>Materi</label>
                        <select className='form-control' value={data.materi} onChange={handleMateri}>
                            <option value=''>Pilih</option>
                            {materi && materi?.map((item, index)=>(
                                <option key={index} value={item.MateriId}>{item.MateriJudul}</option>
                            ))}
                        </select>
                    </div>
                    <div
                        className="table-responsive"
                    >
                        <table
                            className="table table-primary"
                        >
                            <thead>
                                <tr>
                                    <th scope="col" width='10%'>No</th>
                                    <th scope="col" width='60%'>Soal</th>
                                    <th scope="col" width='10%'>Waktu Create</th>
                                    <th scope="col" width='10%'>Waktu Update</th>
                                    <th scope="col" width='10%'>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soal && soal?.map((item, index)=>(
                                <tr key={index}>
                                    <td scope="row">{index+1}</td>
                                    <td><div
                            className="teks"
                            dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.SoalPertanyaan) // Sanitize the HTML content
                            }}
                        /></td>
                                    <td className='teks10 teks-abu'>{item.SoalCreate}</td>
                                    <td className='teks10 teks-abu'>{item.SoalUpdate}</td>
                                    <td align='center'><button className='btn btn-danger btn-xs' onClick={(e)=>handleSimpan(item.SoalId)}><i className='fa fa-check-circle'></i></button></td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
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

export default SectionSoalTambah;
