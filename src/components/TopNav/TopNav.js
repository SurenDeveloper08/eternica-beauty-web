import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SearchBar from '../SearchBar/SearchBar';

const Nav = () => {
    return (
        <nav className="navbar navbar-expand py-2" style={{ background: '#4C348C' }}>
            <div className="container d-flex justify-content-between align-items-center">

               <div className="d-flex flex-column flex-md-row">
                    <div className="d-flex align-items-center me-md-4 mb-1 mb-md-0">
                        <EmailIcon fontSize="small" className="me-1 text-light" />
                        <a className="text-light text-decoration-none" href="mailto:support@example.com">
                          sales@eternicabeauty.com
                        </a>
                    </div>
                    <div className="d-flex align-items-center">
                        <PhoneIcon fontSize="small" className="me-1 text-light" />
                        <a className="text-light text-decoration-none" href="tel:+971 55 901 5488">
                           +971 52 398 7292
                        </a>
                    </div>
                </div>

                <div className="d-none d-md-flex flex-grow-1 justify-content-center">
                    <SearchBar width={'400px'} />
                </div>

               <div className="d-flex align-items-center">
                    <a href="#" className="text-light me-3"><FacebookIcon fontSize="small" /></a>
                    <a href="#" className="text-light me-3"><TwitterIcon fontSize="small" /></a>
                    <a href="#" className="text-light me-3"><InstagramIcon fontSize="small" /></a>
                    <a href="#" className="text-light"><LinkedInIcon fontSize="small" /></a>
                </div>

            </div>
        </nav>
    )
}

export default Nav