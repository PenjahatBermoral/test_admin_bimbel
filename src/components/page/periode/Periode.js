import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { deleteRequest, getRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function Periode() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tableRef = useRef(null);

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampil();
    }, []);

    const tampil = async() => {
        const hasil = await getRequest(token, "periode");
        setData(hasil);
    }

    const hapus = async(nilai)=> {
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
                const hasil = await deleteRequest(token, "periode/" + nilai)
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
const columns = [
  {
    name: 'No',
    selector: (row, index) => index + 1,
    sortable: true,
  },
  {
    name: 'Periode',
    selector: (row) => row.PeriodeNama,
    sortable: true,
    style: {
      overflow: 'hidden', // Menghindari overflow
      textOverflow: 'ellipsis', // Memotong teks dengan elipsis
      whiteSpace: 'nowrap', // Membuat teks dalam satu baris
    },
  },
  {
    name: '',
    cell: (row) => (
      <button
        className="btn btn-danger btn-xs"
        onClick={() => hapus(row.PeriodeNama)}
      >
        <i className="fa fa-trash"></i>
      </button>
    ),
    ignoreRowClick: true
  },
];

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
                  <div className='card-header'>Periode</div>
                  <div className='card-body'>
                    <p>
                        <Link to='/dashboard/periode/tambah' className='btn btn-primary'><i className='fa fa-plus'></i> Tambah Periode</Link>
                    </p>
                    <div>
      <DataTable
      
        columns={columns}
        data={data && data.length > 0 ? data : []}
        pagination
        responsive
      />
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

export default Periode;
