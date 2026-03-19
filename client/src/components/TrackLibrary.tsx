import { useQuery } from '@apollo/client/react';                                    
import { GET_TRACKS } from '../graphql/queries';                                    
import type { Track } from '../types/Track';                                        
                                                                                    
function TrackLibrary() {                                                           
const { loading, error, data } = useQuery(GET_TRACKS);                            
                                                                                    
if (loading) return <p>Loading...</p>;                                            
if (error) return <p>Error: {error.message}</p>;                                  
                                                                                    
return (      
    <div>
    <h2>Track Library</h2>
    <ul>                                                                          
        {data.tracks.map((track: Track) => (                                        
        <li key={track.id}>                                                       
            {track.title} — {track.artist} ({track.bpm} BPM, {track.musicalKey})    
        </li>                                                                     
        ))}                                                                         
    </ul>                                                                         
    </div>      
);                                                                                
}               
                                                                                    
export default TrackLibrary;