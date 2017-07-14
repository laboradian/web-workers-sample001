
let connections = 0

self.addEventListener("connect", (event) => {

  const port = event.ports[0];

  connections++;

  port.addEventListener("message", (/*e*/) => {
    port.postMessage(`接続数: ${connections}`);
  });

  port.start();

});
