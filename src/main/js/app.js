'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}

	render() {
		return (
			<EmployeeGrid employees={this.state.employees}/>
		)
	}
}

class EmployeeGrid extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<EmployeePic key={employee._links.self.href} employee={employee}/>
		);
		return (
//			<table>
//				<tbody>
//					<tr>
//						<th>Name</th>
//						<th>Role</th>
//						<th>City</th>
//						<th>Picture</th>
//					</tr>
//				</tbody>
//			</table>
			<div>{employees}</div>
		)
	}
}
//name;
//role;
//city;
//pictureUrl;
class EmployeePic extends React.Component{
	render() {
		return (
				<div className="image-hover-wrapper">
				  <a href="#"><img src={this.props.employee.pictureUrl}></img>
				    <div className="image-hover-wrapper-reveal">
				      <span>{this.props.employee.name}</span>
				      <span>{this.props.employee.role}</span>
				      <span>{this.props.employee.city}</span>
				    </div>
				  </a>
				</div>

//
//			<tr>
//				<td>{this.props.employee.name}</td>
//				<td>{this.props.employee.role}</td>
//				<td>{this.props.employee.cc}</td>
//				<td>{this.props.employee.pictureUrl}</td>
//			</tr>
		)
	}
}

ReactDOM.render(
		<App />,
		document.getElementById('react')
	)