import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest, putRequest } from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SoalEdit() {
    const { id, idsoal } = useParams();
    const [pertanyaan, setPertanyaan] = useState('');
    const [jawaba, setJawabA] = useState('');
    const [jawabb, setJawabB] = useState('');
    const [jawabc, setJawabC] = useState('');
    const [jawabd, setJawabD] = useState('');
    const [jawabe, setJawabE] = useState('');
    const [jawaban, setJawaban] = useState('');
    const [pembahasan, setPembahasan] = useState('');
    const [video, setVideo] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      document.title='Tambah Soal';
      ambilData();
    }, []);
          
    const handlePertanyaan = (event, editor) => {
        const data = editor.getData();
        setPertanyaan(data);
    };
    const handleJawabA = (event, editor) => {
        const data = editor.getData();
        setJawabA(data);
    };
    const handleJawabB = (event, editor) => {
        const data = editor.getData();
        setJawabB(data);
    };
    const handleJawabC = (event, editor) => {
        const data = editor.getData();
        setJawabC(data);
    };
    const handleJawabD = (event, editor) => {
        const data = editor.getData();
        setJawabD(data);
    };
    const handleJawabE = (event, editor) => {
        const data = editor.getData();
        setJawabE(data);
    };
    const handlePemhasan = (event, editor) => {
        const data = editor.getData();
        setPembahasan(data);
    };
    const arrjawaban = ['A', 'B', 'C', 'D', 'E'];
    const ambilData = async() => {
        const hasil = await getRequest(token, "/soal/pilih/" + idsoal);
        setPertanyaan(hasil.SoalPertanyaan);
        setJawabA(hasil.SoalA);
        setJawabB(hasil.SoalB);
        setJawabC(hasil.SoalC);
        setJawabD(hasil.SoalD);
        setJawabE(hasil.SoalE);
        setJawaban(hasil.SoalJawaban);
        setPembahasan(hasil.SoalPembahasan);
        setVideo(hasil.SoalVideo);
        
    }
    const simpanData = async()=> {

        if(pertanyaan===null || jawaba===null || jawabb===null, jawabc===null || jawabd===null || jawabe==null){
            Swal.fire({
                title   : 'Warning',
                text    : 'Form tidak lengkap!',
                icon    : 'warning'
            });
            return false;
        }
        const json = {
            "SoalPertanyaan":pertanyaan,
            "SoalA":jawaba,
            "SoalB":jawabb,
            "SoalC":jawabc,
            "SoalD":jawabd,
            "SoalE":jawabe,
            "SoalJawaban":jawaban,
            "SoalPembahasan":pembahasan,
            "SoalVideo":video,
            "MateriID": parseInt(id)
        }
        const turl = 'soal/' + idsoal;
        const hasil = await putRequest(token, turl, json);
        if(hasil.code===200 || hasil.code===201){
            toast.success('Data berhasil diupdate', {
                position : 'top-right',
                autoClose : 2000
            });
            setTimeout(()=>{
                 navigate('/dashboard/soal/' + parseInt(id));
            }, 2000);
           
        }else{
            Swal.fire({
                title : 'Error',
                text    : hasil.msg,
                icon    : 'error'
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
                  <div className='card-header'>Tambah Soal</div>
                  <div className='card-body'>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Soal</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={pertanyaan}
                            onChange={handlePertanyaan}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban A</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={jawaba}
                            onChange={handleJawabA}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban B</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={jawabb}
                            onChange={handleJawabB}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban C</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={jawabc}
                            onChange={handleJawabC}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban D</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={jawabd}
                            onChange={handleJawabD}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban E</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={jawabe}
                            onChange={handleJawabE}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban</label>
                        <select value={jawaban} onChange={(e)=>setJawaban(e.target.value)} className='form-control col-sm-2'>
                            <option value=''>Pilih</option>
                            {
                                arrjawaban && arrjawaban.map((item, index)=>(
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Pembahasan</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={pembahasan}
                            onChange={handlePemhasan}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Video</label>
                        <input
                            className='form-control'
                            value={video}
                            onChange={(e)=>setVideo(e.target.value)}
                            />
                    </div>

                    <p>

                        <button className='btn btn-success' onClick={simpanData}><i className='fa fa-save'></i> Simpan</button>&nbsp;
                        <Link to={`/dashboard/soal/${id}`} className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>
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

export default SoalEdit;
