import '../styles/globals.css'; // Import TailwindCSS and global styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import FontAwesome CSS
import AOS from 'aos'; // Import AOS for animations
import 'aos/dist/aos.css'; // Import AOS styles
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init(); // Initialize AOS animations when the app loads
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
