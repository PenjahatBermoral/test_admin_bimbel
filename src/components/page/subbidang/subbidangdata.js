import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate,useParams  } from 'react-router-dom'; 
import { getRequest, deleteRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function SubBidangData() {
  const { id } = useParams();
  const no = 0;
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
  
  useEffect(()=>{
    getData();
  }, []);

  const getData = async() =>{
    const respon = await getRequest(token, "/sub-bidang/filter/" + id);
    setData(respon);
  }

  const btnTambah = () =>{
    navigate('/sub-bidang/' + id + '/tambah');
  }

  const hapusData = async(idx) => {
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
            console.log(`Deleting item with ID: ${id}`);
            const hasil = await deleteRequest(token, "/sub-bidang/" + id)
            console.log("Hasil : ", hasil);
            if(hasil.code==201 || hasil.code==200){
              window.location.reload();
            }else{
              Swal.fire(
                'Error!',
                hasil.msg,
                'error'
              );
            }
          
          }
        });
  }

  const openUrl=(url)=>{
    navigate(url);
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
                <div className='card-header'>Sub Bidang</div>
                <div className='card-body'>
                    <p>
                        <Link to='/bidang' className='btn btn-secondary'><i className='fa fa-arrow-left'></i> Kembali</Link>&nbsp;
                        <button className='btn btn-primary' onClick={btnTambah}><i className='fa fa-plus'></i> Tambah</button>
                    </p>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr>
                            <th>No</th>
                            <th>Sub Bidang</th>
                            <th>Keterangan</th>
                            <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                        {data && data.map((item, indeks) => (
                            <tr>
                            <td>{indeks+1}</td>
                            <td>{item.SubNama}</td>
                            <td>{item.SubKeterangan}</td>
                            <td align='center'>
                                <button className='btn btn-info btn-xs' onClick={()=>openUrl('/materi/' + item.SubId)}><i className='fa fa-eye'></i></button>
                                <button className='btn btn-info btn-xs'><i className='fa fa-edit'></i></button>&nbsp;
                                <button className='btn btn-danger btn-xs' onClick={()=>hapusData(item.SubId)}><i className='fa fa-trash'></i></button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
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

export default SubBidangData;
