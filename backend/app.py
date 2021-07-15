from flask import Flask, render_template, request, redirect, url_for, jsonify
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
    return jsonify([*map(todo_serializer, todo)])
    
@app.route('/name/<string:first_name>')
def name(first_name):
    return f'{first_name}'


@app.route('/todo', methods=['GET', 'POST'])
def todo():
    todo_form = Todo()
    if todo_form.validate_on_submit():
        todo = TodoModel(content=todo_form.content.data)
        db.session.add(todo)
        db.session.commit()
        return redirect(url_for('home'))
    return render_template('todo.html', form=todo_form)

if __name__ == '__main__':
    app.run(debug=True)    