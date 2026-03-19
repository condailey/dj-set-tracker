import { useQuery, useMutation } from '@apollo/client/react';
import { GET_TRACKS, DELETE_TRACK } from '../graphql/queries';
import type { Track } from '../types/Track';

function TrackLibrary() {
    const { loading, error, data } = useQuery(GET_TRACKS);
    const [deleteTrack] = useMutation(DELETE_TRACK, {
        refetchQueries: [{ query: GET_TRACKS }],
    });

    if (loading) return <p className="loading">Loading tracks...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="card">
            <h2>Track Library</h2>
            {(data as any).tracks.length === 0 ? (
                <p className="empty">No tracks yet. Add your first track above!</p>
            ) : (
                <ul className="track-list">
                    {(data as any).tracks.map((track: Track) => (
                        <li key={track.id} className="track-item">
                            <div className="track-info">
                                <div className="track-title">{track.title} — {track.artist}</div>
                                <div className="track-tags">
                                    <span className="tag tag-bpm">{track.bpm} BPM</span>
                                    {track.musicalKey && <span className="tag tag-key">{track.musicalKey}</span>}
                                    {track.genre && <span className="tag tag-genre">{track.genre}</span>}
                                    <span className="tag tag-energy">{track.energyLevel}</span>
                                </div>
                            </div>
                            <button className="btn-danger" onClick={() => deleteTrack({ variables: { id: track.id } })}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TrackLibrary;
