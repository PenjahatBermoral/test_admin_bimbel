import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import { postRequest} from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function Dashboard() {
  const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
  const navigate = useNavigate();
  const [bidang, setBidang] = useState('');
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (content) => {
    setEditorData(content);
  };

  const simpanBidang = async ()=>{
    const json = {
      'BidangNama':bidang,
      'BidangKeterangan':editorData,
      'Tampil':1
    }
    const respon = await postRequest(token, "bidang", json);
    console.log("Hasil : ", respon);
    if(respon.code=='201' || respon.code=='200'){
      navigate('/bidang');
    }else{
      Swal.fire({
        title : 'Error',
        text  : respon.msg,
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
                
            <div className="card">
                <div className="card-header">Tambah Bidang</div>
                <div className="card-body">
                <div className="mb-3 mt-3">
                    <label className="form-label">Bidang</label>
                    <input 
                    type="text" 
                    className="form-control"
                    placeholder='Masukkan Nama Bidang'
                    value={bidang}
                    onChange={(e)=>setBidang(e.target.value)}
                    />
                </div>   
                
                <div className="mb-3 mt-3">
                    <label className="form-label">Keterangan
                    </label>
                    <Editor
                      apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                      value={editorData}
                      init={{
                        height: 500,
                        menubar: true, 
                        plugins: ['link', 'image', 'lists', 'preview', 'table'],
                        toolbar:
                          'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                        toolbar_mode: 'floating',
                        image_advtab: true,
                      }}
                      onEditorChange={handleEditorChange}
                    />
                </div>
                <p><button type='button' className='btn btn-success' onClick={simpanBidang}><i className='fa fa-save'></i> Simpan</button>  &nbsp;
                <Link to='/bidang' className='btn btn-secondary' ><i className='fa fa-arrow-left'></i>Kembali</Link></p>
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

export default Dashboard;
