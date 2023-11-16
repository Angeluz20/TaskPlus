import '../../styles/globals.css'
import { Header } from '../components/header'
import {SessionProvider} from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {


  return (

      <SessionProvider session={pageProps.session}>  
        <Header/>
        <Component {...pageProps}/>
        <ToastContainer 
          position="top-center"
          autoClose={800}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </SessionProvider> 

  )
}

export default MyApp
