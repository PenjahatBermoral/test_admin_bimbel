import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { Editor } from '@tinymce/tinymce-react';
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';
import { faStreetView } from '@fortawesome/free-solid-svg-icons';

function MateriTambah() {
    const { id } = useParams();
    const [materi, setMateri] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editorData, setEditorData] = useState('');
    const [video, setVideo] = useState('');
      
    const handleEditorChange = (content) => {
    setEditorData(content);
  };

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      
    }, []);

    const simpanData = async ()=>{
        const json = {
            "SubId":parseInt(id),
            "MateriJudul":materi,
            "MateriIsi":editorData,
            "MateriVideo" : video
        }

        const hasil = await postRequest(token, 'materi', json);
        if(hasil.code===200 || hasil.code===201){
            navigate('/materi/' + id);
        }else{
            Swal.fire({
                title : 'Error',
                text  : hasil.msg,
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
                  <div className='card-header'>Tambah Materi</div>
                  <div className='card-body'>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Judul Materi</label>
                        <input 
                        type="text" 
                        className="form-control"
                        placeholder='Masukkan Judul Materi'
                        value={materi}
                        onChange={(e)=>setMateri(e.target.value)}
                        />
                    </div>

                    <div className='mb-3'>
                      <label>Url Video Materi</label>
                      <input className='form-control' value={video} onChange={(e)=>setVideo(e.target.value)}/>
                    </div>
                    
                    <div className="mb-3 mt-3">
                        <label className="form-label">Materi
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
                    <button className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Simpan</button>&nbsp;
                <Link to={`/materi/${id}`} className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default MateriTambah;
