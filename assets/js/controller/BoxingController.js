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
export class BoxingController {
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

        //1. render all selects
        let properties = this.model.getProperties();
        this.view.renderSelects(properties);

        //2. populate the first select
        let firstSelectID = properties[0];
        this.view.addOptions(firstSelectID, this.model.getOptions(firstSelectID));

        // 3. register one event handler for all select change event
        this.view.selects.forEach((select) => {
            select.addEventListener("change", this.handleSelectChange);
        });

        // 4. register form submit handler and reset handler
        this.view.gloveForm.addEventListener("submit", this.handleFormSubmit);
        this.view.gloveForm.addEventListener("reset", this.handleFormReset);
    }



    /**
     * Handles change events triggered by selcted option.
     * On change, the model is updated automatically to reflect the new view and
     * it is tasked with enabling/disabling the submit button. The view renders the image
     * on select.
     * 
     * Additionally, it updates the model as needed if the previous select changes
     * 
     * @param {Event} event - The event to be processed
     */
    handleSelectChange = (event) => {
        let select = event.target;
        //1. update model ----------------------
        this.model[select.id] = select.value;
        this.model.resetNextProperties(select.id);

        this.view.resetNextSiblings(select.id);
        let nextSelect = select.nextElementSibling;
        if (nextSelect && select.selectedIndex > 0) {
            this.view.addOptions(nextSelect.id, this.model.getOptions(nextSelect.id));
        }

        this.view.renderGlove();
        this.view.toggleSubmitButton();
    }


    /**
     * Handles submit events triggered by the form.
     * On submit, the page redirects us to fill the final order detail submission.
     * 
     * @param {Event} event  - The event to be processed
     */
    handleFormSubmit = (event) => {
        // event.preventDefault();
        this.model.store();
        // window.location.href = `./order.html`;
    }

    /**
     * 
     * Handles Resent event triggered by the form.
     * On reset, the page sets the select fields and values back to default.
     * The view renders the image back to the default invisible placeholder.
     * 
     * @param {Event} event - The event to be processed
     */

    handleFormReset = (event) => {
        this.view.resetNextSiblings("type", true);
        this.view.renderGlove();
        this.view.reset();
    }
}