import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TRACKS, GET_SETS, CREATE_SET, ADD_TRACK_TO_SET } from '../graphql/queries';
import type { Track } from '../types/Track';

function SetPlanner() {
    const [setName, setSetName] = useState('');
    const [venue, setVenue] = useState('');
    const [datePlayed, setDatePlayed] = useState('');
    const [selectedSetId, setSelectedSetId] = useState('');
    const [selectedTrackId, setSelectedTrackId] = useState('');

    const { data: tracksData } = useQuery(GET_TRACKS);
    const { data: setsData } = useQuery(GET_SETS);

    const [createSet] = useMutation(CREATE_SET, {
        refetchQueries: [{ query: GET_SETS }],
    });
    const [addTrackToSet] = useMutation(ADD_TRACK_TO_SET, {
        refetchQueries: [{ query: GET_SETS }],
    });

    const handleCreateSet = (e: React.FormEvent) => {
        e.preventDefault();
        if (!setName) return;
        createSet({
            variables: {
                input: { name: setName, datePlayed, venue, notes: '', status: 'planned' },
            },
        });
        setSetName('');
        setVenue('');
        setDatePlayed('');
    };

    const handleAddTrack = () => {
        if (!selectedSetId || !selectedTrackId) return;
        const currentSet = setsData?.sets.find((s: any) => s.id === selectedSetId);
        const position = (currentSet?.tracks?.length || 0) + 1;
        addTrackToSet({
            variables: { setId: selectedSetId, trackId: selectedTrackId, position },
        });
    };

    return (
        <div>
            <div className="card">
                <h2>Create New Set</h2>
                <form onSubmit={handleCreateSet}>
                    <div className="form-grid">
                        <input placeholder="Set name *" value={setName} onChange={(e) => setSetName(e.target.value)} />
                        <input placeholder="Venue" value={venue} onChange={(e) => setVenue(e.target.value)} />
                        <input type="date" value={datePlayed} onChange={(e) => setDatePlayed(e.target.value)} />
                    </div>
                    <button type="submit" className="btn-primary">Create Set</button>
                </form>
            </div>

            <div className="card">
                <h2>Add Track to Set</h2>
                <div className="inline-row">
                    <select value={selectedSetId} onChange={(e) => setSelectedSetId(e.target.value)}>
                        <option value="">Select a set...</option>
                        {setsData?.sets.map((set: any) => (
                            <option key={set.id} value={set.id}>{set.name}</option>
                        ))}
                    </select>
                    <select value={selectedTrackId} onChange={(e) => setSelectedTrackId(e.target.value)}>
                        <option value="">Select a track...</option>
                        {tracksData?.tracks.map((track: Track) => (
                            <option key={track.id} value={track.id}>
                                {track.title} — {track.artist}
                            </option>
                        ))}
                    </select>
                    <button className="btn-primary" onClick={handleAddTrack}>Add</button>
                </div>
            </div>

            <div className="card">
                <h2>Your Sets</h2>
                {!setsData?.sets.length ? (
                    <p className="empty">No sets yet. Create one above!</p>
                ) : (
                    setsData.sets.map((set: any) => (
                        <div key={set.id} className="set-card">
                            <h4>
                                {set.name}{' '}
                                <span className={`badge badge-${set.status}`}>{set.status}</span>
                            </h4>
                            <p>{set.venue}{set.venue && set.datePlayed ? ' — ' : ''}{set.datePlayed}</p>
                            {set.tracks.length === 0 ? (
                                <p className="empty" style={{ padding: '12px' }}>No tracks in this set yet.</p>
                            ) : (
                                <ol>
                                    {set.tracks.map((st: any) => (
                                        <li key={st.id}>
                                            <span style={{ color: 'var(--text-h)' }}>{st.track.title}</span> — {st.track.artist}{' '}
                                            <span className="tag tag-bpm">{st.track.bpm} BPM</span>{' '}
                                            {st.track.musicalKey && <span className="tag tag-key">{st.track.musicalKey}</span>}
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SetPlanner;
