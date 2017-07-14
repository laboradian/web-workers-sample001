
let si;

self.addEventListener('message', (event) => {
  console.log('Recieved a message on the Worker side: event.data = ', event.data);

  let t = 0;

  switch (event.data.action) {
    case 'start':
      si = setInterval(() => {
        t += 1;
        self.postMessage({msg: `${t}秒経過`})
    
      }, 1000);
      break;
    case 'stop':
      clearInterval(si);
      t = 0
      break;
  }
});
