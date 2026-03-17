import mysql from 'mysql2/promise';

const getConnection = () => mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'dj_set_tracker',
});

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
        }
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
};

export default trackResolvers;