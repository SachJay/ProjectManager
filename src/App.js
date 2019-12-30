import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import displayBacklogPage from "./components/backlog"
import displaySprintPage from "./components/sprint"

var Tasks = ({task="Undefined"}) => (
  <h1>{task}</h1>
);

class App extends Component {
  constructor(){
    super();

    this.textInputTitle = React.createRef();
    this.textInputInfo = React.createRef();

    this.state = {
      open: false,
      isUpdated: true,
      isFetching: false,
      choosenCol: 0,
      dataBase: [{"title": "Backend", "column" : 1},{"title": "Database", "column" : 2},{"title": "Design", "column" : 3},{"title": "Interface", "column" : 1},{"title": "Interface", "column" : 0}]
    };
  }

  updateChoosenCol = (id) => {
      this.setState({choosenCol: id});
  }

  renderTasks = () => {
    return (
      <ul>
        {this.state.dataBase.map((task, id) =>
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
    xhr.send(JSON.stringify({"title": this.textInputTitle.current.value, desc: this.textInputInfo.current.value}));
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



  

    /*<h2>This Bug Tracker is {this.state.open ? 'Online' : 'Offline'}</h2>

       
          
        <input ref={this.textInputTitle}></input>
        <br></br>
        <input ref={this.textInputInfo}></input>
        <br></br>
        <button onClick={this.onButtonClick}>Submit</button>

        {this.state.isUpdated ? this.getData() : this.addTask()}*/ 
  

  render(){
    return (
      <Router> 
        <header>

        </header>
        <Switch>
          <Route exact path="/backlog" component={displayBacklogPage}/>
          <Route exact path="/sprint" component={displaySprintPage}/>
        </Switch>
      </Router>
      
    )
  }
}


export default App;
