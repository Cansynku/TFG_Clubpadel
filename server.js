const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'caraculo',
    database: 'clubpadelnuevo'
});

connection.connect();

app.use(express.json());

app.use(express.static('public'));

app.get('/profesores', (req, res) => {
    connection.query('SELECT * FROM profesores', (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener los datos de los profesores' });
        } else {
            res.json(results);
        }
    });
});

app.get('/verificar-dni/:dni', (req, res) => {
    const dni = req.params.dni;

    connection.query('SELECT * FROM alumnos WHERE dni = ?', [dni], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al verificar el DNI' });
        } else {
            if (results.length > 0) {
                res.json({ valid: true });
            } else {
                res.json({ valid: false });
            }
        }
    });
});


app.post('/enviar-opinion', (req, res) => {
    const { profesorId, comentario, dniAlumno } = req.body; // Asegúr de que todos los campos necesarios estén presentes

    // Construir el objeto de datos para la inserción en la base de datos
    const opinionData = {
        profesor_id: profesorId,
        comentario: comentario,
        dni_alumno: dniAlumno // Agregar el campo dni_alumno
    };

    // Insertar la opinión en la base de datos
    connection.query('INSERT INTO opiniones SET ?', opinionData, (error, results) => {
        if (error) {
            console.error('Error al guardar la opinión en la base de datos:', error);
            res.status(500).json({ error: 'Error al guardar la opinión en la base de datos' });
        } else {
            console.log('Opinión guardada correctamente en la base de datos');
            res.json({ message: 'Opinión recibida y guardada correctamente' });
        }
    });
});



app.get('/comentarios', (req, res) => {
    connection.query('SELECT o.comentario, p.nombre AS profesor \
                      FROM opiniones o \
                      INNER JOIN profesores p ON o.profesor_id = p.id',
        (error, results, fields) => {
            if (error) {
                res.status(500).json({ error: 'Error al obtener los comentarios' });
            } else {
                console.log(results); // Verifica el formato de los resultados
                const comentarios = results.map(comentario => {
                    return {
                        comentario: comentario.comentario,
                        profesor: comentario.profesor
                    };
                });

                res.json(comentarios);
            }
        });
});







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express.js iniciado en el puerto ${PORT}`);
}); 