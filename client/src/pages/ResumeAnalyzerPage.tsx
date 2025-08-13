import React from 'react';
import ResumeUploadForm from '../components/ResumeUploadForm';

const ResumeAnalyzerPage: React.FC = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Resume Analyzer</h1>
      <ResumeUploadForm />
    </div>
  );
};

export default ResumeAnalyzerPage;
