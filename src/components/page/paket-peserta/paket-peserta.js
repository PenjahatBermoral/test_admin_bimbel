import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { getRequest, deleteRequest } from '../../../services/api';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import Sidebar from '../../../components/template/Sidebar';
import Navbar from '../../../components/template/Navbar';
import Footer from '../../../components/template/Footer';
import Header from '../../../components/template/Header';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

function PaketPeserta() {

    const [data, setData] = useState({
        'bidang':0
    });
    const [searchText, setSearchText] = useState('');
    const [bidang, setBidang] = useState([]);
    const [peserta, setPeserta] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token) || sessionStorage.getItem('authToken');
    useEffect(()=>{
      getBidang();
    }, []);
    const getBidang = async ()=> {
        const hasil = await getRequest(token, "bidang");
        setBidang(hasil);

    }
    const getData = async(nilai)=> {
        if(nilai!=0){
            const hasil = await getRequest(token, 'peserta/bidang/' + nilai);
            setPeserta(hasil);
        }else{
            setPeserta([]);
        }
    }

    const handleBidang = (e) => {
        const nilai=e.target.value;
        setData((prevData)=>({
            ...prevData,
            bidang : nilai
        }));
        getData(nilai);
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
              const hasil = await deleteRequest(token, "peserta/bidang/" + nilai)
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
        maxWidth : '50px',
        minWidth : '50px'
    }
  },
  {
    name: 'Nama',
    selector: (row) => row.PesertaNama,
    sortable: true,
    style: {
      whiteSpace: 'normal',
      overflow:'hidden'
    },
  },
  {
    name: 'Expired',
    selector: (row) => row.Expired,
    sortable: true,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  {
    name: 'Aktif',
    selector: (row) => row.Aktif,
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
        <div>
        <Link to={`/dashboard/paket/peserta/edit/${row.Id}`} className='btn btn-info btn-xs'><i className='fas fa-edit'></i></Link>
      <button
        className="btn btn-danger btn-xs"
        onClick={() => hapus(row.Id)}
      >
        <i className="fas fa-trash"></i>
      </button>
        </div>
      
    ),
    style : {
        minWidth : '120px',
        maxWidth : '120px'
    },
    ignoreRowClick: true
  },
    ];
    const handleSearch = (event) => {
      setSearchText(event.target.value);
    };
    const filteredData = peserta?.filter((item) =>
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
                <div className='col-sm-3'>
                    <div className='mb-3'>
                        <label>Bidang</label>
                        <select
                        className='form-control'
                        value={data.bidang}
                        onChange={handleBidang}>
                            <option value=''>Pilih</option>
                            {
                                bidang && bidang.map((item,index)=>(
                                    <option key={index} value={item.BidangId}>{item.BidangNama}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
              <div className="col-sm-9">
                <div className='card'>
                  <div className='card-header'>Paket Peserta</div>
                  <div className='card-body'>
                    <p>
                        <Link to='/dashboard/paket/peserta/tambah' className='btn btn-primary'><i className='fa fa-plus'></i> Tambah</Link>
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

export default PaketPeserta;
