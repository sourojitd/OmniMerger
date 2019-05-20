import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'sonner';
import ParticleBackground from './components/ParticleBackground';
import FileUploader from './components/FileUploader';
import FileList from './components/FileList';
import { mergeFiles } from './components/Merger';
import { Download, Loader2, Sparkles, FileSignature } from 'lucide-react';

function App() {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [outputFilename, setOutputFilename] = useState('omnimerged');

  const handleFilesSelected = (newFiles) => {
    const newFileItems = newFiles.map(file => ({
      id: uuidv4(),
      file,
    }));
    setFiles(prev => [...prev, ...newFileItems]);
    toast.success(`Added ${newFiles.length} file(s)`);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all files?')) {
      setFiles([]);
      toast.info('All files cleared');
    }
  };

  const handleMerge = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setIsMerging(true);
    const toastId = toast.loading('Merging your files...');

    try {
      const mergedPdfBytes = await mergeFiles(files);
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${outputFilename.endsWith('.pdf') ? outputFilename : outputFilename + '.pdf'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Files merged successfully!', { id: toastId });
    } catch (error) {
      console.error('Error merging files:', error);
      toast.error('Failed to merge files. Please try again.', { id: toastId });
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" theme="dark" richColors />
      <ParticleBackground />
      <div className="glass-panel" style={{ maxWidth: '1200px' }}>
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: -1
        }} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem 1rem',
            borderRadius: '50px',
            marginBottom: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            animation: 'fadeIn 1s ease-out'
          }}>
            <Sparkles size={16} color="#a5b4fc" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e2e8f0' }}>
              Premium PDF Merger
            </span>
          </div>

          <h1>OmniMerger</h1>
          <p className="subtitle">
            Drag, drop, and merge your documents with style.
          </p>
        </div>

        <div className="app-grid">
          <div className="upload-section">
            <FileUploader onFilesSelected={handleFilesSelected} />
          </div>

          <div className="list-section">
            <FileList
              files={files}
              setFiles={setFiles}
              onClearAll={handleClearAll}
            />

            {files.length > 0 && (
              <div style={{
                marginTop: '2rem',
                animation: 'slideUp 0.5s ease-out',
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '1.5rem',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    marginBottom: '0.5rem'
                  }}>
                    <FileSignature size={16} />
                    Output Filename
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={outputFilename}
                      onChange={(e) => setOutputFilename(e.target.value)}
                      placeholder="omnimerged"
                      style={{
                        width: '100%',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid var(--glass-border)',
                        padding: '0.8rem 1rem',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.9rem',
                      pointerEvents: 'none'
                    }}>.pdf</span>
                  </div>
                </div>

                <button
                  onClick={handleMerge}
                  disabled={isMerging}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    fontSize: '1.1rem',
                    padding: '1rem 2rem',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  {isMerging ? (
                    <>
                      <Loader2 className="spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Merge {files.length} Files
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .app-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 768px) {
          .app-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        input:focus {
          border-color: var(--primary-color) !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
      `}</style>
    </>
  );
}

export default App;
