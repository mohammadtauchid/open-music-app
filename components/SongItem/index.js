import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable';
import styles from './SongItem.module.scss';

class NoteItem extends Component {
  constructor(props) {
    super(props);

    this.onItemClicked = this.onItemClicked.bind(this);
  }

  onItemClicked() {
    const { song } = this.props;
    const { id } = song;

    window.location.href = `/songs/${id}`;
  }

  render() {
    const { song } = this.props;
    const {
      title, year, performer,
    } = song;

    return (
      <article onClick={this.onItemClicked} className={styles.song_item}>
        <header className={styles.song_item__header}>
          <h2 className={styles.song_item__title}>{title}</h2>
        </header>
        <ContentEditable disabled html={year} className={styles.song_item__content} />
        <ContentEditable disabled html={performer} className={styles.song_item__content} />
      </article>
    );
  }
}

export default NoteItem;
