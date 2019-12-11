import * as React from "react";
import { inject, observer } from "mobx-react";
import { Root } from "../mst";
import { EmployeeComponent } from "./Employee";


interface EmployerComponentProps {
    rootTree?: Root; 
}

interface EmployerComponentState {
    employeeName: string;
    hours_worked: string;
    searchString: string;
}

@inject("rootTree")
@observer

class EmployerComponent extends React.Component<
    EmployerComponentProps, 
    EmployerComponentState> 
    {
    constructor(props: EmployerComponentProps) {
        super(props);
        this.state = {
            employeeName: "",
            hours_worked: "",
            searchString: ""
        }
    }

    changeEmployeeName = (e: any) => {
        const employeeName = e.target.value
        this.setState({ employeeName })
    };

    changeHoursWorked = (e: any) => {
        const hours_worked = e.target.value
        this.setState({ hours_worked })
    };

    searchStringChange = (e: any) => {
        const searchString = e.target.value
        this.setState({ searchString })
    };

    onSubmit = (e:any) => {
        e.preventDefault(); //keeps the dom from refreshing

        const {employeeName, hours_worked} = this.state
        const {rootTree} = this.props;
        if(!rootTree) return null;
        rootTree.employer.newEmployee(employeeName, parseInt(hours_worked))
    }

    render() {
        const{rootTree} = this.props
        // const{ employeeName, hours_worked, searchString} = this.state; //could use this to clean up the below code a bit..
        if(!rootTree) return null;
        const num_employees = rootTree.employer.num_employees
        const filtered_employees = rootTree.employer.filtered_employees(this.state.searchString)
        return (
            <div>
                <strong>This is rendering from the EmployerComponent</strong>
                <hr />
                <p>{rootTree.employer.name}</p>
                <p>{rootTree.employer.location}</p>
                <p>{`Total Number of employees: ${num_employees}`}</p>
                <hr />
                <p>New Employee</p>
                <form onSubmit={this.onSubmit}>
                    <p>Name: </p>
                    <input value={this.state.employeeName} onChange={this.changeEmployeeName} />
                    <p>Hours Worked: </p>
                    <input value={this.state.hours_worked} onChange={this.changeHoursWorked} />
                    <br />
                    <button>Submit</button>

                </form>
                <hr />
                <input 
                    placeholder="Search Employee Name" 
                    value={this.state.searchString} 
                    onChange={this.searchStringChange}>
                </input>
                <br/>
                {filtered_employees.map(employee =>(
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))}
                {/* {rootTree.employer.employees.map(employee =>(
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))} */}

            </div>
        )
    }
}

export { EmployerComponent };