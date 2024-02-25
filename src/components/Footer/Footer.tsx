import React from 'react';
import './Footer.css'; // Import your CSS file here

interface FooterProps {
  companyName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ companyName, year }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {year} {companyName}</p>
      </div>
    </footer>
  );
};

export default Footer;
