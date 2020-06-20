import React, { useCallback, useState } from 'react';
import { UploadCloud, FileUp } from 'lucide-react';

const FileUploader = ({ onFilesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      onFilesSelected(files);
    }
  }, [onFilesSelected]);

  return (
    <div
      className={`file-uploader ${isDragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput').click()}
      style={{
        border: '2px dashed var(--glass-border)',
        borderRadius: '20px',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        background: isDragging
          ? 'rgba(99, 102, 241, 0.1)'
          : 'rgba(255, 255, 255, 0.02)',
        borderColor: isDragging ? 'var(--primary-color)' : 'var(--glass-border)',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeIn 1s ease-out 0.4s backwards',
        boxShadow: isDragging ? '0 0 30px rgba(99, 102, 241, 0.2)' : 'none',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input
        type="file"
        id="fileInput"
        multiple
        accept=".pdf,.png,.jpg,.jpeg,.docx"
        style={{ display: 'none' }}
        onChange={handleFileInput}
      />

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2))',
          padding: '1.5rem',
          borderRadius: '50%',
          marginBottom: '0.5rem',
          boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.1) inset',
          animation: isDragging ? 'pulse-glow 2s infinite' : 'none',
        }}>
          {isDragging ? (
            <FileUp size={48} color="#a5b4fc" />
          ) : (
            <UploadCloud size={48} color="#a5b4fc" />
          )}
        </div>

        <h3 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 600,
          background: 'linear-gradient(to right, #fff, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}>
          {isDragging ? 'Drop files now' : 'Click or Drag files here'}
        </h3>

        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Supports PDF, DOCX, PNG, JPG
        </p>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }
        .file-uploader:hover {
          border-color: var(--primary-glow);
          background: rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </div>
  );
};

export default FileUploader;
