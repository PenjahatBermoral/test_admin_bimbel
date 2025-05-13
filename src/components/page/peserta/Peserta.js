import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { getRequest, deleteRequest, notifSuccess } from '../../../services/api';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function Peserta() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampilData();
    }, []);
    const tampilData = async() => {
        const hasil = await getRequest(token, "peserta");
      setData(hasil);
    }

    const hapus = async (nilai) => {
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
          const hasil = await deleteRequest(token, "peserta/" + nilai)
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
    name: 'Email',
    selector: (row) => row.peserta_email,
    sortable: true,
    style: {
      whiteSpace: 'normal',
      whiteSpace: 'nowrap',
      overflow: 'auto',
    },
  },
  {
    name: 'Nama',
    selector: (row) => row.peserta_nama,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'J.Kelamin',
    selector: (row) => row.peserta_jk,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'No Hp',
    selector: (row) => row.peserta_nohp,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'Pendidikan Terakhir',
    selector: (row) => row.peserta_pendidikanterakhir,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'Asal Sekolah',
    selector: (row) => row.peserta_asalsekolah,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'Periode',
    selector: (row) => row.peserta_periode,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: '',
    cell: (row) => (
      <button
        className="btn btn-danger btn-xs"
        onClick={() => hapus(row.peserta_id)}
      >
        <i className="fa fa-trash"></i>
      </button>
    ),
    ignoreRowClick: true
  },
    ];
    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
    const filteredData = data?.filter((item) =>
      Object.values(item)
      .join(' ')
      .toLowerCase()
      .includes(searchText.toLowerCase())
    );

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
                  <div className='card-header'>Peserta</div>
                  <div className='card-body'>
                    <p>
                        <Link to='/dashboard/peserta/tambah' className='btn btn-primary'><i className='fa fa-plus'></i> Tambah</Link> &nbsp;
                    </p>
                    <div className="table-responsive">
                        <DataTable
                          columns={columns}
                          data={filteredData}
                          pagination
                          responsive
                          highlightOnHover
                          striped
                          subHeader
                          fixedHeader
                          subHeaderComponent={
                            <input
                              type="text"
                              className="form-control col-sm-3"
                              placeholder="Kata Kunci"
                              value={searchText}
                              onChange={handleSearch} // Fungsi pencarian
                            />
                          }
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

export default Peserta;
