import hmac256 from 'crypto-js/hmac-sha256';

const signRequest = (key: string, url: string): string => {
  const nowMiliseconds = new Date().getTime() - 1000;
  let query = '';
  let URL = url;

  if (url.includes('?')) {
    query += url.split('?')[1];
    query += `&timestamp=${nowMiliseconds}`;
    URL += `&timestamp=${nowMiliseconds}`;
  } else {
    query += `?timestamp=${nowMiliseconds}`;
    URL += `?timestamp=${nowMiliseconds}`;
  }

  const signature = hmac256(query.replace('?', ''), key);

  return `${URL}&signature=${signature.toString()}`;
};

export default signRequest;
