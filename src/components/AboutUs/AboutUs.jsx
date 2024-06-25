import React from 'react';
import { Avatar } from '@mui/material';
import Logo from '../../assets/logo.png';

function AboutUs() {
  return (
    <section className="py-16 px-4  flex flex-wrap items-center ">
      <Avatar
        src={Logo}
        alt="About Us"
        style={{ width: '400px', height: '400px' }}
      />
      <div className="max-w-xl">
        <h1
          style={{
            color: '#4D869C',
            fontSize: 54,
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 700,
            wordWrap: 'break-word',
          }}
          className="font-bold mb-4">
          About Us
        </h1>
        <p
          style={{
            color: '#4D869C',
            fontSize: 18,
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: 400,
            lineHeight: '35px',
            wordWrap: 'break-word',
          }}
          className="text-gray-700">
          Platform online yang menghubungkan masyarakat untuk berpartisipasi
          dalam berbagai event dan inisiatif yang berfokus pada isu lingkungan.
          Platform ini memfasilitasi kolaborasi dan aksi kolektif untuk
          menciptakan perubahan positif bagi lingkungan.
        </p>
      </div>
    </section>
  );
}

export default AboutUs;
