import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navigation from "./components/navigation"
import DisplayBacklogPage from "./components/backlog"
import DisplaySprintPage from "./components/sprint"

var Tasks = ({task="Undefined"}) => (
  <h1>{task}</h1>
);

class App extends Component {
  constructor(){
    super();

    this.state = {
      open: false,
      isUpdated: true,
      isFetching: false,
      choosenCol: 0,
      dataBase: [
        /*{"title": "Backlog Design", "column" : 1},
        {"title": "Backend", "column" : 1},
        {"title": "Database", "column" : 2},
        {"title": "Design", "column" : 3},
        {"title": "Interface", "column" : 1},
        {"title": "Sprint Page", "column" : 0}*/
      ]
    };
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

  onButtonClick = () => {
    this.setState({isUpdated: !this.state.isUpdated})
  }

  getData = () => {
    try{
      fetch('http://localhost:3000/data').then(result => {
        return result.json();
      }).then(result => {
        this.setState({dataBase: result})
        this.nextId = result.length;
      })
    } catch {
      console.log("Could not load data");
    }
  }

  componentDidMount() {
    const socket = socketIOClient('http://localhost:3000');
    socket.on('message', () => {
      this.setState({isUpdated: true});
    });
  }

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
        {this.getData()}
        <Navigation></Navigation>
        <Switch>
          <Route
            exact path="/backlog"
            render={(routeProps) => (
              <DisplayBacklogPage {...routeProps} dataBase={this.state.dataBase}/>
            )}
          />

          <Route
            exact path="/sprint"
            render={(routeProps) => (
              <DisplaySprintPage {...routeProps} dataBase={this.state.dataBase}/>
            )}
          />

          {/*<Route exact path="/sprint" component={displaySprintPage}/>*/}
        </Switch>
      </Router>
      
    )
  }
}

export default App;
