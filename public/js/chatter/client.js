const msgDiv = document.getElementById('messages');
const socket = io.connect('http://zumisworld.ga:8080');
const chatServerUrl = 'http://zumisworld.ga:8070'

window.addEventListener('load', (ev) => {
  if (getMessages()) autoScroll();
});

function autoScroll() {
  msgDiv.scrollTop = msgDiv.scrollHeight;
}

document.getElementById('send').addEventListener('click', () => {
  sendMessage({
    id: 999,
    name: document.getElementById('name').value,
    message: document.getElementById('message').value
  });
  document.getElementById('message').value = '';
});

socket.on('message', () => {
  if (getMessages()) autoScroll();
});

function addMessages(message) {
  document.getElementById('messages').innerHTML += `
    <div class="col-md-12">    
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>
    </div>
    `;
}

async function getMessages() {
  await sleep(1500);
  document.getElementById('messages').innerHTML = '';
  $.ajax({
    type: 'GET',
    url: chatServerUrl+'/call',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: { id: 999 },
    success: (data) => {
      data.forEach(addMessages);
    }
  });
}

async function latestMsg() {
  await sleep(1500);
  $.ajax({
    type: 'GET',
    url: chatServerUrl+'/call',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: { id: 999 },
    success: (data) => {
      const lastMsg = data[data.length - 1];
      addMessages(lastMsg);
    }
  });
}

function sendMessage(message) {
  $.ajax({
    type: 'POST',
    url: chatServerUrl+'/msg',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: message,
    success: () => {}
  });
}

function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms)
  })
}
