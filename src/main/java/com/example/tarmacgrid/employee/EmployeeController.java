/*
By adding the spring-boot-starter-data-rest dependency automagically fulfill all the required
CRUD + pagination that I needed and was trying to implement.
Therefore I prefer to keep classes as commented instead of deleting them.

package com.example.tarmacgrid.employee;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
class EmployeeController {

	private final EmployeeRepository repository;
	
	
	private final EmployeeResourceAssembler assembler;

	EmployeeController(EmployeeRepository repository, EmployeeResourceAssembler assembler) {
		this.repository = repository;
		this.assembler = assembler;
	}

	@GetMapping("/employees")
	Resources<Resource<Employee>> all() {

		List<Resource<Employee>> employees = repository.findAll().stream()
			.map(assembler::toResource)
			.collect(Collectors.toList());

		return new Resources<>(employees,
			linkTo(methodOn(EmployeeController.class).all()).withSelfRel());
	}
	
	@GetMapping("/list")
//	Resources<Resource<Employee>> allWithPagination(
//			@RequestParam(value="page", defaultValue="0") int page,
//			@RequestParam(value="limit", defaultValue="15") int limit) {
	Resources<Resource<Employee>> allWithPagination(Pageable p) {
//		List<Resource<Employee>> employees = repository.findAll(PageRequest.of(page, limit)).stream()
		List<Resource<Employee>> employees = repository.findAll(p).stream()
			.map(assembler::toResource)
			.collect(Collectors.toList());

		return new Resources<>(employees,
			linkTo(methodOn(EmployeeController.class).all()).withSelfRel());
	}

	@PostMapping("/employees")
	ResponseEntity<?> newEmployee(@RequestBody Employee newEmployee) throws URISyntaxException {

		Resource<Employee> resource = assembler.toResource(repository.save(newEmployee));

		return ResponseEntity
			.created(new URI(resource.getId().expand().getHref()))
			.body(resource);
	}

	@GetMapping("/employees/{id}")
	Resource<Employee> one(@PathVariable Long id) throws EmployeeNotFoundException{

		Employee employee = repository.findById(id)
			.orElseThrow(() -> new EmployeeNotFoundException(id));
		
		return assembler.toResource(employee);
	}

	@PutMapping("/employees/{id}")
	ResponseEntity<?> replaceEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) throws URISyntaxException {

		Employee updatedEmployee = repository.findById(id)
			.map(employee -> {
				employee.setName(newEmployee.getName());
				employee.setRole(newEmployee.getRole());
				return repository.save(employee);
			})
			.orElseGet(() -> {
				newEmployee.setId(id);
				return repository.save(newEmployee);
			});

		Resource<Employee> resource = assembler.toResource(updatedEmployee);

		return ResponseEntity
			.created(new URI(resource.getId().expand().getHref()))
			.body(resource);
	}

	@DeleteMapping("/employees/{id}")
	ResponseEntity<?> deleteEmployee(@PathVariable Long id) {

		repository.deleteById(id);

		return ResponseEntity.noContent().build();
	}
}
*/