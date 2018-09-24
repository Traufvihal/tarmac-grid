const React = require('react');

export default class EmployeeGrid extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<EmployeePic key={employee._links.self.href} employee={employee}/>
		);
		return (
			<div>{employees}</div>
		)
	}
}