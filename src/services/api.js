
const apiUrl = process.env.REACT_APP_API_URL;
export const loginRequest = async (token, username, password) => {
  const rawData = `{"Username":"${username}","Password":"${password}"}`;
  try {
    const response = await fetch(`${apiUrl}/login/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: rawData
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const reqBidang = async (token) => {
  if(token==='' || token===null){
    window.location.href = '/logout';
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/bidang`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const postRequest = async (token, url,  value) => {
  if(token==='' || token===null){
    window.location.href = '/logout';
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      method: 'POST',
      headers: {
        'Authorization': token
      },
      body : JSON.stringify(value)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRequest = async (token, url) => {
  if(token==='' || token===null){
    window.location.href = '/logout';
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    
    throw error;
  }
};

export const deleteRequest = async (token, url) => {
  if(token==='' || token===null){
    window.location.href = '/logout';
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const putRequest = async (token, url, value) => {
  if(token==='' || token===null){
    window.location.href = '/logout';
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/${url}`, {
      method: 'PUT',
      headers: {
        'Authorization': token
      },
      body : JSON.stringify(value)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

