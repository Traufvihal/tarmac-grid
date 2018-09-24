const React = require('react');

export default class Pagination extends React.Component{
	render() {
		return (
				<div className="tarmac__pagination">
					<nav>
					  <ul className="pagination text-center">
					    <li className="pagination-previous disabled">Previous</li>
					    <li className="current">1</li>
					    <li><a href="#">2</a></li>
					    <li><a href="#">3</a></li>
					    <li><a href="#">4</a></li>
					    <li className="pagination-next"><a href="#">Next</a></li>
					  </ul>
					</nav>
				</div>
		)
	}}
