import { useState, useEffect } from "react";

const useFetch = async (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrl = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
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

export { useFetch };
