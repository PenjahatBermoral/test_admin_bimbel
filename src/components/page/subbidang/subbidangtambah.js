import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { postRequest } from '../../../services/api';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SubBidangTambah() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [subbidang, setSubBidang] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editorData, setEditorData] = useState('');
  
  const handleEditorChange = (content) => {
    setEditorData(content);
  };


  const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
  useEffect(()=>{
    
  }, []);
  const simpanData = async ()=>{
    const json = {
        'BidangId':parseInt(id),
        'SubNama':subbidang,
        'SubKeterangan':editorData
    }

    const req = await postRequest(token, "sub-bidang", json);
    console.log("Json ", json);
    if (req.code==200 || req.code==201){
        navigate('/sub-bidang/'+id);
    }else{
        Swal.fire({
            title : 'Error',
            text : req.msg,
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
                <div className='card-header'>Tambah Sub Bidang</div>
                <div className='card-body'>
                    <div className="mb-3 mt-3">
                                        <label className="form-label">Bidang</label>
                                        <input 
                                        type="text" 
                                        className="form-control"
                                        placeholder='Masukkan Nama Sub Bidang'
                                        value={subbidang}
                                        onChange={(e)=>setSubBidang(e.target.value)}
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

                    <button className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Simpan</button> &nbsp;
                    <Link to={`/sub-bidang/${id}`} className='btn btn-secondary'>Kembali</Link>
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

export default SubBidangTambah;
