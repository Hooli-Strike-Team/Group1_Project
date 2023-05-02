from flask import Flask, url_for, make_response, render_template
import os

if __name__ == '__main__':
    app = Flask(__name__)

class PrefixMiddleware(object):

    def __init__(self, app): 
        self.app = app
        self.service_prefix = None

        self.service_prefix = os.getenv('JUPYTERHUB_SERVICE_PREFIX', default=None)
        print (f'Service Prefix: {self.service_prefix}')
        
        if (self.service_prefix):
            self.service_prefix += 'proxy/'
            print(f'Setting service_prefix to {self.service_prefix}')


    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = self.service_prefix + environ['SERVER_PORT']

        return self.app(environ, start_response)

def use_PrefixMiddleware(app):
    app.wsgi_app = PrefixMiddleware(app.wsgi_app)
    
################################################################################

if __name__ == '__main__':
    use_PrefixMiddleware(app)  
#   app.run(host='0.0.0.0', port=3308)
    app.run(host='localhost', port=3308)