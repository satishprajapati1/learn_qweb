/* @odoo-module */

import { Component, xml, mount, whenReady, useState, onWillStart } from "@odoo/owl"
import { templates } from "@web/core/assets"
import { jsonrpc } from "@web/core/network/rpc_service"

class OwlSubComponent extends Component {
    static template = "learn_qweb_templates.owl_sub_component"
}

class OwlSubComponentChild extends Component {
    static template = "learn_qweb_templates.owl_sub_component_child"
}

class OwlMainComponent extends Component {
    setup() {
        this.state = useState({
            counter: 0,
        })
    }
    increaseCounter() {
        this.state.counter++;
    }
}

OwlMainComponent.template = "learn_qweb_templates.owl_main_component"
OwlMainComponent.components = { OwlSubComponent, OwlSubComponentChild }

class OwlWithBackendData extends Component {
    static template = "learn_qweb_templates.owl_with_backend_data"

    setup(){
        this.state = useState({
            orders: [],
            txtInput: ""
        })
        onWillStart(async ()=> {
            const data = await jsonrpc('/web/dataset/call_kw/sale.order/search_read', {
                model: 'sale.order',
                method: 'search_read',
                args: [[['state', 'in', ['sale','done']]], ['name', 'date_order']],
                kwargs: {
                    limit: 10,
                    order: 'date_order',
                }
            })
            this.state.orders = data;
        })
    }

    async submitForm(e) {
        e.preventDefault(); // prevent default behavior or refresh when form is submitted

        const data = await jsonrpc("/qweb_learn/form", {
            txtInput: this.state.txtInput,
            otherInput: "Other"
        })
        console.log(data);
    }
}
whenReady(() => {
//    const element = document.querySelector('.js_template_with_owl')
//    if (element){
//        mount(OwlMainComponent, element, { templates })
//    }

    const element = document.querySelectorAll('.js_template_with_owl')

    if (element.length > 0){
        element.forEach(el => mount(OwlMainComponent, el, { templates}))
    }

    const owlBackendData = document.querySelector('.owl_with_backend_data')
    if (owlBackendData){
        mount(OwlWithBackendData, owlBackendData, { templates })
    }
})
