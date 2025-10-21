import { toast } from 'react-hot-toast';

export const notifyError = (text) => {
  toast.error(text, {
    iconTheme: {
      primary: '#ff7b71ff',
      secondary: '#fff',
    },
    style: {
      borderRadius: '100px',
      background: 'linear-gradient(124deg,rgba(48, 118, 145, 0.7) 0%, rgba(58, 118, 156, 0.7) 26%, rgba(136, 189, 191, 0.7) 100%)',
      color: '#fff',
      fontSize: '24px',
      marginRight: '10px',
      maxWidth: '500px',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginTop: '10px'
    },
    position: 'top-right',
  });
};

export const notifySuccess = (text) => {
  toast.success(text, {
    iconTheme: {
      primary: '#c6ff90ff',
      secondary: '#5c5c5cff',
    },
    style: {
      borderRadius: '100px',
      background: 'linear-gradient(124deg,rgba(48, 118, 145, 0.7) 0%, rgba(58, 118, 156, 0.7) 26%, rgba(136, 189, 191, 0.7) 100%)',
      color: '#fff',
      fontSize: '24px',
      marginRight: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginTop: '10px'
    },
    position: 'top-right',
  });
};