/**
 * This is application's Entry point based on the MVC architectural pattern. The controlller
 * that represents the brains of the application is being initalized and connects the model and the view.
 * 
 * The controller is used to intermeditate between the view and the model. The controller
 * monitors user interaction with the view and communicates any changes to the model.
 * 
 * The Boxing model, view and controller are imported into the applications  entry points so that access to these files is not given to everyone.
 */

import { BoxingModel } from './model/BoxingModel.js';
import { BoxingView } from './view/BoxingView.js';
import { BoxingController } from './controller/BoxingController.js'

import { FormModel } from './model/FormModel.js';
import { FormView } from './view/FormView.js';
import { FormController } from './controller/FormController.js';


class app {
    constructor() {
        const url = window.location.href;
        const page = url.match(/[a-z]+.html/)[0];

        switch (page) {
            case "index.html":
                new BoxingController(new BoxingModel, new BoxingView);

                break;
            case "order.html":
                new FormController(new FormModel, new FormView);
                break;
            default:
                break;
        }
    }
}

const App = new app();