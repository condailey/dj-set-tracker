import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_TRACKS, GET_COMPATIBLE_TRACKS } from '../graphql/queries';
import type { Track } from '../types/Track';

function TransitionFinder() {
    const [selectedTrackId, setSelectedTrackId] = useState('');
    const { data: tracksData } = useQuery(GET_TRACKS);
    const { data: compatibleData, loading } = useQuery(GET_COMPATIBLE_TRACKS, {
        variables: { trackId: selectedTrackId },
        skip: !selectedTrackId,
    });

    const selectedTrack = tracksData?.tracks.find((t: Track) => String(t.id) === selectedTrackId);

    return (
        <div className="card">
            <h2>Transition Finder</h2>
            <p style={{ marginBottom: '16px' }}>Select a track to find compatible transitions by key and BPM.</p>

            <select value={selectedTrackId} onChange={(e) => setSelectedTrackId(e.target.value)}>
                <option value="">Select a track...</option>
                {tracksData?.tracks.map((track: Track) => (
                    <option key={track.id} value={track.id}>
                        {track.title} — {track.artist} ({track.bpm} BPM, {track.musicalKey})
                    </option>
                ))}
            </select>

            {selectedTrack && (
                <div style={{ margin: '16px 0' }}>
                    <strong style={{ color: 'var(--text-h)' }}>Source:</strong>{' '}
                    <span className="tag tag-bpm">{selectedTrack.bpm} BPM</span>{' '}
                    <span className="tag tag-key">{selectedTrack.musicalKey}</span>
                    <span style={{ marginLeft: '8px', fontSize: '0.85rem' }}>
                        (compatible: {selectedTrack.bpm - 6}–{selectedTrack.bpm + 6} BPM)
                    </span>
                </div>
            )}

            {loading && <p className="loading">Finding compatible tracks...</p>}

            {compatibleData?.compatibleTracks.length === 0 && (
                <p className="empty">No compatible tracks found. Add more tracks to your library!</p>
            )}

            {compatibleData?.compatibleTracks.length > 0 && (
                <ul className="track-list">
                    {compatibleData.compatibleTracks.map((track: Track) => (
                        <li key={track.id} className="track-item">
                            <div className="track-info">
                                <div className="track-title">{track.title} — {track.artist}</div>
                                <div className="track-tags">
                                    <span className="tag tag-bpm">{track.bpm} BPM</span>
                                    {track.musicalKey && <span className="tag tag-key">{track.musicalKey}</span>}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TransitionFinder;
