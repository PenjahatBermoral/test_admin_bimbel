import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteRequest, reqBidang } from '../../../services/api';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../App.css';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function BidangData() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
  useEffect(()=>{
    const handleGet = async () => {
      const response = await reqBidang(token);
      console.log("Response = ", response);
      setData(response);
    }
    handleGet();
  }, []);

  const handleDelete = async(id) => {
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
        const hasil = await deleteRequest(token, "/bidang/" + id)
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
             <p><Link to="/bidang/tambah" className='btn btn-primary'>Tambah</Link></p> 
            
        <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Bidang</th>
            <th>Keterangan</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item.BidangId}>
              <td>{item.BidangId}</td>
              <td>{item.BidangNama}</td>
              <td>{item.BidangKeterangan}</td>
              <td align='center'>
                <button className='btn btn-info btn-xs' onClick={()=>navigate('/sub-bidang/' + item.BidangId)}><i className='fa fa-eye'></i></button>&nbsp;
                <button className='btn btn-info btn-xs'><i className='fa fa-edit'></i></button>&nbsp;
                <button onClick={()=>handleDelete(item.BidangId)}  className='btn btn-danger btn-xs'><i className='fa fa-trash'></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div></div></section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BidangData;
