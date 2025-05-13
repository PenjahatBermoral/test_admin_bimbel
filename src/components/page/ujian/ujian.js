import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { getRequest, postRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import $ from 'jquery';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css'; // Untuk Bootstrap 4
import 'datatables.net-bs4';
import { iconTampil } from '../../../store/myfunction';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function FormUjian() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      document.title='Ujian';
      getUjian();
      
    }, []);

    const getUjian = async() => {
        const hasil = await getRequest(token, "ujian/data/section");
        setData(hasil);

        setTimeout(() => {
        $('#tabelku').DataTable();
      }, 1500);

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
                  <div className='card-header'>Data Ujian</div>
                  <div className='card-body'>
                    <div
                        className="table-responsive"
                    >
                        <table
                            className="table table-bordered" id='tabelku'
                        >
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Section</th>
                                    <th scope="col">Tgl Ujian</th>
                                    <th scope="col">Awal Ujian</th>
                                    <th scope="col">Akhir Ujian</th>
                                    <th scope="col">Durasi</th>
                                    <th scope="col" align='center'>Tampil</th>
                                    <th scope="col">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                 {data && data.map((item, index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.SectionNama}</td>
                                    <td>{item.TglUjian}</td>
                                    <td>{item.AwalUjian}</td>
                                    <td>{item.AkhirUjian}</td>
                                    <td>{item.Durasi}</td>
                                    <td align='center'>{iconTampil(item.Tampil)}</td>
                                    <td><Link to={`/dashboard/ujian/edit/${item.Id}`} className='btn btn-info btn-xs'><i className='fa fa-edit'></i></Link></td>
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
export default FormUjian;