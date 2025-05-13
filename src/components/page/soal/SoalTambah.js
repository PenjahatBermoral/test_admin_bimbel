import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SoalTambah() {
    const { id } = useParams();
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
    }, []);
          
    const handlePertanyaan = (content) => {
        setPertanyaan(content);
    };
    const handleJawabA = (content) => {
        setJawabA(content);
    };
    const handleJawabB = (content) => {
        setJawabB(content);
    };
    const handleJawabC = (content) => {
        setJawabC(content);
    };
    const handleJawabD = (content) => {
        setJawabD(content);
    };
    const handleJawabE = (content) => {
        setJawabE(content);
    };
    const handlePemhasan = (content) => {
        setPembahasan(content);
    };
    const arrjawaban = ['A', 'B', 'C', 'D', 'E'];

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

        const hasil = await postRequest(token, 'soal', json);
        if(hasil.code===200 || hasil.code===201){
            toast.success('Data berhasil disimpan', {
                position : 'top-right',
                autoClose : 2000
            });
            setPertanyaan('');
            setJawabA('');
            setJawabB('');
            setJawabC('');
            setJawabD('');
            setJawabE('');
            setPembahasan('');
            setVideo('');

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
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={pertanyaan}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handlePertanyaan}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban A</label>
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={jawaba}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handleJawabA}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban B</label>
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={jawabb}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handleJawabB}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban C</label>
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={jawabc}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handleJawabC}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban D</label>
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={jawabd}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handleJawabD}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Jawaban E</label>
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={jawabe}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handleJawabE}
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
                        <Editor
                            apiKey="h4qnkynx104ea7s0yhngy41uqd0w4et1vcu2meducnxrk5ul"
                            value={pembahasan}
                            init={{
                                height: 200,
                                menubar: true, 
                                plugins: ['link', 'image', 'lists', 'preview', 'table'],
                                toolbar:
                                'undo redo | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | image | forecolor backcolor | insertdatetime | code fullscreen | preview ',
                                toolbar_mode: 'floating',
                                image_advtab: true,
                            }}
                            onEditorChange={handlePemhasan}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Video</label>
                        <input
                            className='form-control'
                            value={video}
                            placeholder='Masukkan Url Video'
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

export default SoalTambah;
