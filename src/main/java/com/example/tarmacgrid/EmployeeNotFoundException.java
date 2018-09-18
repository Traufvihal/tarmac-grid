package com.example.tarmacgrid;


public class EmployeeNotFoundException extends RuntimeException {
	
	public EmployeeNotFoundException(Long id) {
		super("There was no employee with id: " + id);
	}
}
