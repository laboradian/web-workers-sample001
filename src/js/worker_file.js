/* global FileReaderSync */
self.onmessage = (event) => {

  // FileReaderSync は Worker内でしか使えない
  const reader = new FileReaderSync();
  const val = reader.readAsDataURL(event.data);

  postMessage(val);

};
