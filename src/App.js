import React, {Component} from 'react';
import './App.css';
import socketIOClient from "socket.io-client";

var Tasks = ({task="Undefined"}) => (
  <h1>{task}</h1>
);

var SprintRow = ({title="Interface", desc="Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude."}) => (
  <div className="col-12 bg-warning mb-4 rounded-lg pb-3 pt-2">
    <h4 className="text-center">{title}</h4>
     {desc}
  </div>
);


var SprintRowTitle = ({title="Interface"}) => (

    <div className="col-12 bg-warning mb-4 rounded-lg py-1 text-center">
      {title}
    </div>
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

  checkCol = (task, id) => {
   
  }

  updateChoosenCol = (id) => {
      this.setState({choosenCol: id});
  }

  addButtonPanel = (id) => (
    <button className="col-md-12 bg-warning pb-1 rounded-lg border-0 text-white mb-4" onClick={() => this.updateChoosenCol(id)}>Add New Task</button>
  );

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

  addPanel = () => (
    <div className=" bg-warning rounded-lg mb-4 py-3 ">
      <div className=" col-12 input-group-sm">
        <textarea rows="1" className="mb-3 form-control" placeholder="Title" type="text"></textarea>
      
        <textarea rows="3" className="mb-3 form-control" placeholder="Description" type="text"></textarea>
      </div>
  
      <div className="col-12">
        <button className="col-12 bg-info pb-1 rounded-lg border-0 text-white mb-2">Add Task</button>
      </div>
      
      <div className="col-12 text-center">
        <button className="col-5 bg-info pb-1 rounded-lg border-0 text-white mb-2" onClick={() => this.updateChoosenCol(-1)}>Cancel</button>
      </div>
    </div>
  );

  backlogCondition = (task) => {
    if(task.column == 0){
      return (
        <div className="col-4">
          <SprintRowTitle title={task.title}/>
        </div>
      )
    }
  }

  sprintCondition = (task) => {
    if(task.column != 0){
      return (
        <div className="col-12">
          <SprintRowTitle title={task.title}/>
        </div>
      )
    }
  }

  sprintColumn = (title="To Do", id=0) => (
    <div className="item col-md-3">
      <div className="col-md-12 bg-danger pb-1 rounded-lg">
        <h1 className="text-center pb-4">{title}</h1>
        {
          this.state.dataBase.map((task) => {
            if(task.column == id){
              return <SprintRow title={task.title}/>
             }
          })
        }
        {this.state.choosenCol == id ? this.addPanel() : this.addButtonPanel(id)}
      </div>
    </div>
  )

  column = (title, condition) => (

    <div className="col-12 bg-danger rounded-lg">
      <h1 className="text-center pb-4">{title}</h1>
        
        <div className="row">
          {
            this.state.dataBase.map((task) => { 
              return condition(task);
            })
          }
        </div>
       
    
        {/*this.state.choosenCol == 0 ? this.addPanel() : this.addButtonPanel(0)*/}
    </div>
      
  );

  render(){
    

    return (
      <div className="container my-5">
        <h2>This Bug Tracker is {this.state.open ? 'Online' : 'Offline'}</h2>

        <div className="row">
          {this.sprintColumn("To Do", 1)}
          {this.sprintColumn("Doing", 2)}
          {this.sprintColumn("Review", 3)}
          {this.sprintColumn("Done", 4)}
        </div>
          
        <input ref={this.textInputTitle}></input>
        <br></br>
        <input ref={this.textInputInfo}></input>
        <br></br>
        <button onClick={this.onButtonClick}>Submit</button>

        {this.state.isUpdated ? this.getData() : this.addTask()}


       { /*Backlog*/ }

          <div className="row col-12">
            <div className="col-md-9 rounded-lg">
              {this.column("Backlog", this.backlogCondition)}
            </div>
            
            <div className="col-md-3 rounded-lg">
              {this.column("Sprint", this.sprintCondition)}
            </div>
          </div>


        </div>
        
    )
  }
}


export default App;
