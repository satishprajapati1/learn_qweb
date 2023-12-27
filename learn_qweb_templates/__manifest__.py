{
    'name': 'Learn Qweb',
    'author': 'Satish Prajapati',
    'depends': ['web', 'website', 'portal'],
    'sequence': -1,
    'data': [
        'views/for_python_templates.xml'
    ],
    'assets':{
        'web.assets_frontend':[
            # Can find all js and xml templates in this file from browser console
            '/learn_qweb_templates/static/src/*.xml',
            '/learn_qweb_templates/static/src/*.js',
        ],
        'my_owl_app.assets': [
            # bootstrap
            ('include', 'web._assets_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_bootstrap_backend'),

            # required for fa icons
            'web/static/src/libs/fontawesome/css/font-awesome.css',

            # include base files from framework
            ('include', 'web._assets_core'),

            # remove some files that we do not use to create a minimal bundle
            # ('remove', 'web/static/src/core/**/*'),
            # ('remove', 'web/static/lib/luxon/luxon.js'),
            # 'web/static/src/core/utils/functions.js',
            # 'web/static/src/core/browser/browser.js',
            # 'web/static/src/core/registry.js',
            # 'web/static/src/core/assets.js',
            'learn_qweb_templates/static/src/components/*',
        ]
    },
    'application': True,
}
