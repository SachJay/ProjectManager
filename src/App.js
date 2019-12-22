import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

var Tasks = ({task="Undefined"}) => (
  <h1>{task}</h1>
);

class App extends Component {
  constructor(){
    super();

    var nextId = 0;

    this.textInput = React.createRef();
    
    this.state = {
      open: false,
      isUpdated: true,
      isFetching: false,
      data: [{"task": "Interface"},{"task": "Design"},{"task": "Backend"}]
    };
  }

  renderTasks = () => {
    return (
      <ul>
        {this.state.data.map((task, id) =>
          <li key={id}>
            <Tasks task={task.task}/>
          </li>
        )}
      </ul>
    )
  }

  addTask = () => {
    var xhr = new XMLHttpRequest();
    // open the request with the verb and the url
    xhr.open('POST', 'http://localhost:3000/data', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify({"task": this.textInput.current.value}));
    
    console.log(JSON.stringify({"task": this.textInput.current.value}));
  }

  onButtonClick = () => {
    this.setState({isUpdated: !this.state.isUpdated})
  }

  getData = () => {
    /*try{
      fetch('http://localhost:3000/data').then(result => {
        return result.json();
      }).then(result => {
        this.setState({data: result})
        this.nextId = result.length;
      })
    } catch {
      console.log("Could not load data");
    }*/
  
    return this.renderTasks();
  }
/*
  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('message', () => {
      this.setState({isUpdated: true});
    });
  }*/

  render(){
    

    return (
     
      <div className="container my-5">
          <div className="row">

            <div className="item col-md-3">
              <div className="col-md-12 bg-danger pb-1 rounded-lg">
                <h2>To do</h2>
                <div className="col-12 bg-warning mb-4 rounded-lg">
                  <h4>Interface</h4>
                  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas 
                </div>
               
                <div className="col-12 bg-warning mb-4 rounded-lg">
                 <h4>Interface</h4>
                  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas 
                </div>

                <div className="col-12 bg-warning mb-4 rounded-lg">
                  <h4>Interface</h4>
                  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas 
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="col-md-12 bg-danger pb-1">
                <h2>Doing</h2>
                EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas
              </div>
            </div>

            <div className="col-md-3">
              <div className="col-md-12 bg-danger pb-1">
                <h2>Review</h2>
                EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas
              </div>
            </div>

            <div className="col-md-3">
              <div className="col-md-12 bg-danger pb-1">
                <h2>Done</h2>
                EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas  EDfs ada gead stgaes sadas dadsad sdasdsa dsad asdasda dasda sdas dasda sdas
              </div>
            </div>

          </div>
          
        
        <h2>This Bug Tracker is {this.state.open ? 'Online' : 'Offline'}</h2>

        <h3>Remaining Tasks</h3>
        <input ref={this.textInput}></input>
        <br></br>
        <button onClick={this.onButtonClick}>Submit</button>
        {this.state.isUpdated ? this.getData() : this.addTask()}
      </div>
    )
  }
}


export default App;
