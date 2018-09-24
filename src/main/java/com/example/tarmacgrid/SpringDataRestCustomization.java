package com.example.tarmacgrid;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.stereotype.Component;

import com.example.tarmacgrid.employee.Employee;

@Component
public class SpringDataRestCustomization extends RepositoryRestConfigurerAdapter {

	//Required for enabling Cross Origin Requests 
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

		config
		.exposeIdsFor(Employee.class)
		.getCorsRegistry()
		.addMapping("/api/**")
		.allowedOrigins("*")
		.allowedMethods("*")
		.allowCredentials(false)
		.maxAge(3600);
	}
}