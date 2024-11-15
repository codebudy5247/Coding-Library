//Inhertiance 
class person{ 
	constructor(name){ 
		this.name = name; 
	} 
	//method to return the string 
	toString(){ 
		return (`Name of person: ${this.name}`); 
	} 
} 
class student extends person{ 
	constructor(name,id){ 
		super(name); 
		this.id = id; 
	} 
	toString(){ 
		return (`${super.toString()},Student ID: ${this.id}`); 
	} 
} 
let student1 = new student('Mukul',22); 
console.log(student1.toString()); 

/**
 *  The Person and Student object both have same method i.e toString(), this is called as 
 *  Method Overriding. Method Overriding allows method in a child class to have the same name and 
 *  method signature as that of a parent class.
 */
