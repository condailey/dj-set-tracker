import mysql from 'mysql2/promise';

async function seed() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'dj_set_tracker',
    });

    await connection.execute(
        `INSERT INTO tracks (title, artist, bpm, musical_key, genre, energy_level, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
         ['Strobe', 'deadmau5', 128.0, '5A', 'Progressive House', 'high', 'Classic closer']
    );

    console.log('Track inserted!');
    await connection.end();
}

seed();