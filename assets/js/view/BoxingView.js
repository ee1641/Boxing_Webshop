/**
 * Class represent the applicaiton view. The view displays information that is 
 * stored in the model: type, color, brand color. The view does not obtain the information
 * directly from the model, It uses the controller as a mediator which instructs it
 * when and what to display.
 * 
 * The view holds references to all UI elements with which the user interacts with
 * and  for which all the even handling mechanism needs to be implemented
 */

export class BoxingView {
    constructor() {
        this.gloveForm = document.querySelector("#form-gloves");
        this.gloveImage = document.querySelector("#div-glove img");
        this.submitButton = document.querySelector("#submit");

        this.selects = null;
        this.selectsDiv = document.querySelector("#div-selects");
    }

    /**
     * Enables or disables the submit button depending on the input values.
     * If all the input values are as expected, the button will be enables. else it will remain disabled.
     */
    toggleSubmitButton() {

        this.submitButton.disabled = false;
        this.selects.forEach((select) => {
            if (select.value === "undefined") {
                this.submitButton.disabled = true;
                return;
            }
        })
    }


    /**
     * Renders HTML select elements. The options are not loaded in the process,
     * meaning that there are no Option elements as part of the select element.
     *  
     * @param {Array} selectIDs - array of strings (select ids)  
     */
    renderSelects(selectIDs) {
        selectIDs.forEach((name) => {
            let select = document.createElement('select');
            select.setAttribute("id", name);
            select.options.add(new Option(` -- Select a ${name} -- `, 'undefined'));
            this.selectsDiv.appendChild(select);
        });
        this.selects = this.selectsDiv.querySelectorAll('select');
    }

    /**
     * Resets all next selects, selects that are siblings to the one defined by
     * this method parameter.
     * 
     * @param {type} selectID - the ID of the select which next siblings are going to be reset
     */
    resetNextSiblings(selectID, state = false) {
        let select = this.selectsDiv.querySelector(`#${selectID}`)
        let nextSelect = select.nextElementSibling;
        while (nextSelect) {
            nextSelect.length = 1;
            nextSelect = nextSelect.nextElementSibling;
        }
        if (state) {
            select.value = "undefined";
        }
    }

    /**
     * Adds options to a select.
     * 
     * @param {String} selectID
     * @param {Array} options - array of strings (option names)
     */
    addOptions(selectID, options) {
        let select = this.selectsDiv.querySelector(`#${selectID}`);

        options.forEach((option) => {
            select.options.add(new Option(option, option));
        });
    }

    /**
     * Renders the image based on the model data.
     * @returns {undefined}
     */
    renderGlove() {
        let imgSrc = `./assets/media/`
        this.selects.forEach((select) => {
            imgSrc += `${select.value}-`
        })

        imgSrc = imgSrc.slice(0, -1) + '.png';
        this.gloveImage.src = imgSrc;
    }

    /**
     * Resets the input values back to default and the submit button
     */
    reset() {
        this.submitButton.disabled = true;
    }
}