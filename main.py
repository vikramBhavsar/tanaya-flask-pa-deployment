from flask import Flask,render_template,send_from_directory

app = Flask(__name__)

@app.route('/')
@app.route('/static/')
def index():
    return render_template('index.html')

# @app.route('/<path:path>', methods=['GET'])
# def static_proxy(path):
#   return send_from_directory('./', path)

if __name__ == '__main__':
  app.run()