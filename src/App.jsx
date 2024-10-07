import React, { useState } from 'react';
import apiRequest from './apiRequest';

function App() {
  const [value, setValue] = useState('');
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  const handleSaveValue = (event) => {
    event.preventDefault();
    setLists((prev) => [...prev, value]);
  };

  const fetchLists = async () => {
    const url = 'http://localhost:3500/items';
    setLoading(true);
    const data = await apiRequest(url);
    setLoading(false);

    if (data.error) {
      setError(data.error);
    } else {
      setLists(data);
    }
    const data = await apiRequest(url, options);
    if (data.error) {
      setError(data.error);
    } else {
      setLists((prevList) => prevList.filter((list) => list.id !== id));
    }
  };

  const removeList = async (id) => {
    const url = `http://localhost:3500/items/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const handleAddList = async () => {
      const url = 'http://localhost:3500/items';

      const listToAdd = {
        name: newlist.title,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listToAdd),
      };

      const data = await apiRequest(url, options);
      if (data.error) {
        setError(data.error);
      } else {
        setLists((prevLists) => [...prevLists, data]);
        setNewList({ title: '', id: '' });
      }
    };

    useEffect(() => {
      fetchLists();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    return (
      <>
        <form onSubmit={handleAddList}>
          <input
            value={newlist.name}
            onChange={(event) =>
              setNewList({ ...newlist, title: event.target.value })
            }
            required
            className='border-t-2 border-black'
          />
          <button onClick={handleSaveValue}>Submit</button>
        </form>
        <div>{value}</div>
        <div className='border-dashed-2 border-red-600'>
          <ul>
            {lists.map((list) => (
              <li key={list}>{list}</li>
            ))}
          </ul>
        </div>
      </>
    );
  };
}

export default App;
