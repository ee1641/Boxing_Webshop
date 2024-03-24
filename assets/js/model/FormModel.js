
/**
 * Represents the application Model. The model contains information regaring the 
 * combat sport gloves such as: type, glove color and brand color. The model can
 * obtain data either from a database or files which can be locally or externally
 * stored. The model does not directly communicate with the view, instead it is made
 * available through the controller which accesses it when needed.
 */
export class FormModel {
    constructor() {
        /**
         * Represents the name that will be inputed by the user
         * @type String
        */
        this.Name = "";
        /**
         * Represents the email that will be inputed by the user
         * @type String
        */
        this.Email = "";

        /**
         * Represents the phone number that will be inputed by the user
         * @type String
         */
        this.Number = "";

        /**
         * Represents the credit card that will be inputed by the user
         * @type String
         */
        this.CreditCard = "";
    }


    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        Object.keys(this);
    }



    /**
     * Initializes this object properties.
     * 
     * @returns {undefined}
     */
    getOrderDetails() {
        return JSON.parse(localStorage.getItem("glove"));
    }


    /**
     * Initializes this object properties.
     * 
     * @returns {undefined}
     */
    getCacha() {
        return JSON.parse(localStorage.getItem("order"));
    }

    /**
     * Converts this object to a data object for the view. We could have also 
     * returned Object.entries(this), but in this case, we would be dealing 
     * with an array of arrays.
     * 
     * @returns {Object} a simple data object with inputs for the form view 
     */
    getInputData() {
        return JSON.parse(JSON.stringify(this));
    }



    /**
     * Calls the method get cacha to get the current values stored in local storage,
     * and updates the values of the model.
     * 
     * @returns {Object} a simple data object with inputs for the form view 
     */
    update() {
        //retrieve from local storage
        //parse the date from the local storage
        //set data to itself
        let objects = this.getCacha();
        for (let obj in objects) {
            this[obj] = objects[obj];
        }
        return JSON.parse(JSON.stringify(this));

    }


    /**
     * Stores animal data accross browser sessions. Window.localStorage is used 
     * to store the model as a JSON string under the key 'animal'.
     * 
     * @returns {undefined}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON}
     */
    store() {
        window.localStorage.setItem("order", JSON.stringify(this));
        console.log(localStorage.getItem("order"));
    }
}