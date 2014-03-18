#!flask/bin/python

from flask import Flask, abort, jsonify
from flask.ext.restful import Api, Resource, reqparse, fields, marshal
from flask.helpers import make_response

app = Flask(__name__, static_url_path = "")
api = Api(app)

tasks = [
    {
        'id': 1,
        'rank': 0,
        'title': u'Make a resful back for todos',
        'done': False
    },
    {
        'id': 2,
        'rank': 1,
        'title': u'Make an angularjs front for todos',
        'done': True
    },
    {
        'id': 3,
        'rank': 2,
        'title': u'Make unitary tests for the front',
        'done': False
    }
]

task_fields = {
    #'rank': fields.Integer,
    'title': fields.String,
    #'description': fields.String,
    'done': fields.Boolean,
    }

class TaskCollection(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('done', type = bool, required = True, help = 'No task done status provided', location = 'json')
        self.reqparse.add_argument('title', type = str, required = True, help = 'No task title provided', location = 'json')
        #self.reqparse.add_argument('description', type = str, default = "", location = 'json')
        super(TaskCollection, self).__init__()

    def get(self):
        resp = make_response(jsonify({'tasks' : map(lambda t: marshal(t, task_fields), tasks)}) , 200)
        resp.headers.extend({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'PUT, GET' })
        return resp

    def post(self):
        args = self.reqparse.parse_args()
        task = {
            'id': tasks[-1]['id'] + 1,
            'rank': max(task['rank'] for task in tasks) + 1,
            'title': args['title'],
            'done': False
        }
        tasks.append(task)
        #return { 'task': marshal(task, task_fields) }, 201
        resp = make_response(jsonify({'task': marshal(task, task_fields)}) , 201)
        resp.headers.extend({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'POST' })
        return resp

    def options (self):
        return {'Allow' : 'GET,POST' }, 200, \
               { 'Access-Control-Allow-Origin': '*', \
                 'Access-Control-Allow-Methods' : 'GET,POST' }


class Task(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type = str, location = 'json')
        self.reqparse.add_argument('description', type = str, location = 'json')
        self.reqparse.add_argument('done', type = bool, location = 'json')
        super(Task, self).__init__()

    def get(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        #return { 'task': marshal(task[0], task_fields) }
        resp = make_response(jsonify({'task' : marshal(task[0], task_fields)}) , 200)
        resp.headers.extend({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'GET' })
        return resp

    def put(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        task = task[0]
        args = self.reqparse.parse_args()
        for k, v in args.iteritems():
            if v != None:
                task[k] = v
        #return { 'task': marshal(task, task_fields) }
        resp = make_response(jsonify({'task': marshal(task, task_fields)}) , 200)
        resp.headers.extend({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'POST' })
        return resp

    def delete(self, id):
        task = filter(lambda t: t['id'] == id, tasks)
        if len(task) == 0:
            abort(404)
        tasks.remove(task[0])
        #return { 'result': True }
        resp = make_response(jsonify({'result': True}) , 200)
        resp.headers.extend({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods' : 'DELETE' })
        return resp

api.add_resource(TaskCollection, '/todomanager/tasks')
api.add_resource(Task, '/todomanager/tasks/<int:id>')

if __name__ == '__main__':
    app.run(debug = True)
