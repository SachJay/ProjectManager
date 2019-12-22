import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

var Tasks = ({task="Undefined"}) => (
  <h1>{task}</h1>
);

var SprintColumn = ({title="To Do", tasks=[]}) => (
  <div className="item col-md-3">
    <div className="col-md-12 bg-danger pb-1 rounded-lg">
      <h2>{title}</h2>
      {
        tasks.map((task) =>
          <SprintRow title={task.title}/>
        )
      }
    </div>
  </div>
);

var SprintRow = ({title="Interface", desc="Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude."}) => (
  <div className="col-12 bg-warning mb-4 rounded-lg">
    <h4>{title}</h4>
     {desc}
  </div>
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
      toDoTasks: [{"title": "Backend"},{"title": "Database"}],
      doingTasks: [{"title": "Interface"}],
      reviewTasks: [{"title": "Design"}],
      doneTasks: []
    };
  }

  renderTasks = () => {
    return (
      <ul>
        {this.state.toDoTasks.map((task, id) =>
          <li key={id}>
            <Tasks task={task.title}/>
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
        <h2>This Bug Tracker is {this.state.open ? 'Online' : 'Offline'}</h2>

        <div className="row">
          <SprintColumn title="To Do" tasks={this.state.toDoTasks}></SprintColumn>
          <SprintColumn title="Doing" tasks={this.state.doingTasks}></SprintColumn>
          <SprintColumn title="Review" tasks={this.state.reviewTasks}></SprintColumn>
          <SprintColumn title="Done" tasks={this.state.doneTasks}></SprintColumn>
        </div>
          
        <input ref={this.textInput}></input>
        <br></br>
        <button onClick={this.onButtonClick}>Submit</button>

        {this.state.isUpdated ? this.getData() : this.addTask()}
      </div>
    )
  }
}


export default App;
