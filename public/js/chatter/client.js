const msgDiv = document.getElementById('messages');
const socket = io.connect('http://zumisworld.ga:8080');
const chatServerUrl = 'http://zumisworld.ga:8070';
const waitValue = 500;

window.addEventListener('load', (ev) => {
  document.getElementById('name').value = 'testIcle';
  if (document.getElementById('name').value == null || document.getElementById('name').value === 'undefined' || document.getElementById('name').value === '') {
    document.getElementById('send').disabled = true;
  }
  getMessages().then();
});

function autoScroll() {
  msgDiv.scrollTop = msgDiv.scrollHeight;
}

document.getElementById('send').addEventListener('click', () => {
  if (document.getElementById('name').value != null || document.getElementById('name').value !== 'undefined') {
    sendMessage({
      id: 999,
      name: document.getElementById('name').value,
      message: document.getElementById('message').value
    });
    document.getElementById('message').value = '';
  }
});

socket.on('message', () => {
  latestMsg().then();
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
  await sleep(waitValue);
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
      autoScroll();
    },
    error: (error) => {
      console.log('server error: ', error);
      console.log('using local db');
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8070/call',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        data: {id: 999},
        success: (data) => {
          data.forEach(addMessages);
          autoScroll();
        }
      })
    }
  });
}

async function latestMsg() {
  await sleep(waitValue);
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
      autoScroll();
    },
    error: (error) => {
      console.log('server error: ', error);
      console.log('using local db');
      $.ajax({
        type: 'GET',
        url: 'http://localhost:8070/call',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        data: { id: 999 },
        success: (data) => {
          const lastMsg = data[data.length - 1];
          addMessages(lastMsg);
          autoScroll();
        }
      })
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
    success: () => {},
    error: (error) => {
      console.log('server error: ', error);
      console.log('using local db');
      $.ajax({
        type: 'POST',
        url: 'http://localhost:8070/msg',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        data: message,
        success: () => {}
      })
    }
  });
}

function sleep(ms){
  return new Promise(resolve => {
    setTimeout(resolve,ms)
  })
}
