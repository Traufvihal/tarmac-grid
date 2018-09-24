// 'use strict';
//
// const React = require('react');
// const ReactDOM = require('react-dom');
// const client = require('./client');
//
// class App extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 				employees: [],
// 				page : {}
// 		};
// 	}
//
// 	componentDidMount() {
// 		client({method: 'GET', path: '/api/employees'}).done(response => {
// 			this.setState({
// 				employees: response.entity._embedded.employees,
// 				page: response.entity.page
// 				});
// 		});
// 	}
//
// 	render() {
// 		return (
// 			<EmployeeGrid employees={this.state.employees}/>
// 		)
// 	}
// }
//
// class EmployeeGrid extends React.Component{
// 	render() {
// 		var employees = this.props.employees.map(employee =>
// 			<EmployeePic key={employee._links.self.href} employee={employee}/>
// 		);
// 		return (
// 			<div>{employees}</div>
// 		)
// 	}
// }
// class EmployeePic extends React.Component{
// 	render() {
// 		return (
// 				<div className="image-hover-wrapper">
// 				  <a href="#"><img src={this.props.employee.pictureUrl}></img>
// 				    <div className="image-hover-wrapper-reveal">
// 				      <span>{this.props.employee.name}</span>
// 				      <span>{this.props.employee.role}</span>
// 				      <span>{this.props.employee.city}</span>
// 				    </div>
// 				  </a>
// 				</div>
// 		)
// 	}
// }
//
// ReactDOM.render(<App />,document.getElementById('react'))


// 'use strict';
//
// const React = require('react');
// const ReactDOM = require('react-dom')
// const client = require('./client');
//
// const follow = require('./follow'); // function to hop multiple links by "rel"
//
// const root = '/api';
//
// class App extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.state = {employees: [], attributes: [], pageSize: 2, links: {}};
// 		this.updatePageSize = this.updatePageSize.bind(this);
// 		this.onCreate = this.onCreate.bind(this);
// 		this.onDelete = this.onDelete.bind(this);
// 		this.onNavigate = this.onNavigate.bind(this);
// 	}
//
// 	// tag::follow-2[]
// 	loadFromServer(pageSize) {
// 		follow(client, root, [
// 			{rel: 'employees', params: {size: pageSize}}]
// 		).then(employeeCollection => {
// 			return client({
// 				method: 'GET',
// 				path: employeeCollection.entity._links.profile.href,
// 				headers: {'Accept': 'application/schema+json'}
// 			}).then(schema => {
// 				this.schema = schema.entity;
// 				return employeeCollection;
// 			});
// 		}).done(employeeCollection => {
// 			this.setState({
// 				employees: employeeCollection.entity._embedded.employees,
// 				attributes: Object.keys(this.schema.properties),
// 				pageSize: pageSize,
// 				links: employeeCollection.entity._links});
// 		});
// 	}
// 	// end::follow-2[]
//
// 	// tag::create[]
// 	onCreate(newEmployee) {
// 		follow(client, root, ['employees']).then(employeeCollection => {
// 			return client({
// 				method: 'POST',
// 				path: employeeCollection.entity._links.self.href,
// 				entity: newEmployee,
// 				headers: {'Content-Type': 'application/json'}
// 			})
// 		}).then(response => {
// 			return follow(client, root, [
// 				{rel: 'employees', params: {'size': this.state.pageSize}}]);
// 		}).done(response => {
// 			if (typeof response.entity._links.last != "undefined") {
// 				this.onNavigate(response.entity._links.last.href);
// 			} else {
// 				this.onNavigate(response.entity._links.self.href);
// 			}
// 		});
// 	}
// 	// end::create[]
//
// 	// tag::delete[]
// 	onDelete(employee) {
// 		client({method: 'DELETE', path: employee._links.self.href}).done(response => {
// 			this.loadFromServer(this.state.pageSize);
// 		});
// 	}
// 	// end::delete[]
//
// 	// tag::navigate[]
// 	onNavigate(navUri) {
// 		client({method: 'GET', path: navUri}).done(employeeCollection => {
// 			this.setState({
// 				employees: employeeCollection.entity._embedded.employees,
// 				attributes: this.state.attributes,
// 				pageSize: this.state.pageSize,
// 				links: employeeCollection.entity._links
// 			});
// 		});
// 	}
// 	// end::navigate[]
//
// 	// tag::update-page-size[]
// 	updatePageSize(pageSize) {
// 		if (pageSize !== this.state.pageSize) {
// 			this.loadFromServer(pageSize);
// 		}
// 	}
// 	// end::update-page-size[]
//
// 	// tag::follow-1[]
// 	componentDidMount() {
// 		this.loadFromServer(this.state.pageSize);
// 	}
// 	// end::follow-1[]
//
// 	render() {
// 		return (
// 			<div>
// 				<CreateDialog attributes={this.state.attributes} onCreate={this.onCreate}/>
// 				<EmployeeList employees={this.state.employees}
// 							  links={this.state.links}
// 							  pageSize={this.state.pageSize}
// 							  onNavigate={this.onNavigate}
// 							  onDelete={this.onDelete}
// 							  updatePageSize={this.updatePageSize}/>
// 			</div>
// 		)
// 	}
// }
//
// // tag::create-dialog[]
// class CreateDialog extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
//
// 	handleSubmit(e) {
// 		e.preventDefault();
// 		var newEmployee = {};
// 		this.props.attributes.forEach(attribute => {
// 			newEmployee[attribute] = ReactDOM.findDOMNode(this.refs[attribute]).value.trim();
// 		});
// 		this.props.onCreate(newEmployee);
//
// 		// clear out the dialog's inputs
// 		this.props.attributes.forEach(attribute => {
// 			ReactDOM.findDOMNode(this.refs[attribute]).value = '';
// 		});
//
// 		// Navigate away from the dialog to hide it.
// 		window.location = "#";
// 	}
//
// 	render() {
// 		var inputs = this.props.attributes.map(attribute =>
// 			<p key={attribute}>
// 				<input type="text" placeholder={attribute} ref={attribute} className="field" />
// 			</p>
// 		);
//
// 		return (
// 			<div>
// 				<a href="#createEmployee">Create</a>
//
// 				<div id="createEmployee" className="modalDialog">
// 					<div>
// 						<a href="#" title="Close" className="close">X</a>
//
// 						<h2>Create new employee</h2>
//
// 						<form>
// 							{inputs}
// 							<button onClick={this.handleSubmit}>Create</button>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	}
//
// }
// // end::create-dialog[]
//
// class EmployeeList extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.handleNavFirst = this.handleNavFirst.bind(this);
// 		this.handleNavPrev = this.handleNavPrev.bind(this);
// 		this.handleNavNext = this.handleNavNext.bind(this);
// 		this.handleNavLast = this.handleNavLast.bind(this);
// 		this.handleInput = this.handleInput.bind(this);
// 	}
//
// 	// tag::handle-page-size-updates[]
// 	handleInput(e) {
// 		e.preventDefault();
// 		var pageSize = ReactDOM.findDOMNode(this.refs.pageSize).value;
// 		if (/^[0-9]+$/.test(pageSize)) {
// 			this.props.updatePageSize(pageSize);
// 		} else {
// 			ReactDOM.findDOMNode(this.refs.pageSize).value =
// 				pageSize.substring(0, pageSize.length - 1);
// 		}
// 	}
// 	// end::handle-page-size-updates[]
//
// 	// tag::handle-nav[]
// 	handleNavFirst(e){
// 		e.preventDefault();
// 		this.props.onNavigate(this.props.links.first.href);
// 	}
//
// 	handleNavPrev(e) {
// 		e.preventDefault();
// 		this.props.onNavigate(this.props.links.prev.href);
// 	}
//
// 	handleNavNext(e) {
// 		e.preventDefault();
// 		this.props.onNavigate(this.props.links.next.href);
// 	}
//
// 	handleNavLast(e) {
// 		e.preventDefault();
// 		this.props.onNavigate(this.props.links.last.href);
// 	}
// 	// end::handle-nav[]
//
// 	// tag::employee-list-render[]
// 	render() {
// 		var employees = this.props.employees.map(employee =>
// 			<Employee key={employee._links.self.href} employee={employee} onDelete={this.props.onDelete}/>
// 		);
//
// 		var navLinks = [];
// 		if ("first" in this.props.links) {
// 			navLinks.push(<button key="first" onClick={this.handleNavFirst}>&lt;&lt;</button>);
// 		}
// 		if ("prev" in this.props.links) {
// 			navLinks.push(<button key="prev" onClick={this.handleNavPrev}>&lt;</button>);
// 		}
// 		if ("next" in this.props.links) {
// 			navLinks.push(<button key="next" onClick={this.handleNavNext}>&gt;</button>);
// 		}
// 		if ("last" in this.props.links) {
// 			navLinks.push(<button key="last" onClick={this.handleNavLast}>&gt;&gt;</button>);
// 		}
//
// 		return (
// 			<div>
// 				<input ref="pageSize" defaultValue={this.props.pageSize} onInput={this.handleInput}/>
// 				<div>
// 					{employees}
// 				</div>
// 				<div>
// 					{navLinks}
// 				</div>
// 			</div>
// 		)
// 	}
// 	// end::employee-list-render[]
// }
//
// // tag::employee[]
// class Employee extends React.Component {
//
// 	constructor(props) {
// 		super(props);
// 		this.handleDelete = this.handleDelete.bind(this);
// 	}
//
// 	handleDelete() {
// 		this.props.onDelete(this.props.employee);
// 	}
//
// 	render() {
// 		return (
// 			<div className="image-hover-wrapper">
// 			  <a href="#"><img src={this.props.employee.pictureUrl}></img>
// 			    <div className="image-hover-wrapper-reveal">
// 			      <span>{this.props.employee.name}</span>
// 			      <span>{this.props.employee.role}</span>
// 			      <span>{this.props.employee.city}</span>
// 			    </div>
// 			  </a>
// 			</div>
// 		)
// 	}
// }
// // end::employee[]
//
// ReactDOM.render(
// 	<App />,
// 	document.getElementById('react')
// )



import * as React from 'react';

const ReactDOM = require('react-dom');

const API = 'localhost:8080/api/employees';
const DEFAULT_QUERY = '?size=10';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
				employees: [],
				isLoading: true
		};
	}

	componentDidMount() {
		this.setState({isLoading: true});
		fetch(API + DEFAULT_QUERY)
		.then(response => response.json())
		.then(data => this.setState({	employees: data._embedded.employees, isLoading: false }))
	}

	render() {
		const {employees, isLoading} = this.state;
		if (isLoading) {
			return <p>Loading...</p>
		} else {
			console.log("employees: ", employees);

		}
		return (
			<EmployeeGrid employees={employees}/>
		)
	}
}

class EmployeeGrid extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<EmployeePic key={employee._links.self.href} employee={employee}/>
		);
		return (
			<div>{employees}</div>
		)
	}
}
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
		)
	}
}

ReactDOM.render(<App />,document.getElementById('react'))
