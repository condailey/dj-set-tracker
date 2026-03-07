import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/tracks', async(req, res) => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'dj_set_tracker',
    });
    const [rows] = await connection.execute('SELECT * FROM tracks');
    await connection.end();
    res.json(rows);
});

app.post('/tracks', async (req, res) => {
    const {title, artist, bpm, musicalKey, genre, energyLevel, notes } = req.body;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'dj_set_tracker',
    });
    const [result] = await connection.execute(
        `INSERT INTO tracks (title, artist, bpm, musical_key, genre, energy_level, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
         [title, artist, bpm, musicalKey, genre, energyLevel, notes]
    );

    await connection.end();
    res.json({ message: `Track added!`, id: (result as any).insertId });
});


app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});