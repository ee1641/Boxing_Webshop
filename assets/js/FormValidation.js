/**
 * Class represent the application validator. The validator checks if the information
 * in the input fields is correct. In case that the information is incorrect it changes the 
 * border color of the input fields to red and displays information instructing the user to correct
 * their input.
 * 
 * The validator holds reference to the model and the view so it can directly access them both in order
 * to reset the values or change the color to red to indicate something is wrong.
 */

export class FormValidation {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    /**
     * Checks if the name is empty or if it doesnt match the regex or if the name is larger than it should be. 
     * 
     * Additionally, it changes the color of the name input field.
     * @returns {Boolean}
     */
    nameValidator() {
        var nameRegex = /^[A-Za-z\s]+$/;
        if (this.model.Name === '' || !this.model.Name.match(nameRegex) || this.model.Name.length > 25) {
            // alert('Name must contain only letters');
            this.view.inputs[0].style.borderColor = "red";
            // this.view.inputs["Name"].style.borderColor = "red";
            return false;
        } else {
            this.view.inputs[0].style.borderColor = "black";

            return true;
        }
    }

    /**
     * Checks if the email is empty or if it doesnt match the regex or if the email is larger than it should be. 
     * 
     * Additionally, it changes the color of the email input field.
     * @returns {Boolean}
     */
    emailValidator() {

        var nameRegex = /[A-Za-z0-9]+@[A-Za-z]+\.com$/;

        if (this.model.Email === '' || !this.model.Email.match(nameRegex) || this.model.Email.length > 50) {
            this.view.inputs[1].style.borderColor = "red";
            return false;
        } else {
            this.view.inputs[1].style.borderColor = "black";
            return true;
        }
    }

    /**
     * Checks if the phone number is empty or if it matches the regex or if the phone number is larger or smaller than it should be. 
     * 
     * Additionally, it changes the color of the phone number input field.
     * @returns {Boolean}
     */
    numberValidator() {
        var nameRegex = /[A-Za-z]+/;
        console.log(this.model.Number.length);
        if (this.model.Number === '' || this.model.Number.length > 18 || this.model.Number.length < 9 || this.model.Number.match(nameRegex)) {
            this.view.inputs[2].style.borderColor = "red";
            return false;
        } else {
            this.view.inputs[2].style.borderColor = "black";
            return true;
        }
    }


    /**
     * Checks if the Credit card number is empty or if it matches the regex or if the Credit card number is larger or smaller than it should be. 
     * 
     * Additionally, it changes the color of the Credit card number input field.
     * @returns {Boolean}
     */
    cardValidator() {
        var nameRegex = /[A-Za-z]+/;
        if (this.model.CreditCard === '' || this.model.CreditCard.length > 19 || this.model.CreditCard.length < 16 || this.model.CreditCard.match(nameRegex)) {
            this.view.inputs[3].style.borderColor = "red";
            return false;
        } else {
            this.view.inputs[3].style.borderColor = "black";
            return true;
        }
    }


    /**
     * Displays information on the screen to help the user recognize mistakes they did while filling the input fields.
     * 
     * Takes as parameter the field to be accessed and the message to be displayed.
     * @param {Small} field 
     * @param {String} message 
     */
    createErrorMessage(field, message) {
        console.log(field);
        field.innerHTML = message;
        field.style.color = "red";
    }

    /**
     * Resets the information inside the small html tags back to default.
     * 
     * @param {small} name 
     * @param {small} email 
     * @param {small} number 
     * @param {small} card 
     */
    deleteErrorMessages(name, email, number, card) {
        name.innerHTML = "";
        email.innerHTML = "";
        number.innerHTML = "";
        card.innerHTML = "";
    }
}