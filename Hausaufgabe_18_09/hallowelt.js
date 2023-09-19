const figlet = require('figlet');

const message = 'Geiler Scheiss man!';

figlet.text(message, {
  font: 'Dancing Font',
}, (error, data) => {
  if (error) {
    console.log('Fehler beim Generieren des figlet-Textes:', error);
    return;
  }
  
  console.log(data);
});
