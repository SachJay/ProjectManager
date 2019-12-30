import React from 'react';

var dataBase = [{"title": "Backend", "column" : 1},{"title": "Database", "column" : 2},{"title": "Design", "column" : 3},{"title": "Interface", "column" : 1},{"title": "Interface", "column" : 0}]

var SprintRowTitle = ({title="Interface"}) => (
    <div className="col-12 bg-warning mb-4 rounded-lg py-1 text-center">
      {title}
    </div>
);

const backlogCondition = (task) => {
    if(task.column === 0){
        return (
            <div className="col-4">
                <SprintRowTitle title={task.title}/>
            </div>
        )
    }
}

const sprintCondition = (task) => {
    if(task.column > 0){
        return (
            <div className="col-12">
                <SprintRowTitle title={task.title}/>
            </div>
        )
    }
}

const column = (title, condition) => (

    <div className="col-12 bg-danger rounded-lg">
        <h1 className="text-center pb-4">{title}</h1>
        
        <div className="row">
            {
                dataBase.map((task) => { 
                    return condition(task);
                })
            }
        </div>
        
        {/*this.state.choosenCol == 0 ? this.addPanel() : this.addButtonPanel(0)*/}
    </div>
    
);

var displayBacklogPage = () => {
    return (  
        <div className="container my-5">
            <div className="row col-12">
                <div className="col-md-9 rounded-lg">
                    {column("Backlog", backlogCondition)}
                </div>
                
                <div className="col-md-3 rounded-lg">
                    {column("Sprint", sprintCondition)}
                </div>
            </div> 
        </div>
    );
}
 
export default displayBacklogPage;