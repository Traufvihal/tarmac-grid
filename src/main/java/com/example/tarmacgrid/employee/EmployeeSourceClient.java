package com.example.tarmacgrid.employee;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class EmployeeSourceClient {

	private static final String urlToCall = "https://gist.githubusercontent.com/ricardoul/c25bd1ade4d0977ab9bf660fae8dcc81/raw/feaa8243af1b324a995e9a0b3c047b2a79d6cd83/tarmac-team.json";

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	@Bean
	CommandLineRunner populateDatabase(RestTemplate restTemplate, EmployeeRepository repo) throws Exception {
		return args -> {
			String employeeList = restTemplate.getForEntity(urlToCall, String.class).getBody();
			
			ObjectMapper mapper = new ObjectMapper();
			//
			List<Employee> employees = Arrays
					.stream(mapper.readValue(employeeList, Employee[].class))
					.map(e -> new Employee(e))
					.collect(Collectors.toList());
			
			repo.saveAll(employees);
			
//			Just for info purposes
//			employees.forEach(e -> log.info("{}", e));
			
			
		};
	}
}
