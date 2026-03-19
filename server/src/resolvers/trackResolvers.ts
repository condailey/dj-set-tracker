import mysql from 'mysql2/promise';

const getConnection = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dj_set_tracker',
});

function getCompatibleKeys(camelotKey: string): string[]{
    const number = parseInt(camelotKey);
    const letter = camelotKey.slice(-1);

    const prev = number === 1 ? 12 : number - 1;
    const next = number === 12 ? 1 : number + 1;
    const otherLetter = letter === 'A' ? 'B' : 'A';

    return [
        `${prev}${letter}`,
        `${number}${letter}`,
        `${next}${letter}`,
        `${number}${otherLetter}`
    ];
}

const trackResolvers = {
    Query: {
        tracks: async () => {
            const connection = await getConnection();
            const [rows] = await connection.execute('SELECT * FROM tracks');
            await connection.end();
            return rows;
        },
        track: async (_: any, args: { id: string }) => {
            const connection = await getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM tracks WHERE id = ?',
                [args.id]
            );
            await connection.end();
            return (rows as any[])[0];
        },
        tracksByGenre: async (_: any, args: { genre: any }) => {
            const connection = await getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM tracks WHERE genre = ?',
                [args.genre]
            );
            await connection.end();
            return rows;
        },
        tracksByBpmRange: async(_: any, args: {min: number; max: number }) => {
            const connection = await getConnection();
            const [rows] = await connection.execute(
                'SELECT * FROM tracks WHERE bpm BETWEEN ? AND ?',
                [args.min, args.max]
            );
            await connection.end();
            return rows;
        },
        compatibleTracks: async (_: any, args: { trackId: string }) => {
            const connection = await getConnection();

            const [sourceRows] = await connection.execute(
                'SELECT * FROM tracks WHERE id = ?',
                [args.trackId]
            );
            const sourceTrack = (sourceRows as any[])[0];
            if (!sourceTrack) return [];

            const compatibleKeys = getCompatibleKeys(sourceTrack.musical_key);

            const placeholders = compatibleKeys.map(() => '?').join(', ');
            const [rows] = await connection.execute(
                `SELECT * FROM tracks
                 WHERE musical_key IN (${placeholders})
                 AND bpm BETWEEN ? AND ?
                 AND id != ?`,
                 [...compatibleKeys, sourceTrack.bpm - 6, sourceTrack.bpm + 6, args.trackId]
            );
            await connection.end();
            return rows;
        },
    },
    Mutation: {
        addTrack: async (_: any, args: { input: any }) => {
            const { title, artist, bpm, musicalKey, genre, energyLevel, notes } = args.input;
            const connection = await getConnection();
            const [result] = await connection.execute(
                `INSERT INTO tracks (title, artist, bpm, musical_key, genre, energy_level, notes)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [title, artist, bpm, musicalKey, genre, energyLevel, notes]
            );
            const insertId = (result as any).insertId;
            const [rows] = await connection.execute('SELECT * FROM tracks WHERE id = ?', [insertId]);
            await connection.end();
            return (rows as any[])[0];
        },
    },
    Track: {        
      musicalKey: (parent: any) => parent.musical_key,
      energyLevel: (parent: any) => parent.energy_level,                              
    },
};

export default trackResolvers;