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
        if (!title || !artist || !bpm) return;
        addTrack({
            variables: {
                input: { title, artist, bpm: parseFloat(bpm), musicalKey, genre, energyLevel, notes },
            },
        });
        setTitle('');
        setArtist('');
        setBpm('');
        setMusicalKey('');
        setGenre('');
        setEnergyLevel('medium');
        setNotes('');
    };

    return (
        <div className="card">
            <h2>Add Track</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <input placeholder="Title *" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <input placeholder="Artist *" value={artist} onChange={(e) => setArtist(e.target.value)} />
                    <input placeholder="BPM *" type="number" step="0.1" value={bpm} onChange={(e) => setBpm(e.target.value)} />
                    <input placeholder="Key (e.g. 8A)" value={musicalKey} onChange={(e) => setMusicalKey(e.target.value)} />
                    <input placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                    <select value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)}>
                        <option value="low">Low Energy</option>
                        <option value="medium">Medium Energy</option>
                        <option value="high">High Energy</option>
                        <option value="peak">Peak Energy</option>
                    </select>
                    <input className="full-width" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>
                <button type="submit" className="btn-primary">Add Track</button>
            </form>
        </div>
    );
}

export default AddTrackForm;
