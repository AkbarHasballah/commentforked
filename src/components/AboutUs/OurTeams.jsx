import React from 'react';
import { Avatar } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import team1 from '../../assets/team1.jpg';
import team2 from '../../assets/team2.jpg';
import team3 from '../../assets/team3.jpg';

function OurTeams() {
  return (
    <section
      className="py-16 px-4 text-center animate-fadeIn"
      style={{ backdropFilter: 'blur(1px)' }}>
      <h2
        className="mb-8"
        style={{
          color: 'black',
          fontSize: '48px',
          fontFamily: 'Plus Jakarta Sans',
          fontWeight: 700,
          lineHeight: '57.60px',
          wordWrap: 'break-word',
        }}>
        Our Teams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-[#75A47F] p-6 rounded-xl shadow-md flex flex-col items-center">
          <Avatar
            src={team1}
            alt="Team Member 1"
            className="mb-4"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">
              Satria Abimanyu Putra Wijayatama
            </h3>
            <p className="text-gray-200">UI/UX</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/satriaabimanyu/"
                target="_blank"
                rel="noopener noreferrer">
                <LinkedInIcon className="text-white" />
              </a>
              <a
                href="https://github.com/Bima595"
                target="_blank"
                rel="noopener noreferrer">
                <GitHubIcon className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/bima_pensi"
                target="_blank"
                rel="noopener noreferrer">
                <InstagramIcon className="text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-[#75A47F] p-6 rounded-xl shadow-md flex flex-col items-center">
          <Avatar
            src={team2}
            alt="Team Member 2"
            className="mb-4"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">
              Hendri Wahyu Perdana
            </h3>
            <p className="text-gray-200">Front-End Developer</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/hendri-whyu"
                target="_blank"
                rel="noopener noreferrer">
                <LinkedInIcon className="text-white" />
              </a>
              <a
                href="https://github.com/hendri-wahyu"
                target="_blank"
                rel="noopener noreferrer">
                <GitHubIcon className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/hendri.whyu"
                target="_blank"
                rel="noopener noreferrer">
                <InstagramIcon className="text-white" />
              </a>
            </div>
          </div>
        </div>
        <div className="bg-[#75A47F] p-6 rounded-xl shadow-md flex flex-col items-center">
          <Avatar
            src={team3}
            alt="Team Member 3"
            className="mb-4"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">
              Salman Akbar Hasbullah
            </h3>
            <p className="text-gray-200">Back-End Developer</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a
                href="https://www.linkedin.com/in/salman-akbar-hasbullah/"
                target="_blank"
                rel="noopener noreferrer">
                <LinkedInIcon className="text-white" />
              </a>
              <a
                href="https://github.com/AkbarHasballah"
                target="_blank"
                rel="noopener noreferrer">
                <GitHubIcon className="text-white" />
              </a>
              <a
                href="https://www.instagram.com/salmanak_h/"
                target="_blank"
                rel="noopener noreferrer">
                <InstagramIcon className="text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurTeams;
