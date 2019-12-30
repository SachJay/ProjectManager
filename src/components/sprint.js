import React from 'react';

var dataBase = [{"title": "Backend", "column" : 1},{"title": "Database", "column" : 2},{"title": "Design", "column" : 3},{"title": "Interface", "column" : 1},{"title": "Interface", "column" : 0}]


var SprintRow = ({title="Interface", desc="Unwilling sportsmen he in questions september therefore described so. Attacks may set few believe moments was. Reasonably how possession shy way introduced age inquietude."}) => (
    <div className="col-12 bg-warning mb-4 rounded-lg pb-3 pt-2">
      <h4 className="text-center">{title}</h4>
       {desc}
    </div>
);  

var addButtonPanel = (id) => (
    <button className="col-md-12 bg-warning pb-1 rounded-lg border-0 text-white mb-4" onClick={() => this.updateChoosenCol(id)}>Add New Task</button>
);

var addPanel = () => (
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

var sprintColumn = (title="To Do", id=0) => (
<div className="item col-md-3">
    <div className="col-md-12 bg-danger pb-1 rounded-lg">
    <h1 className="text-center pb-4">{title}</h1>

    {
        dataBase.map((task) => {
            if(task.column == id){
                return <SprintRow title={task.title}/>
            }
        })
    }

    {/*this.state.choosenCol ==*/ id ? addPanel() : addButtonPanel(id)}
    </div>
</div>
)

const displaySprintPage = () => {
    return ( 
        <div className="container my-5">
            <div className="row">
                {sprintColumn("To Do", 1)}
                {sprintColumn("Doing", 2)}
                {sprintColumn("Review", 3)}
                {sprintColumn("Done", 4)}
            </div>
        </div>
    );
}
 
export default displaySprintPage;