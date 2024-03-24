/**
 * Represents the application Model. The model contains information regaring the 
 * combat sport gloves such as: type, glove color and brand color. The model can
 * obtain data either from a database or files which can be locally or externally
 * stored. The model does not directly communicate with the view, instead it is made
 * available through the controller which accesses it when needed.
 */
import { selectData } from "../store/selectData.js";
export class BoxingModel {

    static store = selectData;
    constructor() {
        /**
         * Represents the type of the Gloves
         * @type String
        */
        this.type = "undefined";
        /**
         * Represents the Color of the brand on the gloves
         * @type String
        */
        this.color = "undefined";
        /**
         * Represents the color of the gloves
         * @type String
         */
        this.brandColor = "undefined";
    }

    /**
     * Returns an array of this object's properties names.
     * The returned array is used by View to dynamically render the selects. 
     * For each Model property, a select is being rendered in View.
     * 
     * @returns {Array} array of property names (strings)
     */
    getProperties() {
        return Object.keys(this);
    }



    /**
     * Gets the data from the external resource to be used as select options.
     * 
     * @param {String} selectID - select ID
     * @returns {Array} array of select's options (strings)
     */
    getOptions(selectID) {
        // get the data from the external source
        let options;
        switch (selectID) {
            case 'type':
                options = Object.keys(BoxingModel.store);
                break;
            case 'color':
                options = Object.keys(BoxingModel.store[this.type]);
                break;
            case 'brandColor':
                options = Object.keys(BoxingModel.store[this.type][this.color]);
                break;
        }
        // return the select options
        return options;
    }

    /**
     * Resets this object's properties to "undefined". Only those that are listed after the property defined 
     * by this method parameter will be reset. 
     * 
     * @param {type} property - property from which the reset starts.
     */
    resetNextProperties(property) {
        let properties = Object.keys(this);
        let index = properties.indexOf(property);
        while (++index < properties.length) {
            this[properties[index]] = "undefined";
        }
    }

    store() {
        window.localStorage.setItem("glove", JSON.stringify(this));
        console.log(localStorage.getItem("glove"));
    }

}