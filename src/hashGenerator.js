import bcrypt from 'bcrypt';

const generarHash = async () => {
    const hashedPassword = await bcrypt.hash('', 10);
    console.log('Contraseña hasheada:', hashedPassword);
};

generarHash();
