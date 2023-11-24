const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 8080;


mongoose.connect('mongodb+srv://<usuario>:<contraseña>@<cluster>/<base_de_datos>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});


const Product = require('./dao/models/productModel');
const Cart = require('./dao/models/cartModel');
const Message = require('./dao/models/messageModel');


app.use(express.json());


const productsController = require('./controllers/productsController')(Product);
const cartsController = require('./controllers/cartsController')(Cart);


app.use('/api/products', productsController);
app.use('/api/carts', cartsController);


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));




io.on('connection', (socket) => {

});


server.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
