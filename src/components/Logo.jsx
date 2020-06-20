import React from 'react';
import { FileText, Image as ImageIcon, FileType } from 'lucide-react';

const Logo = () => {
    return (
        <div className="logo-wrapper">
            <div className="logo-icon-container">
                <div className="animated-border"></div>
                <div className="logo-inner">
                    {/* DOCX Icon (Blue) */}
                    <div className="icon-layer docx">
                        <FileText size={24} color="white" strokeWidth={2.5} />
                        <span className="icon-label">DOCX</span>
                    </div>

                    {/* Image Icon (Green) */}
                    <div className="icon-layer image">
                        <ImageIcon size={24} color="white" strokeWidth={2.5} />
                    </div>

                    {/* PDF Icon (Red) */}
                    <div className="icon-layer pdf">
                        <FileType size={24} color="white" strokeWidth={2.5} />
                        <span className="icon-label">PDF</span>
                    </div>
                </div>
            </div>

            <h1 className="logo-text">OmniMerger</h1>

            <style>{`
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          justify-content: center;
        }

        .logo-icon-container {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .animated-border {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 24px;
          background: linear-gradient(45deg, #ef4444, #3b82f6, #10b981, #f59e0b, #ef4444);
          background-size: 400%;
          z-index: -1;
          animation: borderAnimate 20s linear infinite;
          filter: blur(8px);
          opacity: 0.8;
        }
        
        .animated-border::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          right: 3px;
          bottom: 3px;
          background: var(--bg-dark);
          border-radius: 20px;
          z-index: -1;
        }

        @keyframes borderAnimate {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }

        .logo-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 20px;
          overflow: hidden;
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .icon-layer {
          position: absolute;
          width: 45px;
          height: 55px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 2px 4px 10px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .icon-label {
          font-size: 8px;
          font-weight: 800;
          color: white;
          margin-top: 2px;
        }

        /* DOCX - Blue - Bottom Left */
        .docx {
          bottom: 8px;
          left: 8px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          z-index: 1;
          transform: rotate(-5deg);
        }

        /* Image - Green - Bottom Right */
        .image {
          bottom: 5px;
          right: 5px;
          background: linear-gradient(135deg, #10b981, #059669);
          z-index: 2;
          transform: rotate(5deg);
          height: 45px; /* Square for image */
        }

        /* PDF - Red - Top Center */
        .pdf {
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          z-index: 3;
        }

        .logo-text {
          font-size: 3.5rem;
          font-weight: 800;
          margin: 0;
          background: linear-gradient(to right, #fff, #cbd5e1);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -1px;
          filter: drop-shadow(0 0 20px rgba(255,255,255,0.1));
        }
        
        @media (max-width: 768px) {
          .logo-text {
            font-size: 2.5rem;
          }
          .logo-wrapper {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
        </div>
    );
};

export default Logo;
