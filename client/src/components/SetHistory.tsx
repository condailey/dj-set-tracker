import { useQuery } from '@apollo/client/react';
import { GET_SETS } from '../graphql/queries';

function SetHistory() {
    const { loading, error, data } = useQuery(GET_SETS);

    if (loading) return <p className="loading">Loading sets...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const playedSets = (data as any).sets.filter((set: any) => set.status === 'played');

    return (
        <div className="card">
            <h2>Set History</h2>
            {playedSets.length === 0 ? (
                <p className="empty">No played sets yet. Mark a set as "played" to see it here.</p>
            ) : (
                playedSets.map((set: any) => {
                    const bpms = set.tracks.map((st: any) => st.track.bpm);
                    const avgBpm = bpms.length > 0
                        ? (bpms.reduce((sum: number, b: number) => sum + b, 0) / bpms.length).toFixed(1)
                        : 'N/A';

                    return (
                        <div key={set.id} className="set-card">
                            <h4>{set.name} <span className="badge badge-played">played</span></h4>
                            <p>{set.venue}{set.venue && set.datePlayed ? ' — ' : ''}{set.datePlayed}</p>
                            <div className="stats">
                                <span className="stat"><span className="stat-value">{set.tracks.length}</span> tracks</span>
                                <span className="stat">Avg BPM: <span className="stat-value">{avgBpm}</span></span>
                            </div>
                            <ol>
                                {set.tracks.map((st: any) => (
                                    <li key={st.id}>
                                        <span style={{ color: 'var(--text-h)' }}>{st.track.title}</span> — {st.track.artist}{' '}
                                        <span className="tag tag-bpm">{st.track.bpm} BPM</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SetHistory;