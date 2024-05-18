#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Patient {
    name;
    symptoms = [];
    constructor(name) {
        this.name = name;
    }
    addSymptom(symptom) {
        this.symptoms.push(symptom);
    }
    describeSymptoms() {
        return this.symptoms.join(', ');
    }
}
class Doctor {
    patients = [];
    addPatient(patient) {
        this.patients.push(patient);
    }
    giveAdvice(symptoms) {
        if (symptoms.includes("fever")) {
            return "It sounds like you might have an infection. Please rest, stay hydrated, and see a doctor if the fever persists.";
        }
        else if (symptoms.includes("cough")) {
            return "A persistent cough can be a sign of a cold or something more  serious. Drink plenty of fliuds and consider seeing a doctor if it continues.";
        }
        else if (symptoms.includes("headache")) {
            return "Headaches can be caused by many things. Make sure you are well hydrated and get enough rest. See a doctor if the headache is severe or persistent.";
        }
        else {
            return "Please provide more details about your symptoms for better advice.";
        }
    }
}
const doctor = new Doctor();
const programStart = async () => {
    console.log(chalk.yellow.bold("\n\tWelcome to the virtual doctor's office!\n"));
    const patientInfo = await inquirer.prompt([{
            name: "name",
            type: "input",
            message: "please enter your name:"
        }]);
    const patient = new Patient(patientInfo.name);
    doctor.addPatient(patient);
    let moreSymptoms = true;
    while (moreSymptoms) {
        const symptomInfo = await inquirer.prompt([{
                name: "symptom",
                type: "input",
                message: "Describe a symtom you are experiencing:"
            },
            {
                name: "more",
                type: "confirm",
                message: "Do you have more symptoms to describe?"
            }]);
        patient.addSymptom(symptomInfo.symptom);
        moreSymptoms = symptomInfo.more;
    }
    const advice = doctor.giveAdvice(patient.symptoms);
    console.log(chalk.green.bold(`\nThank you, ${patient.name}. Based on your symtoms (${patient.describeSymptoms()}), here is the advice: ${advice}\n`));
};
programStart().catch((error) => {
    console.error(error);
});
