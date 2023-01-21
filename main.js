
//AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

const axiosInstance = axios.create({
  baseURL : 'https://jsonplaceholder.typicode.com'
})

axiosInstance.get('/comments?_limit=5')
  .then(res => showOutput(res))
  .catch(err => console.log(err));

// GET REQUEST
function getTodos() {
  // console.log('GET Request');

  //long way of axios get
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos/',
  //   params :{
  //     _limit : 5
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err));

  //short way of axios get
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout:5000})
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// POST REQUEST
function addTodo() {
  // console.log('POST Request');
  axios.post('https://jsonplaceholder.typicode.com/todos', data={title:'New Todo', completed:false})
    .then(res => showOutput(res))
    .catch(err => console.log(err)) 
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  //PUT
  // axios.put('https://jsonplaceholder.typicode.com/todos/1', data={title:'Updated Todo', completed:true})
  //   .then(res => showOutput(res))
  //   .catch(err => console.log(err)) 

  //PATCH
  axios.patch('https://jsonplaceholder.typicode.com/todos/1', data={title:'Updated Todo', completed:true})
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');
  axios.delete('https://jsonplaceholder.typicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.log(err))
}

// SIMULTANEOUS DATA
function getData() {
  // console.log('Simultaneous Request');
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
    .then(axios.spread((todos, posts) => {console.log(todos); showOutput(posts)}))
    .catch(err => console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');
  const config ={
    headers:{
      'Content-type': 'application/json',
      Authorization: 'some token'
    }
  };

  axios.post('https://jsonplaceholder.typicode.com/todos', data={title:'New Todo', completed:false}, config)
    .then(res => showOutput(res))
    .catch(err => console.log(err)) 
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log('Transform Response');
  const options = {
    method : 'post',
    url : 'https://jsonplaceholder.typicode.com/todos',
    data : {
      title : 'Hellow World'
    },
    transformResponse: axios.defaults.transformResponse.concat(data => {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios(options).then(res => showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
  // console.log('Error Handling');
  axios.get('https://jsonplaceholder.typicode.com/todsos?_limit=5', {
    // validateStatus: function(status){
    //   return status<500; 
    // }
  })
  .then(res => showOutput(res))
  .catch(err => {
    if(err.response){
      console.log(err.response.status)
      console.log(err.response.data)
      console.log(err.response.headers)
    }
  })
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');
  const source = axios.CancelToken.source();

  axios.get('https://jsonplaceholder.typicode.com/todsos?_limit=5', {
    cancelToken: source.token
  })
    .then(res => showOutput(res))
    .catch(thrown => {
      if(axios.isCancel(thrown)){
        console.log('Request Cancelled', thrown.message);
      }
    });
    // if(true)
      source.cancel('Request Cancelled');
}


// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url}`);
    return config;
  },
  error => {
    return new Promise.reject(error);
  }
)

// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
