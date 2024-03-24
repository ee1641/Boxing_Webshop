/**
 * Class represent the applicaiton view. The view displays information that is 
 * stored in the model: type, color, brand color. The view does not obtain the information
 * directly from the model, It uses the controller as a mediator which instructs it
 * when and what to display.
 * 
 * The view holds references to all UI elements with which the user interacts with
 * and  for which all the even handling mechanism needs to be implemented
 */
export class FormView {
    constructor() {
        this.inputs = null;
        this.form = document.querySelector("#form-glove");
        this.order = document.querySelector("#order-details");
        this.gloveImage = document.querySelector("#order-details img");

        //error fields
        this.nameError;
        this.emailError;
        this.numberError;
        this.creditError;



    }


    /**
     * Renders HTML Labels, input, small elements and input and button. Once this is all added, it
     * then updates the values of the inputs array aswell as the error fields.
     *  
     * @param {Array} dataObject - array of strings (select ids)  
     */
    createInputs(dataObject) {
        for (let property in dataObject) {
            this.form.insertAdjacentHTML("beforeend", `
            <label>${property}</label>
            <input name="${property}" id="${property}" value="" placeholder="Please enter your ${property}" type="text"/>
            <small id="${property}-error"></small>
            <br>
            `)
        }

        this.form.insertAdjacentHTML("beforeend", `
        <div class="button-layout">
        <Button type="reset" class="negative" value="Back"> Back </Button>
        <input type="submit" class="positive" value="Finish Order">
        </div>
        `)
        this.inputs = this.form.querySelectorAll("input[type=text]");
        this.nameError = document.querySelector("#Name-error");
        this.emailError = document.querySelector("#Email-error");
        this.numberError = document.querySelector("#Number-error");
        this.creditError = document.querySelector("#CreditCard-error");
    }


    /**
     * Updates the values of the inputs in accordance with the storage values.
     * 
     * @param {Array} storage - Array of key value pairs
     */
    setInputData(storage) {
        this.inputs.forEach((input) => {
            input.value = storage[input.id];
        })
    }

    /**
     * Renders HTML h3 and h5 tags to display information about order details and also it updates
     * the image based on the model data.
     * 
     * @param {undefined}  
     */
    createOrder(orderInfo) {
        let imgurl = `./assets/media/`;
        this.order.insertAdjacentHTML("beforebegin", `
        <h3>Order details</h3>
        `)
        // console.log(orderInfo)
        for (let property in orderInfo) {
            imgurl += `${orderInfo[property]}-`;
            this.order.insertAdjacentHTML("beforebegin", `
            <h5>Glove ${property}: ${orderInfo[property]}</h5>
            
            `)
        }
        imgurl = imgurl.slice(0, -1) + '.png';
        this.gloveImage.src = imgurl;
        // console.log(imgurl)
    }
}