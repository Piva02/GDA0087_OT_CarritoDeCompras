import app from './app.js';
import './database/connection.js';


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
});


