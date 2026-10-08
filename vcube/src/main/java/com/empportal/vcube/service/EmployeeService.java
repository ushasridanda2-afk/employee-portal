package com.empportal.vcube.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empportal.vcube.model.Employee;
import com.empportal.vcube.repo.EmployeeRepo;

@Service
public class EmployeeService {
	@Autowired
	EmployeeRepo employeeRepo;
	
    public List<Employee> getAllEmployeeDetails(){
    	return employeeRepo.findAll();
	
	} 
    
    public Employee getEmployee(Integer eid) {
		return employeeRepo.findById(eid).orElseThrow(null);
	}
    
    public Employee updateEmployee(Employee employee, Integer eid) {
		Employee empFromDb = getEmployee(eid);
		
		empFromDb.setAge(employee.getAge());
		empFromDb.setCity(employee.getCity());
		empFromDb.setEname(employee.getEname());
		empFromDb.setSalary(employee.getSalary());
		empFromDb.setState(employee.getState());
		
		return employeeRepo.save(empFromDb);
	}
    
    public Employee createEmployee(Employee employee){
		return employeeRepo.save(employee);	
	}
    
    public String deleteEmployee(Integer eid){
		employeeRepo.deleteById(eid);
		return "Employee has been deleted succuess fully !!" + eid;
	}
}
