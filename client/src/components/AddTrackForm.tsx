import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { ADD_TRACK, GET_TRACKS } from '../graphql/queries';

function AddTrackForm() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [bpm, setBpm] = useState('');                                                 
    const [musicalKey, setMusicalKey] = useState('');                                   
    const [genre, setGenre] = useState('');                                             
    const [energyLevel, setEnergyLevel] = useState('medium');                           
    const [notes, setNotes] = useState('');

    const [addTrack] = useMutation(ADD_TRACK, {
        refetchQueries: [{ query: GET_TRACKS }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addTrack({
            variables: {
                input: { title, artist, bpm: parseFloat(bpm), musicalKey, genre, energyLevel, notes },
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Add Track</h2>                                                            
        <input                                                                        
          placeholder="Title"                                                         
          value={title}                                                               
          onChange={(e) => setTitle(e.target.value)}                                  
        />                                                                            
        <input                                                                      
          placeholder="Artist"                                                        
          value={artist}                                                              
          onChange={(e) => setArtist(e.target.value)}                                 
        /> 
        <input                                                                              
    placeholder="BPM"
    type="number"
    value={bpm}                                                                       
    onChange={(e) => setBpm(e.target.value)}
  />                                                                                  
  <input          
    placeholder="Key (e.g. 8A)"
    value={musicalKey}                                                                
    onChange={(e) => setMusicalKey(e.target.value)}
  />                                                                                  
  <input          
    placeholder="Genre"                                                               
    value={genre}                                                                     
    onChange={(e) => setGenre(e.target.value)}
  />                                                                                  
  <select value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)}>
    <option value="low">Low</option>                                                  
    <option value="medium">Medium</option>                                            
    <option value="high">High</option>                                                
    <option value="peak">Peak</option>                                                
   </select>       
  <input                                                                              
        placeholder="Notes"                                                               
        value={notes}
        onChange={(e) => setNotes(e.target.value)}                                        
    />                                                                               
        <button type="submit">Add</button>                                            
      </form>    
    );
}

export default AddTrackForm;