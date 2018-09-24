const React = require('react');

export default class EmployeePic extends React.Component{
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