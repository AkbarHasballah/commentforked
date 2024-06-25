import React from 'react';
import logovs from '../../assets/logovm.png';
import logov from '../../assets/visi.png';

const VisionMission = () => {
  return (
    <section className="py-16 px-4 sm:px-0 animate-fadeIn" style={{ backgroundColor: '#75A47F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row mb-8">
        <div className="sm:w-1/2 pr-4">
        <h3 className="text-xl font-semibold" style={{ color: 'white', fontSize: 32, fontFamily: 'Plus Jakarta Sans', fontWeight: '700', wordWrap: 'break-word' }}>Visi</h3>
        <p style={{ color: 'white', fontSize: 18, fontFamily: 'Plus Jakarta Sans', fontWeight: '400', wordWrap: 'break-word',marginTop: '1rem' }}>
            Menjadi platform yang menghubungkan masyarakat dalam aksi bersama untuk menciptakan lingkungan yang bersih dan lestari.
          </p>
        </div>
        <div className="sm:w-1/2">
          <img src={logovs} alt="Vision" className="w-full h-auto" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col-reverse sm:flex-row items-center mt-8">
        <div className="sm:w-1/3 mb-8 sm:mb-0">
          <img src={logov} alt="Mission" className="w-full h-auto sm:mr-8" />
        </div>
        <div className="sm:w-2/3 sm:text-right">
        <h3 className="text-xl font-semibold" style={{ color: 'white', fontSize: 32, fontFamily: 'Plus Jakarta Sans', fontWeight: '700', wordWrap: 'break-word' }}>Misi</h3>
          <p className="text-white my-4" style={{ fontSize: 18, fontWeight: 400 }}>
            <strong>Memfasilitasi partisipasi.</strong> Menawarkan platform yang mudah digunakan
            untuk bergabung dalam event dan inisiatif lingkungan.
          </p>
          <p className="text-white my-4" style={{ fontSize: 18, fontWeight: 400 }}>
            <strong>Kolaborasi dan solusi.</strong> Mendorong kerja sama dan pertukaran
            pengetahuan untuk menemukan solusi inovatif.
          </p>
          <p className="text-white my-4" style={{ fontSize: 18, fontWeight: 400 }}>
            <strong>Kesadaran dan aksi.</strong> Meningkatkan pemahaman tentang isu lingkungan dan mendorong tindakan nyata.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
