import PageTitle from "../../hook/usePageTitle";
import { useState, useEffect } from 'react';

function SearchSongApp({ title }) {
    PageTitle(title);

    const [query, setQuery] = useState("");
    const [songs, setSongs] = useState([]);
    const [storeSongs, setStoreSongs] = useState({});
    const [loading, setLoading] = useState(false);
    const [pickSong, setPickSong] = useState(false);
    const [resetSong, setResetSong] = useState(false);
    const [playSong, setPlaySong] = useState(false);

    useEffect(() => {
        const searchSongs = async () => {
            if (!query.trim()) {
                setSongs([]);
                return;
            }

            setLoading(true);
            setSongs([]); // Clear previous results
            
            try {
                const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
                if (res.ok) {
                    const data = await res.json();
                    setSongs(data.results);
                } else {
                    console.error("API Error:", res.status + " | " + res.statusText);
                }
                
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                setLoading(false);
            }
        };
        searchSongs();
    }, [query]);

    const storeSongDetails = (choosen_song) => {
        return {
            'id': choosen_song.trackId,
            'image': choosen_song.artworkUrl100,
            'title': choosen_song.trackName,
            'artist': choosen_song.artistName,
            'genre': choosen_song.primaryGenreName,
            'releaseDate': choosen_song.releaseDate,
            'price': choosen_song.trackPrice,
            'sound': choosen_song.previewUrl,
            'itunes': choosen_song.trackViewUrl
        }
    }


    // Load Wishlist
    const [storeWishlist, setStoreWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    }); 

    // Save Wishlist in LocalStorage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(storeWishlist));
    }, [storeWishlist]);

    const ManageWishlistSong = async (element, trackId) => {
        const wishlist_element = element.children[0].classList;
        const unwishlist = wishlist_element.contains('bi-star');

        if (unwishlist) {
            try {
                const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}`);
                const data = await res.json();
                const wishlistSongDetails = storeSongDetails(data.results[0]);

                setStoreWishlist([...storeWishlist, wishlistSongDetails]);

                element.children[0].classList.remove('bi-star');
                element.children[0].classList.add('bi-star-fill');
            } catch (error) {
                console.error("Error fetching songs:", error);
            } finally {
                // setLoading(false);
            }
        } else {
            if (wishlist_element.contains('bi-star-fill')) {
                element.children[0].classList.remove('bi-star-fill');
                element.children[0].classList.add('bi-star');

                setStoreWishlist(storeWishlist.filter(wishlist => wishlist.id !== trackId));
                reset_wishlist_playbtn();
            }
        }
    }
    
    const reset_wishlist_playbtn = () => {
        document.querySelectorAll('#wishlist-song-list button').forEach(btn => {
            btn.classList.remove('active');
            btn.children[0].classList.remove('d-none');
        });
    }

    const playWishlistSong = (element) => {
        const play_btn = element.children[0];
        const pause_btn = element.children[1];
        
        const playButton = document.querySelector('.play');
        const song_id = element.getAttribute('data-id');
        const pickSongFromWishlist = storeWishlist.find(wishlist => wishlist.id === parseInt(song_id));
        
        const wasActive = element.classList.contains('active');
        
        document.querySelectorAll('#wishlist-song-list button').forEach(btn => {
            btn.classList.remove('active');
            // Also update icons for other buttons to show play
            if (btn !== element) {
                if (btn.children[0]) btn.children[0].classList.remove('d-none'); // play_btn
                if (btn.children[1]) btn.children[1].classList.add('d-none');    // pause_btn
            }
        });
        
        // If the clicked element was NOT active, then make it active and update its icons
        if (!wasActive) {
            element.classList.add('active');
            if (play_btn) play_btn.classList.add('d-none');
            if (pause_btn) pause_btn.classList.remove('d-none');
            setStoreSongs(pickSongFromWishlist);
            setResetSong(true);
            setPlaySong(true);
            setPickSong(true);
            playButton.click();
        } else {
            // If it was active, it's now inactive (due to the forEach loop), so show play and hide pause
            if (play_btn) play_btn.classList.remove('d-none');
            if (pause_btn) pause_btn.classList.add('d-none');
            playButton.click();
        }
    }

    const ChooseSong = (element) => {
        // const track_id = jQuery(element).attr('data-id');
        const track_id = element.getAttribute('data-id');
        const choosen_song = songs.filter(song => song.trackId == track_id)[0];
        
        setStoreSongs(storeSongDetails(choosen_song));

        setResetSong(true);
        setPickSong(true);
        setQuery("");
        setSongs([]);
        reset_wishlist_playbtn();
    }

    // Move player logic inside useEffect to ensure DOM elements are available
    useEffect(() => {

        const audio = document.querySelector('.player__audio');
        const audioSource = document.querySelector('source');
        const songPanel = document.querySelector('.song-panel');
        const songTitle = document.querySelector('.song-info__title');
        const songArtist = document.querySelector('.song-info__artist');
        const backButton = document.querySelector('.backward');
        const playButton = document.querySelector('.play');
        const forwardButton = document.querySelector('.forward');
        const spinner = document.querySelector('.spinner');
        const spinnerDisc = document.querySelector('.spinner__disc');
        const progress = document.querySelector('.progress');
        const progressBar = document.querySelector('.progress__filled');

        if (!audio || !audioSource || !songPanel || !songTitle || !songArtist || !backButton || !playButton || !forwardButton || !spinner || !spinnerDisc || !progress || !progressBar) {
            console.warn("One or more player elements not found in the DOM.");
            return; // Exit if elements are not found
        }

        if (storeSongs.sound) {
            audioSource.src = storeSongs.sound;
            audio.load(); // Load the new audio source
        }

        let playing = false;
        let trackSwitch = false;

        const togglePlay = () => {
            const method = audio.paused ? 'play' : 'pause';
            playing = audio.paused ? true : false;
            audio[method]();

            // ADDED: Set loop attribute based on isLooping state
            if (playing) {
                audio.loop = true;
            } else {
                audio.loop = false;
            }
        };

        const toggleSongPanel = () => {
            if (!trackSwitch) {
                spinnerDisc.classList.toggle('scale');
                songPanel.classList.toggle('playing');
                playButton.classList.toggle('playing');
            }
        };
        
        const startSpin = () => {
            spinner.classList.add('spin');
        };
        
        const stopSpin = () => {
            const spin = document.querySelector('.spin');
            spin.addEventListener("animationiteration", () => {
                if (!playing) {
                    spin.style.animation = 'none';
                    spinner.classList.remove('spin');
                    spin.style.animation = '';
                }
            }, { once: true });
        };
        
        const handleProgress = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.flexBasis = `${percent}%`;
            if (percent === 100) {
                trackSwitch = true;
                // Loop the current song after it ends
                audio.currentTime = 0; // Reset current time to the beginning
                audio.play(); // Play the song again
            }
        };
        
        // const handleBackButton = () => {
            //     if (audio.currentTime <= 3) {
                //         const currentTrackId = parseInt(audioSource.dataset.trackid);
                //         const previousTrackId = currentTrackId === 1 ? '10' : (currentTrackId - 1).toString();
                //         const previousTrack = tracks.find(o => o.id === previousTrackId);
                //         changeTrack(previousTrack);
                //     } else {
                    //         audio.currentTime = 0;
                    //     }
                    // };
                    
        // const handleForwardButton = () => {
            //     const currentTrackId = parseInt(audioSource.dataset.trackid);
        //     const nextTrackId = currentTrackId === 10 ? '1' : (currentTrackId + 1).toString();
        //     const nextTrack = tracks.find(o => o.id === nextTrackId);
        //     changeTrack(nextTrack);
        // };
        
        // const changeTrack = (track) => { /* ... (same as your original code) ... */ };
        // const scrub = (e) => { /* ... (same as your original code) ... */ };
        
        const scrub = (e) => {
            const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
            audio.currentTime = scrubTime;
        };
        
        const resetAudio = () => {
            audio.currentTime = 0;
            songPanel.classList.remove('playing');
            playButton.classList.remove('playing');
            audio.load();
        }
        
        if (resetSong) resetAudio();
        if (playSong) togglePlay();
            
        // Add event listeners
        audio.addEventListener('play', startSpin);
        audio.addEventListener('play', toggleSongPanel);
        audio.addEventListener('pause', stopSpin);
        audio.addEventListener('pause', toggleSongPanel);
        audio.addEventListener('timeupdate', handleProgress);
        // backButton.addEventListener('click', handleBackButton);
        playButton.addEventListener('click', togglePlay);
        // forwardButton.addEventListener('click', handleForwardButton);

        let mousedown = false;
        progress.addEventListener('click', scrub);
        progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);

        // Cleanup function for useEffect
        return () => {
            audio.removeEventListener('play', startSpin);
            audio.removeEventListener('play', toggleSongPanel);
            audio.removeEventListener('pause', stopSpin);
            audio.removeEventListener('pause', toggleSongPanel);
            audio.removeEventListener('timeupdate', handleProgress);
            // backButton.removeEventListener('click', handleBackButton);
            playButton.removeEventListener('click', togglePlay);
            // forwardButton.removeEventListener('click', handleForwardButton);
            progress.removeEventListener('click', scrub);
        };
    }, [storeSongs]);  // Dependency array ensures this runs when storeSongs changes
    
    // Empty dependency array means this runs once after initial render (before)

    const SkeletonSearchLoader = (index) => {
        return( <div id="search-suggestion-list" key={index} className="w-100 border-top p-2 d-flex align-items-center justify-content-start column-gap-2" style={{ borderLeft: '3px solid white', borderRight: '3px solid white', height: '4em' }}>
            <div className={`song-img h-100 border-0 ${loading && 'skeleton'}`} style={{ width: '55px' }}>
                <img className="w-100 h-100 border-0" src={''} alt="" style={{ objectFit: 'cover' }} />
            </div>
            <div className="song-detail d-flex w-100 align-items-start justify-content-between">
                <div className="song-name d-flex flex-column align-items-start justify-content-center">
                    <small className={`fw-bold ${loading && 'skeleton'}`}>{ loading && '---------------------' }</small>
                    <small className={loading && 'skeleton'} style={{ fontSize: '12px' }}>{ loading && '----------' }</small>
                </div>
                <div className="song-details d-flex flex-column justify-content-end align-items-end row-gap-1">
                    <small className={`fw-bold ${loading && 'skeleton'}`}>{ loading && '--------' }</small>
                    <small className={loading && 'skeleton'} style={{ fontSize: '12px' }}>{ loading && '-------------------' }</small>
                </div>
            </div>
        </div> );
    }
    const SkeletonWislistLoader = (index) => {
        return( <div id="search-suggestion-list" key={index} className="border-0 outline-0 w-100 border-top p-2 d-flex align-items-center justify-content-start column-gap-2" style={{ borderLeft: '3px solid white', borderRight: '3px solid white', height: '4em' }}>
            <div className={`song-img h-100 border-0 ${'skeleton'}`} style={{ width: '55px' }}>
                <img className="w-100 h-100 border-0" src={''} alt="" style={{ objectFit: 'cover' }} />
            </div>
            <div className="song-detail d-flex w-100 align-items-start justify-content-between">
                <div className="song-name d-flex flex-column align-items-start justify-content-center">
                    <small className={`fw-bold ${'skeleton'}`}>{ '---------------------' }</small>
                    <small className={'skeleton'} style={{ fontSize: '12px' }}>{ '----------' }</small>
                </div>
                <div className="d-flex column-gap-2">
                    <div className="song-details d-flex flex-column justify-content-end align-items-end row-gap-1 h-100">
                        <small className={`fw-bold text-end skeleton`}>{ '----------' }</small>
                        <small className="text-end skeleton" style={{ fontSize: '12px' }}>{ '-----------------------' }</small>
                    </div>
                    <div className="ps-2" style={{ borderLeft: '1px solid gainsboro' }}>
                        <button className={`h-100 px-2 border-0 skeleton`}>
                            <i className={`bi bi-play fs-4`}></i>
                            <i className={`bi bi-pause fs-4`}></i>
                        </button>
                    </div>
                </div>
            </div>
        </div> );
    }

    return (
        <div className="mx-auto">
            <h1 className="mb-0">Search Song</h1>
            <div className="d-flex align-items-center column-gap-2 position-relative mx-auto mt-5" id="input_find_song" style={{ maxWidth: 500 }}>
                <input className="form-control py-3 ps-3 pe-5 radius-0" value={ query } onChange={(e) => setQuery(e.target.value)} placeholder="Search song or artist" style={{ backgroundColor: '#fff', borderRadius: '0px' }}/>
                <div className="position-absolute border-0 end-0 d-flex align-items-center justify-content-center pe-2 column-gap-1">
                    <button className="bg-transparent border-0" onClick={() => setQuery('')}>
                        <i className="bi bi-x text-dark"></i>
                    </button>
                    <button className="border-0 bg-transparent" style={{ cursor: 'default' }}>
                        <i className="bi bi-search text-muted"></i>
                    </button>
                </div>
                <div className={`search-suggestion position-absolute w-100 gap-0 ${loading && 'pt-1'}`} style={{ top: '100%', backgroundColor: '#fff', height: query.trim() ? '330px' : '0px', overflow: 'auto', transition: query.trim() ? 'all 0.2s ease-in-out' : 'all 0.2s ease-in-out', boxShadow: query.trim() ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none', zIndex: '998' }}>
                    {loading ? Array.from({ length: 15 }).map((_, i) => (
                        <SkeletonSearchLoader key={i} />
                    )) : songs.map((song, index) => (
                        <div key={index} className="p-2 w-100 border-bottom bg-transparent d-flex align-items-center justify-content-start column-gap-2" id="search-suggestion-list" style={{ cursor: 'pointer', height: 'max-content' }} onClick={(e) => ChooseSong(e.currentTarget)} data-id={`${song.trackId}`}>
                            <div className="song-img" style={{ width: '55px' }}>
                                <img className="w-100 h-100" src={song.artworkUrl100} alt="" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="song-detail d-flex w-100 align-items-start justify-content-between">
                                <div className="song-name d-flex flex-column align-items-start justify-content-center">
                                    <small className="fw-bold text-start">{song.trackName.length > 10 ? song.trackName.slice(0, 35) + '...' : song.trackName || '-'}</small>
                                    <small className="text-start" style={{ fontSize: '12px' }}>{song.artistName.length > 10 ? song.artistName.slice(0, 30) + '...' : song.artistName || '-'}</small>
                                </div>
                                <div className="song-details d-flex flex-column justify-content-end align-items-end row-gap-1">
                                    <small className="fw-bold text-end">{song.collectionPrice && '$'}{song.collectionPrice || '-'}</small>
                                    <small className="text-end" style={{ fontSize: '12px' }}>{song.releaseDate || '-'}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`mt-5 d-flex column-gap-3`} id="song-layout">
                <div className="w-100 d-flex flex-column row-gap-2">
                    <div className="w-100 bg-light p-3 border d-flex justify-content-start column-gap-3 position-relative" style={{ height: 'max-content'}}>
                        <div className={`song-img rounded-3 overflow-hidden ${!pickSong ? 'skeleton' : 'border border-1'}`} style={{ width: '30%' }}>
                            <img className="w-100 h-100 border" src={storeSongs.image} alt="" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="song-detail d-flex flex-column align-items-start justify-content-between" style={{ width: '70%' }}>
                            <div className="d-flex flex-column align-items-start">
                                <h4 className={`text-start mb-1 fw-bold pe-4 ${!pickSong ? 'skeleton' : ''}`}>{storeSongs.title || '-'} { !pickSong && '--------------------------' }</h4>
                                <p className={`text-start mb-0 ${!pickSong ? 'skeleton' : ''}`} style={{ fontSize: '14px' }}>{storeSongs.artist || '-'}{ !pickSong && '--------------' }</p>
                            </div>
                            <div className="d-flex align-items-end justify-content-between w-100">
                                <div className="mt-3 d-flex flex-column align-items-start">
                                    <p className={`text-start mb-0 ${!pickSong ? 'skeleton' : ''}`} style={{ fontSize: '12px' }}><b>Genre</b>: {storeSongs.genre || '-'}</p>
                                    <p className={`text-start mb-0 ${!pickSong ? 'skeleton' : ''}`} style={{ fontSize: '12px' }}><b>Country</b>: {storeSongs.country || '-'}</p>
                                    <p className={`text-start mb-0 ${!pickSong ? 'skeleton' : ''}`} style={{ fontSize: '12px' }}><b>Release Date</b>: {storeSongs.releaseDate || '-'}</p>
                                </div>
                                <h6 className={`mb-0 fw-bold ${!pickSong ? 'skeleton' : ''}`}>${storeSongs.price || '-'}{ !pickSong && '-------' }</h6>
                            </div>
                        </div>
                        <a href={storeSongs.itunes} target="_blank" className="position-absolute top-0 end-0 me-3 mt-2">
                            <i className={`bi bi-box-arrow-up-right text-primary ${!pickSong ? 'skeleton' : ''}`} style={{ fontSize: '12px' }}></i>
                        </a>
                    </div>
                    <div className="w-100 bg-light p-3 border d-flex justify-content-start align-items-center flex-column column-gap-3" style={{ height: 'max-content'}}>
                        <h2 className={`fs-4 mt-2 mb-0`} style={{ width: 'max-content' }}>⭐ My Favourite Song</h2>
                        <div className="mt-4 w-100 d-flex flex-column-reverse justify-content-end" style={{ height: '22em', overflow: 'auto'}}>
                            { Object.keys(storeWishlist).length === 0 ? Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonWislistLoader key={i} />
                            )) : storeWishlist.map((wishlist, index) => {
                                return( <div id="wishlist-song-list" key={index} className="w-100 border-top p-2 d-flex align-items-center justify-content-start column-gap-2">
                                    <div className={`song-img h-100 border-0`} style={{ width: '55px' }}>
                                        <img className="w-100 h-100 border-0" src={wishlist.image} alt="" style={{ objectFit: 'cover' }} />
                                    </div>
                                    <div className="song-detail d-flex w-100 align-items-start justify-content-between">
                                        <div className="song-name d-flex flex-column align-items-start justify-content-center row-gap-1">
                                            <small className={`fw-bold text-start`}>{wishlist.title || '-'}</small>
                                            <small className="text-start" style={{ fontSize: '12px' }}>{wishlist.artist || '-'}</small>
                                        </div>
                                        <div className="d-flex column-gap-3">
                                            <div className="song-details d-flex flex-column justify-content-end align-items-end row-gap-1 h-100">
                                                <small className={`fw-bold text-end`}>${wishlist.price || '-'}</small>
                                                <small className="text-end" style={{ fontSize: '12px' }}>{wishlist.releaseDate || '-'}</small>
                                            </div>
                                            <div className="ps-2" style={{ borderLeft: '1px solid gainsboro' }}>
                                                <button className={`h-100 px-3 btn btn-outline-secondary`} data-id={`${wishlist.id}`} onClick={(e) => playWishlistSong(e.currentTarget)}>
                                                    <i className={`bi bi-play fs-4`}></i>
                                                    <i className={`bi bi-pause fs-4`}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> );
                            }) }
                        </div>
                    </div>
                </div>
                <div className="w-100 p-4 border bg-light position-relative" id="lyrics-song-container">
                    <div className="border-bottom mb-3 pb-3 d-flex align-items-center justify-content-between flex-sm-row flex-column">
                        <div className="d-flex flex-column align-items-sm-start align-items-center">
                            <h2 className={`text-start mb-1 fs-4 p-0 ${!pickSong ? 'skeleton' : ''}`} style={{ width: 'max-content' }}>{ storeSongs.title }{ !pickSong && '--------------------------------' }</h2>
                            <small className={`text-start m-0 ${!pickSong ? 'skeleton' : ''}`} style={{ width: 'max-content' }}>{ storeSongs.artist }{ !pickSong && '-----------------' }</small>
                        </div>
                        <div>
                            <button className="bg-transparent border-0 mt-sm-0 mt-3" onClick={(e) => ManageWishlistSong(e.currentTarget, storeSongs.id)}>
                                <i className={`bi text-warning fs-5 ${(storeWishlist.some(wishlist => wishlist.id === storeSongs.id)) ? 'bi-star-fill' : 'bi-star'} ${!pickSong ? 'skeleton' : ''}`}></i>
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <p className={`fw-bold fs-3 text-dark text-start ${!pickSong ? 'skeleton' : ''}`}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure ad quae exercitationem eveniet aliquid suscipit reprehenderit.</p>
                    </div>
                    <div className="player">
                        <audio className="player__audio viewer" loop={true}>
                            <source src={storeSongs.sound} type="audio/mp4" data-trackid="1"/>
                        </audio>
                        <div className="song-panel shadow-sm">
                            <div className="song-info">
                                <div className={`song-info__title ${!pickSong ? 'skeleton' : ''}`}>{storeSongs.title || '-'}{ !pickSong && '--------------------' }</div>
                                <div className={`song-info__artist ${!pickSong ? 'skeleton' : ''}`}>{storeSongs.artist || '-'}{ !pickSong && '-----------' }</div>
                                <div className={`progress ${!pickSong ? 'skeleton' : ''}`}>
                                    <div className={`progress__filled ${!pickSong ? 'skeleton' : ''}`}></div>
                                </div>
                            </div>
                        </div>
                        <div className="player-controls shadow-sm">
                            <div className="spinner">
                                <div className={`spinner__disc ${!pickSong ? 'skeleton' : 'border'}`} style={{ backgroundImage: `url(${storeSongs.image})` }}>
                                    <div className="center__disc"></div>
                                </div>
                            </div>
                            <button className="backward" style={{ cursor: 'not-allowed' }}><i className={`text-dark bi bi-skip-backward-fill fs-2 ${!pickSong ? 'skeleton' : ''}`}></i></button>
                            <button className="play">
                                <i className={`text-dark bi bi-play-fill fs-2 ${!pickSong ? 'skeleton' : ''}`}></i>
                                <span className="pause left"></span>
                                <span className="pause right"></span>
                            </button>
                            <button className="forward" style={{ cursor: 'not-allowed' }}><i className={`text-dark bi bi-skip-forward-fill fs-2 ${!pickSong ? 'skeleton' : ''}`}></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { SearchSongApp };