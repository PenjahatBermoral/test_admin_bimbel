import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to='/dashboard' className='brand-link'>
      <span className="brand-text font-weight-light">AdminLTE</span>
      </Link>
      <div className="sidebar">
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/bidang" className="nav-link">
                <i className="nav-icon fas fa-list"></i>
                <p>Bidang</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/peserta" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Peserta</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/periode" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Periode</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/asal-daerah" className="nav-link">
                <i className="nav-icon fas fa-paperclip"></i>
                <p>Asal Daerah</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/paket/peserta" className="nav-link">
                <i className="nav-icon fas fa-paperclip"></i>
                <p>Paket Peserta</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/section" className="nav-link">
                <i className="nav-icon fas fa-paperclip"></i>
                <p>Section Soal</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/ujian" className="nav-link">
                <i className="nav-icon fas fa-paperclip"></i>
                <p>Ujian</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
