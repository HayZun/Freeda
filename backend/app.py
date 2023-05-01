#!/usr/bin/python3
import os
import threading
import socket
import ssl
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gtts import gTTS
import urllib.parse
import netifaces

# chemin vers le dossier où stocker les images
UPLOAD_FOLDER = '/app/sounds/'

app = Flask(__name__)
CORS(app)

def encode_url(string):
    safe_chars = "/:"
    return urllib.parse.quote(string, safe=safe_chars, encoding='utf-8', errors=None)

def replace_special_characters(input_str):
    special_characters = [' ', '(', ')', '"', '\'', '&', '?', '!', ':', ';', '[', ']', '{', '}', '<']
    escaped_characters = ['\\ ', '\\(', '\\)', '\\"', '\\\'', '\\&', '\\?', '\\!', '\\:', '\\;', '\\[', '\\]', '\\{', '\\}', '\\<']
    
    for i in range(len(special_characters)):
        input_str = input_str.replace(special_characters[i], escaped_characters[i])
    
    return input_str

def init_api():
    
    app.run(debug=True, host='0.0.0.0', use_reloader=False)

# chemin vers le dossier où stocker les images
@app.route('/app/sounds/<foldername>/<filename>')
def uploaded_file(foldername, filename):
    return send_from_directory(UPLOAD_FOLDER + foldername, filename)

#retrieve text, create audio et play it with code of language with GTTS et vlc
@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():

    #create folder tmp if not exists
    if not os.path.exists('/app/tmp'):
        os.makedirs('/app/tmp')
    
    #retrieve text, language and volume percentage
    text = request.form.get('text')
    language = request.form.get('lang')
    volume_percentage = int(request.form.get('volume'))

    #create audio file with text and language
    tts = gTTS(text=text, lang=language)
    tts.save("/app/tmp/text.mp3")

    #play audio file with vlc with volume percentage
    os.system(f'play -v {volume_percentage/100.0} /app/tmp/text.mp3')

    #delete audio file
    os.system('rm /app/tmp/text.mp3')
    
    # Return a success message
    return jsonify({'success': True})

#check if folder exists
@app.route('/folder-exists/<title>', methods=['GET'])
def folder_exists(title):
  if os.path.exists(f'./app/sounds/{title}'):
    return jsonify({'exists': True})
  else:
    return jsonify({'exists': False})
  
#stop every sound vlc
@app.route('/stop-sound', methods=['POST'])
def stop_sound():
    os.system('killall play')
    # Return a success message
    return jsonify({'success': True})

#delete folder
@app.route('/delete-folder', methods=['DELETE'])
def delete_folder():
    title = request.form.get('title')
    #delete folder
    title = replace_special_characters(title)
    os.system(f'rm -rf /app/sounds/{title}')
    # Return a success message
    return jsonify({'success': True})
  
#play sound
@app.route('/play-sound', methods=['POST'])
def play_sound():
    title = request.form.get('title')
    volume_percentage = int(request.form.get('volume_percentage'))

    filefind = False
    #search extension of the file
    for file in os.listdir(f'/app/sounds/{title}'):
        if file.endswith(".mp3") or file.endswith(".wav") or file.endswith(".ogg"):        
            audio = file
            filefind = True
            break

    if not filefind:
        return jsonify({'success': False})

    #get the audio file
    audio = f'/app/sounds/{title}/{audio}'

    #replace special characters in the audio file path
    audio = replace_special_characters(audio)

    #run audio file with vlc with volume percentage    os.system(f'cvlc --play-and-exit --volume 100 {audio}')
    os.system(f'play -v {volume_percentage/75} {audio}')
    # Return a success message
    return jsonify({'success': True})
   

#submit form
@app.route('/submit-form', methods=['POST'])
def submit_form():
    title = request.form['title']
    audio = request.files['audio']
    image = request.files['image']
    id = request.form['id']

    #check if folder exists
    if os.path.exists(f'/app/sounds/{title}'):
        return jsonify({'exists': True})
    
    #create folder with title
    os.mkdir(f'/app/sounds/'+title)

    #create empty file with id
    f = open(f'/app/sounds/{title}/id.txt', "w")
    f.write(id)
    f.close()

    #save audio file to the folder created
    image.save(f'/app/sounds/{title}/{title}.jpg')
    #save image file to the folder
    audio.save(f'/app/sounds/{title}/{title}.mp3')
    # Return a success message
    return jsonify({'success': True})


@app.route('/sounds' , methods=['GET'])
def get_sounds():

    #get all folders in sounds folder
    folder_sounds = os.listdir('/app/sounds/')
    sounds = []
    for folder in folder_sounds:
        for file in os.listdir(f'/app/sounds/{folder}'):
            if file.endswith(".jpg") or file.endswith(".png"):
                #get image path
                image = encode_url(f'/app/sounds/{folder}/{file}')
            if file.endswith(".txt"):
                f = open(f'/app/sounds/{folder}/{file}', "r")
                id = f.read()
                f.close()
        sounds.append({'title': folder, 'image': image, 'id': id})

    #return the list of dictionaries
    return jsonify(sounds)

if __name__ == '__main__':

    #api rest thread
    api_thread = threading.Thread(target=init_api)
    api_thread.start()

    # Attente de la fin des threads
    api_thread.join()