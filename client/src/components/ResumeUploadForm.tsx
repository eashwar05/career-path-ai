import React, { useState, ChangeEvent, FormEvent } from 'react';
import api from '../services/api';

const ResumeUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setParsedData(null);
      setError('');
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a resume file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', file);

    setUploading(true);
    setError('');
    setParsedData(null);

    try {
      const response = await api.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setParsedData(response.data.parsed);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error uploading the resume. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Your Resume for Analysis</h2>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={onFileChange}
          disabled={uploading}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {parsedData && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          <h3>Parsed Resume Data</h3>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUploadForm;
