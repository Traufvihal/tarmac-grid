/*
By adding the spring-boot-starter-data-rest dependency automagically fulfill all the required
CRUD + pagination that I needed and was trying to implement.
Therefore I prefer to keep classes as commented instead of deleting them.


package com.example.tarmacgrid.employee;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.stereotype.Component;

@Component
@RepositoryRestResource()
class EmployeeResourceAssembler implements ResourceAssembler<Employee, Resource<Employee>> {

	@Override
	public Resource<Employee> toResource(Employee employee) {

		return new Resource<>(employee,
			linkTo(methodOn(EmployeeController.class).one(employee.getId())).withSelfRel(),
			linkTo(methodOn(EmployeeController.class).all()).withRel("employees"));
	}
}
*/