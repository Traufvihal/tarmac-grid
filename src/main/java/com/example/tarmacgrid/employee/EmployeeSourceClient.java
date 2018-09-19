package com.example.tarmacgrid.employee;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class EmployeeSourceClient {

	private static final String SOURCE = "https://gist.githubusercontent.com/ricardoul/c25bd1ade4d0977ab9bf660fae8dcc81/raw/feaa8243af1b324a995e9a0b3c047b2a79d6cd83/tarmac-team.json";

	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}
	
	@Bean
	CommandLineRunner populateDatabase(RestTemplate restTemplate, EmployeeRepository repo) throws Exception {
		return args -> {
			String employeeList = restTemplate.getForEntity(SOURCE, String.class).getBody();
			
			ObjectMapper mapper = new ObjectMapper();
			//There was a gracefull way to parse but was taking too much time to implement
			List<Employee> employees = Arrays
					.stream(mapper.readValue(employeeList, Employee[].class))
					.map(e -> new Employee(e))
					.collect(Collectors.toList());
			
			repo.saveAll(employees);
			
		};
	}
	
	/* Playing arround with pagination before finding spring-data-rest
	@Bean
	CommandLineRunner checkPagination(RestTemplate restTemplate, EmployeeRepository repo) throws Exception {
		return args -> {
			log.info("########## SORTED BY CITY ##########");
			repo.findAll(Sort.by("city")).forEach(e -> log.info("{}", e));
			log.info("########## END OF SORTED BY CITY ##########");
			log.info("########## SIZE {} ##########", repo.findAll(Sort.by("city")).size() );
			log.info("########## PAGING ##########");
			for(int i=0; i < 6; i++) {
				log.info("########## PAGE {} ##########", i);
				repo.findAll(PageRequest.of(i, 10)).forEach(e -> log.info("{}", e));
			}
			log.info("########## END OF PAGING ##########");
		};
	}
	*/
}
