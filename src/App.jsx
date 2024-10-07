import axios from 'axios';
import React, { useEffect, useState } from 'react';

const FetchData = React.memo(() => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://randomuser.me/api/?results=10'
        );
        setData(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {data.map((user, index) => (
        <div key={index}>
          <div className='flex'>
            <img src={user.picture.large} alt='img' />
            <div>
              <p>
                {user.name.title}
                {user.name.first}
                {user.name.last}
              </p>
              <p>{`${user.age}/${user.gender}`}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

export default FetchData;
