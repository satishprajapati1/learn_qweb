from odoo import http
from odoo.http import request


class QwebLearn(http.Controller):

    @http.route(['/qweb_learn'], type="http", auth="public", website=True, csrf=False)
    def qweb_learn(self):
        def simple_string():
            return "SHS"

        sale_orders = request.env['sale.order'].sudo().search([])
        data = {
            'string': "QwebLearn",
            'integer': 1,
            'x_float': 1.0,
            'x_boolean': True,
            'x_list': [1, 2, 3],
            'x_dict': {'key1': 'value1', 'key2': 'value2'},
            'function': simple_string(),
            'sale_orders': sale_orders,
            'html': "<h3>Hello from HTML</h3>"
        }
        return request.render('learn_qweb_templates.py_template', data)

    @http.route(['/qweb_learn/form'], type="json", auth="public")
    def qweb_learn_form(self, **kwargs):
        print(kwargs)

        return {"status": 1}

    @http.route(['/qweb_learn/owl'], type="http", auth="public")
    def qweb_learn_owl(self, **kwargs):
        print(kwargs)

        return request.render('learn_qweb_templates.my_owl_app')
