export const setBaseURL = () => {
  if (window) {
    let newHost = process.env.NEXT_PUBLIC_API_ENDPOINT;

    if (!newHost) {
      return;
    }

    if (!newHost.startsWith('http://')) {
      newHost = `http://${newHost}`;
    }

    if (newHost[newHost.length - 1] !== '/') {
      newHost += '/';
    }

    localStorage.setItem('BASE_URL', newHost);
  }
};

export const getBaseURL = () => localStorage.getItem('BASE_URL');
