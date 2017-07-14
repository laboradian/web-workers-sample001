self.onmessage = (/*event*/) => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    const file_reader = new FileReader();

    file_reader.onload = () => {
      postMessage(file_reader.result);
    };

    file_reader.readAsDataURL(xhr.response)

  }, true);

  //xhr.overrideMimeType("text/plain; charset=x-user-defined");
  xhr.open("GET", "http://localhost:3000/img/pc.png", true);
  xhr.responseType = "blob";
  xhr.send(null);

};
