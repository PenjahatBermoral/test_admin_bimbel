import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import { getRequest, deleteRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DOMPurify from 'dompurify';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';
import '../../../App.css';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function Soal() {
  const { id } = useParams();
  const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      tampilData();
    }, []);
    const tampilData = async() => {
        const hasil = await getRequest(token, "soal/filter/" + id);
        if(data.length>0){
          setData([]);
        }else{
          setData(hasil);
        }
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
          const hasil = await deleteRequest(token, "soal/" + nilai)
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
    const editData = async(nilai) => {
      navigate('/dashboard/soal/edit/' + id + '/' + nilai);
    }
    const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: true,
      style: {
        maxWidth: '50px',
        minWidth: '50px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Soal',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalPertanyaan), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '300px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Jawaban A',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalA), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '300px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Jawaban B',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalB), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '300px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Jawaban C',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalC), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '300px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Jawaban D',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalD), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '300px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: 'Jawaban E',
      selector: (row) => (
        <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(row.SoalE), // Sanitasi HTML
            }}
          />
      ),
      sortable: true,
      style: {
        maxWidth: '350px',
        minWidth: '350px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
    {
      name: '',
      cell: (row) => (
        <div>
        <button
          className="btn btn-danger btn-xs"
          onClick={() => hapus(row.SoalId)}
        >
          <i className="fa fa-trash"></i>
        </button>
        <button
          className='btn btn-info btn-xs'
          onClick={()=> editData(row.SoalId)}
          >
            <i className='fa fa-edit'></i>
        </button>
        </div>
      ),
      style : {
        maxWidth: '70px',
        minWidth: '70px',
        whiteSpace: 'normal',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      ignoreRowClick: true,
    },
    ];
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };
    const filteredData =  data?.filter((item) =>
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
                  <div className='card-header'>Soal</div>
                  <div className='card-body'>
                    <p>
                      <Link to={`/dashboard/soal/tambah/${id}`} className='btn btn-primary'><i className='fas fa-plus'></i> Tambah</Link>
                    </p>
                    <div className="table-responsive">
                        <DataTable
                          columns={columns}
                          data={filteredData}
                          pagination
                          highlightOnHover
                          striped
                          fixedHeader
                          subHeader
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

export default Soal;
