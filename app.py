"""
Flask application for serving the Sorting Algorithm Visualizer.
Serves static files and can be used as a proxy for external APIs if needed.
"""

from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    """Serve the main index.html file."""
    return send_file('index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    """Serve static files from the static directory."""
    return send_from_directory('static', path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)
