import { FormValidation } from "../FormValidation.js";

/**
 * Class that represents the application controller. The Controller is responsible
 * for accessing data from the model and displaying it on the view. The controller is
 * used as a middle man between the view and the model. On the other hand, changes on
 * model are observed by the controller and are reflected in the view.
 * 
 * The controller contains methods that handle different type of events. These methods are
 * called event handlers.
 * 
 */
export class FormController {
    /**
     * Creates an object representing the Boxing Controller
     * 
     * @param {Type} model - The model the controller intracts with
     * @param {Type} view - The view the controller intracts with
     * @returns {BoxingController} - The object representing Boxing Controller
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.createInputs(this.model.getInputData());
        this.view.createOrder(this.model.getOrderDetails());
        this.validator = new FormValidation(this.model, this.view);

        console.log(this.view.inputs);

        this.view.inputs.forEach((input) => {
            input.addEventListener("change", this.handleInputChange);
        });
        this.view.setInputData(this.model.update());

        this.view.form.addEventListener("submit", this.handleFormSubmit);
        this.view.form.addEventListener("reset", this.handleFormReset);


    }

    /**
     * Handles submit events triggered by the form.
     * On submit, it checks if the input fields contain a valid value and then redirects us
     * to the main page because order has been proccessed.
     * 
     * @param {Event} event  - The event to be processed
     */
    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.validator.cardValidator() && this.validator.numberValidator() && this.validator.emailValidator() && this.validator.nameValidator()) {
            alert("Form has been submitted, Thank You!");
            window.location.href = './index.html';
            return;
        }

        // alert("Your input is Wrong.");


    }


    /**
     * 
     * Handles Resent event triggered by the form.
     * On reset, the page redirects itself back to the index.html
     * 
     * @param {Event} event - The event to be processed
     */
    handleFormReset = (event) => {
        event.preventDefault();
        window.location.href = './index.html';
    }


    /**
     * Handles change events triggered by input change.
     * On change, the model is updated automatically to reflect the new view and
     * it is tasked with enabling/disabling the submit button. The view renders the image
     * on select.
     * 
     * Additionally, it uses methods from form validation to check if the input is valid.
     * 
     * @param {Event} event - The event to be processed
     */
    handleInputChange = (event) => {
        let select = event.target;
        //1. update model ----------------------
        this.model[select.id] = select.value;

        let state = true;
        this.validator.deleteErrorMessages(this.view.nameError, this.view.emailError, this.view.numberError, this.view.creditError);
        if (!this.validator.nameValidator()) {
            this.validator.createErrorMessage(this.view.nameError, "Name must containt not more than 50 letters and no numbers");
            state = false;
        }

        if (!this.validator.emailValidator()) {
            this.validator.createErrorMessage(this.view.emailError, "Email must be of this format: firstpart + @ + secondpart +.com");
            state = false;
        }
        if (!this.validator.numberValidator()) {
            this.validator.createErrorMessage(this.view.numberError, "Your phone number can contain at least 9 digits and at most 18 digits but no letters.");
            state = false;

        }
        if (!this.validator.cardValidator()) {
            this.validator.createErrorMessage(this.view.creditError, "Credit card must contain 16 digits and no characters and up to 3 spaces for formating are allowed. (optional)");
            state = false;
        }

        if (state) {
            this.model.store();
        }


        // let nextSelect = select.nextElementSibling;
        // if (nextSelect && select.selectedIndex > 0) {
        //     this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
        // }
    }
}