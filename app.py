from flask import Flask
# import chatbot

app = Flask(__name__)

@app.route('/')
def run_script():
    exec(open('C:\Users\ChristopherTorringto\Documents\chatbot\chatbot.py').read())
    return 'Script completed successfully'


if __name__ == '__main__':
    app.run()