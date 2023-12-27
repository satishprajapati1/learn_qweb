/* @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";
import { renderToElement } from "@web/core/utils/render";

publicWidget.registry.jsTemplate = publicWidget.Widget.extend({
    selector: '.js_template',
    template: 'learn_qweb_templates.jsTemplate',
    start(){
        console.log("Hello world!");
        this.renderElement();
    },
})

publicWidget.registry.templateWithVariables = publicWidget.Widget.extend({
    selector: '.js_template_with_variables',
    template: 'learn_qweb_templates.templateWithVariables',
    init(){
        this._super(...arguments);
        this.orm = this.bindService("orm");
    },
    async start(){
        const content = renderToElement(this.template, {
            string: 'Hello world',
            array: [1,2,3,4,5],
            email: "test@example.com",
            model: await this.orm.searchRead("sale.order", [], ['name'])
        })
        this.$target.html(content)
    }
})

publicWidget.registry.mainTemplate = publicWidget.Widget.extend({
    selector: '.js_template_extension',
    template: 'learn_qweb_templates.mainTemplate',
    start(){
        this.renderElement();

        const templatePrimary = document.querySelector('.js_template_primary');
        templatePrimary.innerHTML = renderToElement("learn_qweb_templates.mainTemplatePrimary").outerHTML;
    },
})

publicWidget.registry.subTemplate = publicWidget.Widget.extend({
    selector: '.js_sub_template',
    template: 'learn_qweb_templates.subTemplate',
    start(){
        this.renderElement();
    },
})

publicWidget.registry.templateWithEvents = publicWidget.Widget.extend({
    selector: '.js_template_with_events',
    template: 'learn_qweb_templates.templateWithEvents',
    events: {
        'click button': 'onClick',
    },
    init(){
        this._super(...arguments);
        this.counter = 0;
    },
    start(){
        this.renderElement();
    },
    onClick(){
        this.counter++;
        this.$el.find('#counter').text(this.counter);
    }
})

publicWidget.registry.betterForSeo = publicWidget.Widget.extend({
    selector: '#betterForSeo',
    events: {
        'click button': 'onClick',
    },
    init(){
        this._super(...arguments);
        this.counter = 0;
    },
    onClick(){
        this.counter++;
        this.$el.find('#counter').text(this.counter);
    }
})
