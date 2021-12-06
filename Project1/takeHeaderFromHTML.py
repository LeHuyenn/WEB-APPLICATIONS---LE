
from flask import Flask, render_template, request, jsonify, make_response
import lxml.html as LH
import codecs
import json

def findData():
    outString = ""
    for i in range(0,3):
        fileName=""
        if i==0 :
            fileName = "food.html"
        elif i==1:
            fileName = "holiday.html"
        elif i==2:
            fileName = "travel.html"
        file = codecs.open(fileName,"r","utf-8")
        afterRead = file.read()
        root = LH.fromstring(afterRead)
        for el in root.iter('h2'):
            id=el.get('id')
            print('Ele class : ' + str(id))
            outString = outString + el.text + "|"+fileName+"|"+id+"\n"
    return outString


app = Flask(__name__)

@app.route('/searching',  methods=['POST','GET', 'OPTIONS'])
def add():
    if request.method == "POST":
        input_data = request.get_json()
        print(input_data)

    elif request.method == "OPTIONS":
        print("IN request method OPTIONS")
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Max-Age': 1000,
            'Access-Control-Allow-Headers': 'origin, x-csrftoken, content-type, accept',
        }
        return '', 200, headers
        
    a = json.loads(request.data)
    print("In option : " +str((a)))
    
    print("ready to return")
    dataResponse = findData()
    response = app.response_class(
            response=json.dumps({"status":"success","code":0,"data":dataResponse}),
            status=200,
            mimetype='application/json'
    )

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    

if __name__ == "__main__":
    app.run(debug = True)

