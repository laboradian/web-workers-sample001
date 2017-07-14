self.onmessage = (/*event*/) => {

  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    const file_reader = new FileReader();

    file_reader.onload = () => {
      postMessage(file_reader.result);
    };

    file_reader.readAsDataURL(xhr.response)

  }, true);

  xhr.open("GET", "../img/pc.png", true);
  xhr.responseType = "blob";
  xhr.send(null);

};
