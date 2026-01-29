import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/CustomToast.css';

import { initSocket } from './services/socket';

const App = () => {
  useEffect(() => {
    initSocket();
  }, []);

  return (
    <Router>
      <AppRouter />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
    </Router>
  );
};

export default App;