package com.example.tarmacgrid.mvc;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.tarmacgrid.employee.EmployeeRepository;

@Controller
public class ViewController {
	
	private final EmployeeRepository repository;
	
	public ViewController(EmployeeRepository repository) {
		super();
		this.repository = repository;
	}

	@GetMapping("/home")
	public String home(@RequestParam(name = "name", required = false, defaultValue = "World") String name,
			Model model) {
		model.addAttribute("name", name);
		return "home";
	}
	
	@GetMapping("/grid")
	public String grid(Model model) { return "grid"; }

}
