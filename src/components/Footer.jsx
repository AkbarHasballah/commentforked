import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';

function Footer() {
  return (
    <footer
      className="bg-green-700 text-white py-8 mt-auto"
      style={{
        backgroundColor: '#75A47F',
        position: 'relative',
        marginTop: '50px',
      }}>
      <div className="container mx-auto px-4 flex flex-wrap justify-between  relative">
        <div className="w-full sm:w-1/3 mb-6">
          <img
            src={Logo}
            className="w-32 absolute top-3 left-10 transform -translate-x-1/2 -translate-y-full"
            alt="Logo"
          />
          <div>
            <h1
              style={{
                color: 'white',
                fontSize: '24px',
                fontFamily: 'Plus Jakarta Sans',
                fontWeight: '800',
                lineHeight: '1',
              }}>
              Comment
            </h1>
            <p>
              Aplikasi ini memberikan banyak kesempatan bagi Anda untuk
              berkontribusi dalam menjaga lingkungan. Setiap program yang kami
              tawarkan dirancang untuk memberikan dampak positif yang nyata.
              Mari bersama-sama membuat perubahan!
            </p>
          </div>
        </div>
        <div className="w-full sm:w-1/6 mb-6">
          <h4 className="font-bold mb-2">NAVIGASI</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/trends">Trends</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/register/company">Join Volunteer</Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/6 mb-6 text-end">
          <h4 className="font-bold mb-2">Make Event about Environmental</h4>
          <ul>
            <li>
              <Link to="/register/company">Join Volunteer</Link>
            </li>
          </ul>
        </div>
        <div className="w-full sm:w-1/4 mb-6 text-end">
          <h4 className="font-bold mb-2">Hubungi Kami</h4>
          <ul>
            <li>Jl. Batik Kumeli no 50 Bandung, Indonesia</li>
            <li>Email: C624-PS085@dicoding.org</li>
            <li>Telepon: 085156989516</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-400 mt-8 pt-6 text-center">
        <p className="mb-4">Copyright © 2024. All Rights Reserved</p>
        <div className="flex justify-center space-x-4">
          <i className="icon-class-for-icon1" />
          <i className="icon-class-for-icon2" />
          <i className="icon-class-for-icon3" />
          <i className="icon-class-for-icon4" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
