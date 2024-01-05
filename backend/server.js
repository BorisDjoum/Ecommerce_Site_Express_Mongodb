const http = require('http');
const app = require('./app');

const normalizePort = val => {
    //convertit val en un entier en base 10
    const port = parseInt(val, 10);

    if (isNaN(port)){
        return port;
    }
    if (port >= 0) {
        return port;
    }
    //sinon la valeur n'est ni un entier ni une chaine
    return false;
};

const port = normalizePort(process.env.PORT || '3000')

//attribution du nom 'port' à la valeur port
app.set('port', port);

const errorHandler = error =>{
    if (error.syscall !== 'listen'){
        //afficher explicitement l'erreur pour faciliter le déboggage
        throw error;
    }
    const address = server.address();
    //si address est de type string alors bind prend la valeur 'pipe' + address sinon la valeur 'port' + port
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (error.code) {
        //si l'utilisateur n'a pas les droits
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.');
            process.exit(1);
            break;

        //si le port est occupé
        case 'EADDRINUSE':
            console.error(bind + 'is already in use.');
            process.exit(1);
            break;

        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on("listening", () =>{
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : ' port ' + port;
    console.log('listening on' + bind);
});

server.listen(port);