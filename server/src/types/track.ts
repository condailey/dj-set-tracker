type EnergyLevel = 'low' | 'medium' | 'high' | 'peak'; 
type TransitionRating = 'smooth' | 'decent' | 'rough';
type SetStatus = 'planned' | 'played';

interface Track {
    id: number;
    title: string;
    artist: string;
    bpm: number;
    musicalKey: string | null;
    genre: string | null;
    energyLevel: EnergyLevel;
    notes: string | null;
}

const testTrack: Track = {
    id: 1,
    title: 'Strobe', 
    artist: 'deadmau5',
    bpm: 128.0,
    musicalKey: '5A',
    genre: 'Progressive House',
    energyLevel: 'high',
    notes: 'Classic closer track',
};

console.log(`Track: ${testTrack.title} by ${testTrack.artist}`);