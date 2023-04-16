import React from 'react';
import NoteItem from '../SongItem';
import styles from './Songs.module.scss';

const Songs = ({ songs, empty }) => {
  if (empty) {
    return (
      <div className={styles.empty}>
        <p>Please try add some song(s)</p>
      </div>
    );
  }

  return (
    <div className={styles.song_list}>
      {songs.map((song) => <NoteItem key={song.id} note={song} />)}
    </div>
  );
};

export default Songs;
