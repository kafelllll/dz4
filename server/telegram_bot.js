const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

module.exports = async (app, emitter) => {
 const router = await bot.createWebhook({ // ожидать завершения операции и вернуть ее результат, 
// прежде чем продолжить выполнение следующих строк кода.
  domain: process.env.BASE_URL
 });

 bot.start((ctx) => {
  
  ctx.reply('Welcome, use command "/login" to use your auth token\n\nExample: /login 12345-54645-564564...');
 });

 bot.command('login', (ctx) => {

  const [command, id] = ctx.message.text.split(' ');
  console.log(`Try to login id:${id}`);
  const userInfo = {
   firstName: ctx.from.first_name,
   lastName: ctx.from.last_name
  };

  emitter.emit(`login-${id}`, userInfo);  // уведомлениe или передачи данных о событии другим частям кода
 });

 app.use(router);
};