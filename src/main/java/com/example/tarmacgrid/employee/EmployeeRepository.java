package com.example.tarmacgrid.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	//enables search rest calls for role field in Employee class
	Page<Employee> findByRoleContainingIgnoreCase(String role, Pageable pageable);

}
