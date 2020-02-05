import { useEffect, useState } from "react";
import { AsyncStorage } from 'react-native';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const getAllMedia = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    try {
      const response = await fetch(apiUrl + 'media/all');
      const json = await response.json();
      const result = await Promise.all(json.files.map(async (item) => {
        const response = await fetch(apiUrl + 'media/' + item.file_id);
        return await response.json();
      }));
      setData(result);
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
};

const login = async (data) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(apiUrl + 'login', fetchOptions);
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const signUp = async (data) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(apiUrl + 'users', fetchOptions);
    return await response.json();
  } catch (e) {
    console.log(e.message);
  }
};

const getLoggedInUserInfo = () => {
  const [user, setUser] = useState({});

  const fetchUrl = async () => {
    try {
      const response = await AsyncStorage.getItem('user');
      setUser(JSON.parse(response));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [user];
};

const getUserAvatar = () => {
  const [avatar, setAvatar] = useState({});

  const fetchUrl = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      const userId = JSON.parse(user).user_id;
      const response = await fetch(apiUrl + `tags/avatar_${userId}`);
      const json = await response.json();
      setAvatar(json[0].filename);
      // console.log(avatar);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchUrl();
  }, []);
  return [avatar];
};

const checkUsernameExist = async (username) => {
  try {
    const response = await fetch(apiUrl + `users/username/${username}`);
    const json = await response.json();
    return json.available;
  } catch (e) {
    console.log(e.message);
  }
};

export { getAllMedia, login, getLoggedInUserInfo, signUp, getUserAvatar, checkUsernameExist };
