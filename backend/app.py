from flask import Flask, render_template, request, redirect, url_for, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.recaptcha import fields
from forms import Todo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'password'

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///temp/test.db'
db = SQLAlchemy(app)

class TodoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200))

    def __str__(self):
        return f'{self.content} {self.id}'

@app.route('/api', methods=['GET'])
def api():

    return jsonify({"hello": "world"})

def todo_serializer(todo):
    return {
        'id': todo.id,
        'content': todo.content
    }

@app.route('/home', methods=['GET', 'POST'])
def home():
    todo = TodoModel.query.all()
    print(todo)
    return jsonify([*map(todo_serializer, todo)])
    
@app.route('/name/<string:first_name>')
def name(first_name):
    return f'{first_name}'


@app.route('/todo', methods=['POST'])
def todo():
    request_data = json.loads(request.data)
    todo = TodoModel(content=request_data['content'])

    db.session.add(todo)
    db.session.commit()

    return {'201': 'todo created successfully'}

@app.route('/home/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, TodoModel.query.filter_by(id=id))])


if __name__ == '__main__':
    app.run(debug=True)    