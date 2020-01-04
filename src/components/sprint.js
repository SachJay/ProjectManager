import React, { Component } from 'react';

var currentDataBase;

class SprintPage extends Component {
    
    constructor(){
        super();

        this.state = {
            choosenCol: -1
        }
    }

    textInputTitle = React.createRef();
    textInputInfo = React.createRef();

    addButtonPanel = (id) => (
        <button className="col-md-12 bg-warning pb-1 rounded-lg border-0 text-white mb-4" onClick={() => {this.updateChoosenCol(id)}}>Add New Task</button>
    );
    
    addPanel = () => (
        <div className=" bg-warning rounded-lg mb-4 py-3 ">
            <div className=" col-12 input-group-sm">
                <textarea ref={this.textInputTitle} rows="1" className="mb-3 form-control" placeholder="Title" type="text"></textarea>
                <textarea ref={this.textInputInfo} rows="3" className="mb-3 form-control" placeholder="Description" type="text"></textarea>
            </div>
    
            <div className="col-12">
                <button className="col-12 bg-info pb-1 rounded-lg border-0 text-white mb-2" onClick={() => {this.addTask()}}>Add Task</button>
            </div>
            
            <div className="col-12 text-center">
                <button className="col-5 bg-info pb-1 rounded-lg border-0 text-white mb-2" onClick={() => {this.updateChoosenCol(-1)}}>Cancel</button>
            </div>
        </div>
    );
    
    updateChoosenCol = (id) => {
        this.setState({choosenCol: id});
    }

    sprintColumn = (title="To Do", id=0) => (
        <div className="item col-md-3">
            <div className="col-md-12 bg-danger pb-1 rounded-lg">
                <h1 className="text-center pb-4">{title}</h1>
    
                {
                    currentDataBase.map((task) => {
                        if(task.column === id){
                            return <SprintRow title={task.title} desc={task.desc}/>
                        }
                    })
                }
    
                {this.state.choosenCol === id ? this.addPanel() : this.addButtonPanel(id)}
            </div>
        </div>
    )

    addTask = () => {
        var xhr = new XMLHttpRequest();
        //open the request with the verb and the url
        xhr.open('POST', 'http://localhost:3000/data', true);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        xhr.send(JSON.stringify({title: this.textInputTitle.current.value, desc: this.textInputInfo.current.value, column: this.state.choosenCol}));
    }

    render(){
        return (
            <div className="container my-5">
                <div className="row">
                    {this.sprintColumn("To Do", 1)}
                    {this.sprintColumn("Doing", 2)}
                    {this.sprintColumn("Review", 3)}
                    {this.sprintColumn("Done", 4)}
                </div>
            </div>
        );
    }
}

const DisplaySprintPage = ({dataBase=[]}) => {
    currentDataBase = dataBase;
    
    return ( 
      <SprintPage></SprintPage>
    );
}

var SprintRow = ({title="Interface", desc="Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude."}) => (
    <div className="col-12 bg-warning mb-4 rounded-lg pb-3 pt-2">
        <h4 className="text-center">{title}</h4>
        {desc}
    </div>
);  


export default DisplaySprintPage;