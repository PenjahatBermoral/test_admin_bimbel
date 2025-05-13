import { ToastContainer, toast } from 'react-toastify'; // Correct import
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported
function Footer() {
    return (
      <><ToastContainer /><footer className="main-footer">
        <div className="float-right d-none d-sm-inline">
          Anything you want
        </div>
        <strong>&copy; 2025 <a href="https://adminlte.io">AdminLTE.io</a></strong>
      </footer></>
    );
  }
  
  export default Footer;
  