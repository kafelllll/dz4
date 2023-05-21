const express = require('express'); // функция, которую мы можем вызвать для создания экземпляра 
const bodyParser = require('body-parser'); // позволяет нам получать данные, отправленные с клиента на сервер, 
// и преобразовывать их в удобный формат

const cors = require('cors'); // позволяет обойти ограничения SOP и обрабатывать запросы с разных доменов
const events = require('events'); // для работы с событиями
const path = require('path'); // предоставляет утилиты для работы с путями// 

const PORT = 8000;

const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../public/dist')));

app.get('/connect', (req, res) => {
 res.writeHead(
  200,
  {
   'Connection': 'keep alive',
   'Content-Type': 'text/event-stream',
   'Cache-Control': 'no-cache'
  }
 );

 emitter.on('new-message', (message) => {
 
  console.log('message:', message);
  res.write(`data: ${JSON.stringify(message)} \n\n`);
 });
});

app.post('/messages', (req, res) => {
 const message = req.body;
 console.log('message:', message);
 emitter.emit('new-message', message);
 return res.status(200).send();
});

app.listen(PORT, () => console.log(`Server was started on ${PORT}`));