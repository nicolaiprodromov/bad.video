#!/usr/bin/env python3
"""
Simple HTTP Server for serving the bad.video website
Allows access from other devices on the local network
"""

import http.server
import socketserver
import socket
import os
import sys
from urllib.parse import urlparse, unquote

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom handler to serve files with proper MIME types"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers to allow cross-origin requests
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        # Disable caching for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def guess_type(self, path):
        """Add additional MIME types"""
        result = super().guess_type(path)
        # Handle both old and new Python versions
        if isinstance(result, tuple) and len(result) >= 2:
            mimetype, encoding = result[0], result[1]
        else:
            mimetype, encoding = result, None
            
        if path.endswith('.glb'):
            return 'model/gltf-binary'
        elif path.endswith('.gltf'):
            return 'model/gltf+json'
        elif path.endswith('.json'):
            return 'application/json'
        elif path.endswith('.js'):
            return 'application/javascript'
        elif path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.html'):
            return 'text/html'
        elif path.endswith('.mp4'):
            return 'video/mp4'
        elif path.endswith('.png'):
            return 'image/png'
        elif path.endswith('.jpg') or path.endswith('.jpeg'):
            return 'image/jpeg'
        elif path.endswith('.svg'):
            return 'image/svg+xml'
        elif path.endswith('.ico'):
            return 'image/x-icon'
        elif path.endswith('.otf') or path.endswith('.ttf'):
            return 'font/otf'
        elif path.endswith('.woff'):
            return 'font/woff'
        elif path.endswith('.woff2'):
            return 'font/woff2'
            
        return mimetype or 'application/octet-stream'

def get_local_ip():
    """Get the local IP address of this machine"""
    try:
        # Connect to a remote address to determine local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
        return local_ip
    except:
        return "localhost"

def main():
    # Default port
    PORT = 8000
    
    # Check if port is provided as command line argument
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port number: {sys.argv[1]}")
            print("Usage: python server.py [port]")
            sys.exit(1)
    
    # Change to the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)
    
    # Create the server
    Handler = CustomHTTPRequestHandler
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            local_ip = get_local_ip()
            
            print("=" * 60)
            print(f"🚀 bad.video Server Started!")
            print("=" * 60)
            print(f"📁 Serving directory: {os.getcwd()}")
            print(f"🌐 Port: {PORT}")
            print()
            print("📱 Access your website from:")
            print(f"   • This computer: http://localhost:{PORT}")
            print(f"   • Other devices:  http://{local_ip}:{PORT}")
            print()
            print("💡 Make sure other devices are on the same network!")
            print("🛑 Press Ctrl+C to stop the server")
            print("=" * 60)
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 48 or "already in use" in str(e):
            print(f"❌ Error: Port {PORT} is already in use")
            print(f"💡 Try a different port: python server.py {PORT + 1}")
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    main()
