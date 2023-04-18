import Head from 'next/head';
import React, { Component } from 'react';
// import Router from 'next/router';
import HeadBar from '../components/Common/HeadBar';
import Songs from '../components/Songs';
// import FloatingButton from '../components/Common/FloatingButton';
import Card from '../components/Common/Card';

import styles from './Home.module.scss';
import { getBaseURL } from '../lib/utils/storage';
import fetcher from '../lib/utils/fetcher';
import AuthenticationError from '../lib/utils/AuthenticationError';

// const onAddNoteClick = () => {
//   if (window) {
//     window.location.href = '/songs/new';
//   }
// };

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      empty: false,
      isError: false,
      // accessToken: null,
    };
  }

  // async componentDidMount() {
  //   const accessToken = localStorage.getItem('accessToken');
  //   if (!accessToken) {
  //     alert('Mohon untuk login dulu.');
  //     await Router.push('/login');
  //     return;
  //   }
  //   this.setState((prevState) => ({
  //     ...prevState,
  //     accessToken,
  //   }));
  //   await this._fetch();
  // }

  async _fetch() {
    try {
      const { data: { notes } } = await fetcher(`${getBaseURL()}songs`);
      this.setState(() => ({ notes, empty: notes.length < 1 }));
    } catch (error) {
      if (error instanceof AuthenticationError) {
        if (window) {
          alert(error.message);
        }
        // TODO redirect to login
      }
      this.setState((prevState) => ({ ...prevState, isError: true }));
    }
  }

  render() {
    const {
      songs, isError, empty, // accessToken,
    } = this.state;
    // if (!accessToken) {
    //   return <></>;
    // }

    return (
      <div>
        <Head>
          <title>
            { process.env.NEXT_PUBLIC_APP_NAME || 'Music' }
            &nbsp;Apps
          </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <HeadBar />
        <main>
          {isError ? (
            <p className={styles.error}>
              Error displaying musics! Make sure you have done with the
              back-end or correct url.
            </p>
          ) : <Songs empty={empty} songs={songs} />}
          <div className={styles.card_container}>
            <div className={styles.card_row}>
              <Card imageSrc="/image/album.png" title="Albums" url="/albums" />
              <Card imageSrc="/image/song.png" title="Songs" url="/songs" />
              <Card imageSrc="/image/playlist.png" title="Playlists" url="/playlists" />
            </div>
          </div>
        </main>
        {/*
        <FloatingButton onClickHandler={onAddNoteClick} icon="/icon/add.svg" text="Add Note" />
        */}
      </div>
    );
  }
}

export default Home;
