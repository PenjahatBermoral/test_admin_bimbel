import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
import { AuthProvider } from './auth-context'; 
import Dashboard from './components/dashboard';
import Login from './components/login';
import BidangData from './components/page/bidang/BidangData';
import BidangTambah from './components/page/bidang/BidangTambah';
import NotFound from './components/NotFound';
import SubBidangData from './components/page/subbidang/subbidangdata';
import SubBidangTambah from './components/page/subbidang/subbidangtambah';
import Materi from './components/page/materi/materi';
import MateriTambah from './components/page/materi/MateriTambah';
import PrivateRoute from './PrivateRoute';
import Peserta from './components/page/peserta/Peserta';
import PesertaTambah from './components/page/peserta/PesertaTambah';
import Periode from './components/page/periode/Periode';
import PeriodeTambah from './components/page/periode/PeriodeTambah';
import AsalDaerah from './components/page/asal-daerah/AsalDaerah';
import AsalDaerahTambah from './components/page/asal-daerah/AsalDaerahTambah';
import Soal from './components/page/soal/Soal';
import Logout from './components/logout';
import SoalTambah from './components/page/soal/SoalTambah';
import SoalEdit from './components/page/soal/SoalEdit';
import PaketPeserta from './components/page/paket-peserta/paket-peserta';
import PaketPesertaTambah from './components/page/paket-peserta/tambah';
import PaketPesertaEdit from './components/page/paket-peserta/edit';
import DataSection from './components/page/section/data-section';
import DataSectionTambah from './components/page/section/data-section-tambah';
import DataSectionEdit from './components/page/section/data-section-edit';
import SectionPesertaData from './components/page/section-peserta/section-peserta-data';
import SectionPesertaDataTambah from './components/page/section-peserta/section-peserta-tambah';
import SectionSoal from './components/page/section-soal/section-soal';
import SectionSoalTambah from './components/page/section-soal/section-soal-tambah';
import FormUjian from './components/page/ujian/ujian';
import FormUjianEdit from './components/page/ujian/ujian-edit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path='*' element={<NotFound/>}/>

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>}/>} />
          <Route path="/bidang" element={<PrivateRoute element={<BidangData/>}/>} />
          <Route path="/bidang/tambah" element={<PrivateRoute element={<BidangTambah/>}/>} />
          <Route path="/sub-bidang/:id" element={<PrivateRoute element={<SubBidangData/>}/>} />
          <Route path="/sub-bidang/:id/tambah" element={<PrivateRoute element={<SubBidangTambah/>}/>} />
          <Route path="/materi/:id" element={<PrivateRoute element={<Materi/>}/>} />
          <Route path="/materi/tambah/:id" element={<PrivateRoute element={<MateriTambah/>}/>} />
          
          <Route path="/dashboard/peserta" element={<PrivateRoute element={<Peserta/>}/>} />
          <Route path="/dashboard/peserta/tambah" element={<PrivateRoute element={<PesertaTambah/>}/>} />

          <Route path="/dashboard/periode" element={<PrivateRoute element={<Periode/>}/>} />
          <Route path="/dashboard/periode/tambah" element={<PrivateRoute element={<PeriodeTambah/>}/>} />

          <Route path="/dashboard/asal-daerah" element={<PrivateRoute element={<AsalDaerah/>}/>} />
          <Route path="/dashboard/asal-daerah/tambah" element={<PrivateRoute element={<AsalDaerahTambah/>}/>} />

          <Route path="/dashboard/soal/:id" element={<PrivateRoute element={<Soal/>}/>} />
          <Route path="/dashboard/soal/tambah/:id" element={<PrivateRoute element={<SoalTambah/>}/>} />
          <Route path="/dashboard/soal/edit/:id/:idsoal" element={<PrivateRoute element={<SoalEdit/>}/>} />

          <Route path="/dashboard/paket/peserta" element={<PrivateRoute element={<PaketPeserta/>}/>} />
          <Route path="/dashboard/paket/peserta/tambah" element={<PrivateRoute element={<PaketPesertaTambah/>}/>} />
          <Route path="/dashboard/paket/peserta/edit/:id" element={<PrivateRoute element={<PaketPesertaEdit/>}/>} />


          <Route path="/dashboard/section" element={<PrivateRoute element={<DataSection/>}/>} />
          <Route path="/dashboard/section/tambah" element={<PrivateRoute element={<DataSectionTambah/>}/>} />
          <Route path="/dashboard/section/edit/:id" element={<PrivateRoute element={<DataSectionEdit/>}/>} />

          <Route path="/dashboard/section/peserta/:id" element={<PrivateRoute element={<SectionPesertaData/>}/>} />
          <Route path="/dashboard/section/peserta/tambah/:id" element={<PrivateRoute element={<SectionPesertaDataTambah/>}/>} />

          <Route path="/dashboard/section/soal/:id" element={<PrivateRoute element={<SectionSoal/>}/>} />
          <Route path="/dashboard/section/soal/tambah/:id" element={<PrivateRoute element={<SectionSoalTambah/>}/>} />

          <Route path="/dashboard/ujian" element={<PrivateRoute element={<FormUjian/>}/>} />
          <Route path="/dashboard/ujian/edit/:id" element={<PrivateRoute element={<FormUjianEdit/>}/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
