from flask import Flask,render_template,send_from_directory

app = Flask(__name__,static_url_path='')


@app.route('/')
def index():
    return render_template('index.html')


# app name
@app.errorhandler(404)
# inbuilt function which takes error as parameter
def not_found(e):
  return render_template("index.html")


if __name__ == '__main__':
  app.run()
