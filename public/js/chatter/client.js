const msgDiv = document.getElementById('messages');
const socket = io.connect('http://144.91.93.57:8080');

$(window).on('load', () => {
  getMessages().then(autoScroll);  
});

function autoScroll() {
  msgDiv.scrollTop = msgDiv.scrollHeight;
}

$(() => {
  $('#send').click(() => {
    sendMessage({
      id: 999,
      name: $('#name').val(),
      message: $('#message').val()
    });
    $('#message').empty();
  });
});

socket.on('message', () => {
  latestMsg().then(autoScroll);
});

function addMessages(message) {
  $('#messages').append(`
    <div class="col-md-12">    
      <h4> ${message.name} </h4>
      <p>  ${message.message} </p>
    </div>
    `);
}

function getMessages() {
  const sync = $.Deferred();
  $('#messages').empty();
  $.ajax({
    type: 'GET',
    url: 'http://144.91.93.57:8070/call',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: { id: 999 },
    success: (data) => {
      data.forEach(addMessages);
    }
  });
  setTimeout(() => {
    sync.resolve();
  }, 1500);
  return sync;
}

function latestMsg() {
  const sync = $.Deferred();
  $.ajax({
    type: 'GET',
    url: 'http://144.91.93.57:8070/call',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: { id: 999 },
    success: (data) => {
      const lastMsg = data[data.length - 1];
      addMessages(lastMsg);
    }
  });
  setTimeout(() => {
    sync.resolve();
  }, 1500);
  return sync;
}

function sendMessage(message) {
  $.ajax({
    type: 'POST',
    url: 'http://144.91.93.57:8070/msg',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    data: message,
    success: () => {setTimeout( () => {
      latestMsg().then(autoScroll);
    }, 1500)}
  });
}
