import './style.css';


// fetch('http://localhost:3300/chat', {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({ prompt: 'hello' })
// }).then((res) => res.json()).then((data) => console.log(data))

// create a drawing app

function app() {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const stream = document.getElementById('stream') as HTMLImageElement;
  const saveButton = document.querySelector('#send-button') as HTMLButtonElement;
  const streamButton = document.querySelector('#stream-button') as HTMLButtonElement;
  const clearButton = document.querySelector('#clear-button') as HTMLButtonElement;
  const c = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = 200;
  canvas.height = 200;
  c.beginPath();
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.closePath();
  document.body.appendChild(canvas)
  c.fillStyle = 'red';
  const mouse = { x: 0, y: 0, down: false };
  window.addEventListener('mousedown', (e) => {
    mouse.down = true;
  });
  window.addEventListener('mouseup', (e) => {
    mouse.down = false;
  });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if(mouse.down) {
      c.beginPath();
      c.arc(mouse.x, mouse.y, 10, 0, 2 * Math.PI);
      c.fill();
      c.closePath();
    }
  });

  saveButton.addEventListener('click', () => {
    const dataUrl = canvas.toDataURL('image/jpeg');
    const filter = dataUrl.split(',')[1]
    fetch('http://localhost:3300/image', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: filter })
    }).then((res) => res.json()).then((data) => console.log(data))
  });
  streamButton.addEventListener('click', () => {
    c.drawImage(stream, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    const final = dataUrl.split(',')[1]
    fetch('http://localhost:3300/image', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt:'what is in this image', image: final })
    })
    .then((res) => res.json()).then((data) => {
      console.log(data.message.content)
    })
    })
  clearButton.addEventListener('click', () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.beginPath();
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.closePath();
    document.body.appendChild(canvas)
    c.fillStyle = 'red';
  });
}
app()