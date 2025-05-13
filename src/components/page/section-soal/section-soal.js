import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { deleteRequest, getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';
import {toast, ToastContainer} from 'react-toastify'
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SectionSoal() {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getSoalSection();
    }, []);

    const getSoalSection=async()=>{
        const hasil = await getRequest(token, 'soal/list/' + id);
        setData(hasil);
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
                const hasil = await deleteRequest(token, "soal/list/" + nilai);
                if(hasil.code===200 || hasil.code===201){
                    getSoalSection();
                    toast.success('Data berhasil dihapus', {
                        position : 'top-right',
                        autoClose : 1500
                    })
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
                  <div className='card-header'>Soal Section</div>
                  <div className='card-body'>
                    <p><Link to={`/dashboard/section/soal/tambah/${id}`} className='btn btn-primary'>Tambah</Link>&nbsp;</p>
                    <div
                        className="table-responsive"
                    >
                        <table
                            className="table table-primary teks12"
                        >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Pertanyaan</th>
                                    <th scope="col">Jawaban A</th>
                                    <th scope="col">Jawaban B</th>
                                    <th scope="col">Jawaban C</th>
                                    <th scope="col">Jawaban D</th>
                                    <th scope="col">Jawaban E</th>
                                    <th scope="col">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data?.map((item, index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td><div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.Pertanyaan)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.JawabA)
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.JawabB) 
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.JawabC) 
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.JawabD) 
                                            }}
                                        />
                                    </td>
                                    <td>
                                        <div
                                            className="teks"
                                            dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(item.JawabE) 
                                            }}
                                        />
                                    </td>
                                    <td><button className='btn btn-danger btn-xs' onClick={(e)=>hapusData(item.Id)}><i className='fas fa-trash'></i></button></td>
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

export default SectionSoal;
