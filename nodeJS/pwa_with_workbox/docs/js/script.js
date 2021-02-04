/ * Script to check if the browser is compatible and register the SW * /
if ('serviceWorker' in navigator) { 
   window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js');
   });
 }