package com.example.tarmacgrid.employee;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
@Data
public class Employee {
	
	private static final String BASE_URL = "https://tarmac.io/assets/members/";
	private static final String SUFFIX_URL = ".png";

	private @Id @GeneratedValue Long id;

	private String name;
	private String role;
	private String city;
	private String pictureUrl;

	public Employee() {};
	
	public Employee(Employee e) {
		super();
		this.name = e.getName();
		this.role = e.getRole();
		this.city = e.getCity();
		this.pictureUrl = BASE_URL + e.getName().trim().replaceAll("\\s+", "-").toLowerCase() + SUFFIX_URL;
	}

}
