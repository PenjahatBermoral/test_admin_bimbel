import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { getRequest, deleteRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import '../../../App.css';
import { iconTampil } from '../../../store/myfunction';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';

function DataSection() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getData();
    }, []);

    const getData = async()=> {
        const data = await getRequest(token, "soal/section");
        if(data!=null){
            setData(data);
        }else{
            setData([]);
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
              const hasil = await deleteRequest(token, "soal/section/" + nilai)
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
        style : {
            maxWidth:'50px',
            minWidth:'50px'
        }
      },
      {
        name: 'Section',
        selector: (row) => row.SectionNama,
        sortable: true,
        style: {
          whiteSpace: 'normal',
          whiteSpace: 'nowrap',
          overflow: 'auto',
        },
      },
      {
        name: 'Status',
        selector: (row) =>iconTampil(row.SectionTampil),
        sortable: true,
        style: {
            minWidth : '100px',
            maxWidth : '100px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
      },
      {
        name: '',
        cell: (row) => (
          <div>
          <button
            className="btn btn-danger btn-xs"
            onClick={() => hapus(row.SectionId)}
          >
            <i className="fas fa-trash"></i>
          </button>
          <Link to={`/dashboard/section/edit/${row.SectionId}`} className='btn btn-info btn-xs'><i className='fas fa-edit'></i></Link>
          <Link to={`/dashboard/section/peserta/${row.SectionId}`} className='btn btn-dark btn-xs'><i className='fas fa-list'></i></Link>
          <Link to={`/dashboard/section/soal/${row.SectionId}`} className='btn btn-primary btn-xs'><i className='fas fa-table'></i></Link>
          </div>
        ),
        style : {
            minWidth: '200px',
            maxWidth : '200px',
            textAlign : 'right'
        },
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
                  <div className='card-header'>Section Ujian</div>
                  <div className='card-body'>
                    <p>
                        <Link to='/dashboard/section/tambah' className='btn btn-primary'><i className='fa fa-plus'></i> Tambah</Link>
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
                          bordered
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

export default DataSection;
