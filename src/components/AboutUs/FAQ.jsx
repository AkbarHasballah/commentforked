import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold mb-8 text-center">FAQ</h2>
      <div className="w-auto mx-auto">
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            className="mb-4"
            sx={{ borderRadius: '8px' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(null)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                textDecoration: hoveredIndex === index ? 'underline' : 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Typography className="font-medium">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails className="bg-BBD7BE">
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </section>
  );
};

// Data pertanyaan dan jawaban
const faqData = [
  {
    question: 'Bagaimana mengelola acara agar tetap bersih?',
    answer: 'Kami menyediakan panduan dan peralatan untuk memastikan kebersihan acara.',
  },
  {
    question: 'Bagaimana cara berpartisipasi dalam event?',
    answer: 'Anda bisa mendaftar melalui platform kami dan memilih event yang ingin diikuti.',
  },
  {
    question: 'Apakah ada biaya untuk berpartisipasi?',
    answer: 'Tidak, semua event kami gratis dan terbuka untuk umum.',
  },
  {
    question: 'Bagaimana cara menghubungi kami?',
    answer: 'Anda bisa menghubungi kami melalui halaman kontak di platform kami.',
  },
];

export default FAQSection;
