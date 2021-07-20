
import { Grid, Fade } from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import Slider from '@material-ui/core/Slider';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

import React, { useState,useEffect } from "react";
import "./Music.css"
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from "react-router-dom";




const clientId = "eda3b64588f64c89b87ec0cba023ae4a";
const redirectUri = "https://adrianpolimeni.github.io/workspace/";
const scopes = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "user-modify-playback-state",
    "app-remote-control"
  ];

// Endpoints
export const AUTH : string = 'https://accounts.spotify.com/authorize';
export const GET_PLAYLIST : string = "https://api.spotify.com/v1/playlists/";
export const GET_ALBUM : string = "https://api.spotify.com/v1/albums/";
export const GET_ARTIST_TRACKS : string = "https://api.spotify.com/v1/artists/";

export const GET_TRACK : string ="https://api.spotify.com/v1/me/player/currently-playing"
export const PLAY_TRACK : string = "https://api.spotify.com/v1/me/player/play"; // PUT
export const PAUSE_TRACK : string = "https://api.spotify.com/v1/me/player/pause"; // PUT
export const NEXT_TRACK : string = "https://api.spotify.com/v1/me/player/next"; //POST
export const PREV_TRACK : string = "https://api.spotify.com/v1/me/player/previous"; //POST
export const VOLUME : string = "https://api.spotify.com/v1/me/player/volume";

interface Track
{
    id: string;
    name: string;
    image: string;
    track_number: number;
    artists: Artist[];
    duration_ms: number;
}

interface Artist
{
    id: string;
    name: string;
}


export const Music = () => {

    const headers = (token : string) => {
        return( new Headers({
        'Authorization': 'Bearer '+token, 
        'Content-Type': 'application/json'}));
    }

    function GET(endpoint: string, token: string)
    {
      return fetch(endpoint, 
        {
            method:"GET",
            headers: headers(token) 
        }).then(data => data.json());
    }

    function PUT(endpoint: string, token: string)
    {
      return fetch(endpoint, 
        {
            method:"PUT",
            headers: headers(token) 
        });
    }

    function POST(endpoint: string, token: string)
    {
      return fetch(endpoint, 
        {
            method:"POST",
            headers: headers(token) 
        });
    }

    const getTrackList = async (trackContext : any, token : string) =>
    {
        const id = trackContext.uri.split(":")[2];
        let trackList : any[] = [];
        switch(trackContext.type)
        {
            case "playlist":
                const playlistRespose = await GET(GET_PLAYLIST + id + "/tracks", token);
                trackList = (playlistRespose.items as any[]).map(item => item.track);
            break;
            case "album":
                const albumResponse = await GET(GET_ALBUM + id + "/tracks", token);
                trackList = albumResponse.items;
                break;
            case "artist":
                const artistRespose = await GET(GET_ARTIST_TRACKS + id + "/top-tracks?market=CA", token);
                trackList = artistRespose.tracks;

                break;
        }

        trackList.forEach(element => {
            element.image = element.album.images[1].url;
        });

        return trackList as Track[]; 
    }


    const setVolume = async (volume:number, token: string)=> 
    {
        const response = await PUT(VOLUME+"?volume_percent="+volume,token);
    }

    const MusicViewer = () => 
    {
        let {responseToken} = useParams();
        const [token, setToken] = useState(responseToken.split("=")[1].split("&")[0]);
        const [trackList, setTrackList] = useState([] as Track[]);
        const [currentTrack, setCurrentTrack] = useState({} as Track);
        const [progress, setProgress] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);
        const [volume, setVolume] = useState(100);
        const [startTime,setStartTime] = useState(Date.now);
        const [lastTime,setLastTime] = useState(Date.now);
    
        useEffect(()=>
        {
            const getInitialInfo = async () => {
                const trackRespose = await GET(GET_TRACK+"?market=CA", token);
                let track = trackRespose.item;
                track.image = trackRespose.item.album.images[1].url;
                setCurrentTrack(track);
                setIsPlaying(trackRespose.is_playing);
                setProgress(trackRespose.progress_ms);
                const list = await getTrackList(trackRespose.context, token);
                setTrackList(list);
            }
            if(token != null)
                getInitialInfo();
            
        },[token]);

        useEffect(()=>
        {
            if(isPlaying){
                setStartTime(Date.now());
                setLastTime(Date.now())
            }else
            {


            }
        },[isPlaying]);

        useEffect(() => {
            var timerID = setInterval( () => tick(), 500 );
            return function cleanup() {
                clearInterval(timerID);
              };
           });
        
          const tick = () => {
            var now :number = Date.now();
            
            if(isPlaying){
                setLastTime(now);
                if(now - lastTime + progress >= currentTrack.duration_ms)
                {
                    setTrack(1);
                    setProgress(0);
                }else
                    setProgress(now - lastTime + progress);
            }
          }

        const trackListItem = (item: Track) => {
            
            return(
                <div className="track_item">   
                    <img className="image_small" src={item.image} />
                    <div>
                        <div className="title_2">{item.name}</div>
                        <div className="subtext_2">{listArtists(item.artists)}</div>
                    </div>
                </div>
            );
        }

        const TrackListContainer = () => {
            let currentIndex = getIndex(currentTrack.id);
            return(
                <div className="track_list">
                    {trackList.map(item => {
                        if(getIndex(item.id) <= currentIndex)
                            return (null);
                        return(trackListItem(item));
                        })}
                </div>
            );
        }

        const listArtists = (artists : Artist[]) => {
            if(artists){
                const names = artists.map(artist => artist.name);
                const finalName = names.pop();
                return names.length
                ? names.join(', ') + ' & ' + finalName
                : finalName;
            }
            return null;
        }
        
        const scrubberPos = ()=>
        {
            return (100.0*(progress/currentTrack.duration_ms))+"%";
        }

        const getIndex = (id : string) => 
        {
            return trackList.findIndex(item => item.id == id);
        }

        const playPause = async () => 
        {
            if(isPlaying){
                await PUT(PAUSE_TRACK,token)
            }else{
                await PUT(PLAY_TRACK,token)
            }
            setIsPlaying(!isPlaying);
        }
        
        const setTrack = (amount : number) =>
        {
            let index = (getIndex(currentTrack.id) + trackList.length +amount) % trackList.length;
            setCurrentTrack(trackList[index]);
            setProgress(0);
        }


        return(
            <div className="main">
                <div className="top">
                <img src={currentTrack.image} className="track_art_large"/>
                <div className="player">
                    <div className="title"> {currentTrack.name}</div>
                    <div className="subtext">{listArtists(currentTrack.artists)}</div>
                    <div className="scrubber-bar">
                        <div className="scrubber" style={{width:scrubberPos()}}> </div>
                    </div>
                    <div className="controls">
                        <button onClick={async () =>  
                            {
                                await POST(PREV_TRACK,token);
                                setIsPlaying(true);
                                setTrack(-1);
                            }}>
                        <SkipPreviousIcon style={{ fontSize: 72 }}/>
                        </button>
                        <button onClick={ playPause }>
                        { isPlaying ? 
                        <PauseIcon style={{ fontSize: 72 }}/>:
                        <PlayArrowIcon style={{ fontSize: 72 }}/>}
                        </button>
                        <button onClick={async () =>  
                            {
                                await POST(NEXT_TRACK,token);
                                setIsPlaying(true);
                                setTrack(1);
                            }}>
                        <SkipNextIcon style={{ fontSize: 72 }}/>
                        </button>
                    </div>
                </div>
                </div>
                <TrackListContainer/>
            </div>
        );
    }

    const LogIn = () =>
    {
        let url = `${AUTH}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}`;
        return(
            <meta http-equiv="refresh" content={"0; url="+url} />
        );
    }

    return(
        
        <div>
            <Switch>    
                <Route path="/music" children={<LogIn/>}/>   
                <Route path="/:responseToken" children={<MusicViewer/>}/>
            </Switch>
        </div>
    );
}

export default Music; 