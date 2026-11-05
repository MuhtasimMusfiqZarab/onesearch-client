export const processPayment = (id: number = 1) => {
  fetch(`/payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + window.localStorage.getItem('jwtToken')
    },
    body: JSON.stringify({
      items: [
        {
          id,
          quantity: 1
        }
      ]
    })
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
      console.log(url);
    })
    .catch((e) => console.error(e.error));
};
