import {types, Instance, applySnapshot} from 'mobx-state-tree';
import uuid from 'uuid';

// This is implementing the simple mobx tree from a tutorial... 
// notice, root placed at bottom, then build upward...
// so the tree is flipped...fans upward(which is actually more like a real tree, but not like the diagrams I've seen with root at top)

const EmployeeModel = types.model("Employee", {
    id: types.identifier,
    name: types.string,
    hours_worked: types.number
})
.actions(self => {  
    function editEmployee(name: string, hours_worked: number) {
        applySnapshot(self, { ...self, name, hours_worked }); //first parameter is what you're updating, second is your new snapshot 
    }
    return { editEmployee }
});

const EmployerModel = types.model("Employer", {  //this is a node
    id: types.identifier,   //these are "leafs"
    name: types.string,
    location: types.string,
    employees: types.array(EmployeeModel)  // "child node"

})
    .actions(self => {  //functions inside the action function can alter this node, or even the entire tree...
        function newEmployee(name: string, hours_worked: number) {
            const id = uuid.v4();
            applySnapshot(self, {
                ...self, 
                employees: [{id, name, hours_worked}, ...self.employees]
            });
        }
        return { newEmployee };
    })
    .views(self => ({   
        get num_employees() { //the code in this "views" uses memoization...which is a mst feature 
            return self.employees.length;
        },
        filtered_employees(searchString: string) { //but here, we can't use 'get' bc our function has parameters, so we lose the memoization ability and the performance benefits thereof

            return self.employees.filter(employee => 
                employee.name.includes(searchString)) // if searchString is in the name, then it's returned
        }
    }));

const RootModel = types.model("Root", {
    employer: EmployerModel
});

export { RootModel }
//2 typescript specific exports below
export type Root = Instance<typeof RootModel>
export type Employer = Instance<typeof EmployeeModel>
export type Employee = Instance<typeof EmployeeModel>