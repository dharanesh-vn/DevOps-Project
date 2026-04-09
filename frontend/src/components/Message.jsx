import React from 'react';

const Message = ({ variant = 'info', children }) => {
  const colors = {
    info: { bg: 'rgba(56, 189, 248, 0.1)', border: '#38bdf8', text: '#bae6fd' },
    danger: { bg: 'rgba(248, 113, 113, 0.1)', border: '#f87171', text: '#fca5a5' },
    success: { bg: 'rgba(74, 222, 128, 0.1)', border: '#4ade80', text: '#bbf7d0' },
  };

  const style = colors[variant] || colors.info;

  return (
    <div style={{
      padding: '1rem',
      borderRadius: '8px',
      backgroundColor: style.bg,
      borderLeft: `4px solid ${style.border}`,
      color: style.text,
      marginBottom: '1rem'
    }}>
      {children}
    </div>
  );
};

export default Message;
