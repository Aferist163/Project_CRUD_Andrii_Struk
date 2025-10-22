import { toast } from 'react-hot-toast';

export const notifyError = (text) => {
  toast.error(text, {
    iconTheme: {
      primary: 'rgba(133, 0, 0, 1)',
      secondary: '#ffffffff',
    },
    style: {
      borderRadius: '100px',
      background: 'transparent',
      backdropFilter: 'blur(50px) saturate(200%)',
      color: '#fff',
      fontSize: '24px',
      marginRight: '84px',
      maxWidth: '500px',
      paddingTop: '16px',
      paddingBottom: '16px',
      marginTop: '14px'
    },
    position: 'top-right',
  });
};

export const notifySuccess = (text) => {
  toast.success(text, {
    iconTheme: {
      primary: '#4c9c00ff',
      secondary: '#ffffffff',
    },
    style: {
      borderRadius: '100px',
      background: 'transparent',
      backdropFilter: 'blur(50px) saturate(200%)',
      color: '#fff',
      fontSize: '24px',
      marginRight: '84px',
      maxWidth: '500px',
      paddingTop: '16px',
      paddingBottom: '16px',
      marginTop: '14px'
    },
    position: 'top-right',
  });
};