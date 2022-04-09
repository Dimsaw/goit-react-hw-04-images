import { useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchPictures, setSearchPictures] = useState('');

  const handlePicturesChange = event => {
    setSearchPictures(event.currentTarget.value.toLowerCase());
  };
  const handleSubmit = event => {
    event.preventDefault();

    if (searchPictures.trim() === '') {
      return toast.error('Input is empty!');
    }
    onSubmit(searchPictures);
    setSearchPictures('');
  };

  return (
    <>
      <header className={s.searchbar}>
        <form className={s.form} onSubmit={handleSubmit}>
          <button type="submit" className={s.button}>
            <span className="button-label">
              Search <GrSearch />
            </span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            // autofocus
            placeholder="Search images and photos"
            value={searchPictures}
            onChange={handlePicturesChange}
          />
        </form>
      </header>
    </>
  );
}
