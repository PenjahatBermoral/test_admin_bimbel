import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SectionPesertaData() {
    const {id} = useParams();
    const [pesertaujian ,setPesertaUjian] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getData();
    }, []);
    const getData = async()=> {
        const hasil = await getRequest(token, "ujian/peserta/" + id);
        if(hasil!=null){
        setPesertaUjian(hasil);
        }else{
        setPesertaUjian([]);
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
                  <div className='card-header'>Data Peserta Ujian</div>
                  <div className='card-body'>
                    <p><Link to={`/dashboard/section/peserta/tambah/${id}`} className='btn btn-primary'><i className='fa fa-plus'></i> Tambah</Link></p>
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
                            {pesertaujian && pesertaujian?.map((item, index)=>(
                            <tr class="" key={index}>
                              <td scope="row">{index+1}</td>
                              <td>{item.PesertaNama}</td>
                              <td>{item.SectionNama}</td>
                              <td>&nbsp;</td>
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

export default SectionPesertaData;
