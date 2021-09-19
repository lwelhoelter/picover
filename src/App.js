import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listAlbums } from './graphql/queries';
import {
  createAlbum as createAlbumMutation,
  deleteAlbum as deleteAlbumMutation,
} from './graphql/mutations';

const initialFormState = { name: '' };

function App() {
  const [albums, setAlbums] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchAlbums();
  }

  async function fetchAlbums() {
    const apiData = await API.graphql({ query: listAlbums });
    const albumsFromAPI = apiData.data.listAlbums.items;
    await Promise.all(
      albumsFromAPI.map(async (album) => {
        if (album.image) {
          const image = await Storage.get(album.image);
          album.image = image;
        }
        return album;
      })
    );
    setAlbums(apiData.data.listAlbums.items);
  }

  async function createAlbum() {
    if (!formData.name) return;
    await API.graphql({
      query: createAlbumMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setAlbums([...albums, formData]);
    setFormData(initialFormState);
  }

  async function deleteAlbum({ id }) {
    const newAlbumsArray = albums.filter((album) => album.id !== id);
    setAlbums(newAlbumsArray);
    await API.graphql({
      query: deleteAlbumMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className="App">
      <h1>Picover</h1>
      <input
        onChange={(e) => setFormData({ name: e.target.value })}
        placeholder="Album name"
        value={formData.name}
      />
      <input type="file" onChange={onChange} />
      <button onClick={createAlbum}>Create Album</button>
      <div style={{ marginBottom: 30 }}></div>
      {albums.map((album) => (
        <div key={album.id || album.name}>
          <h2>{album.name}</h2>
          <button onClick={() => deleteAlbum(album)}>Delete album</button>
          {album.image && <img src={album.image} style={{ width: 400 }} />}
        </div>
      ))}

      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
