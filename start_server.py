#!/usr/bin/env python3
"""
Simple HTTP server for testing the multi-language website.
Run this script and open http://localhost:8000 in your browser.
"""

import http.server
import socketserver
import os
from pathlib import Path

# Change to the dist directory
os.chdir(Path(__file__).parent / 'dist')

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom logging
        print(f"[{self.log_date_time_string()}] {format % args}")

Handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"""
===============================================================
   GKS Logistics Multi-Language Test Server
===============================================================

   Server running at: http://localhost:{PORT}

   Test the new pages:
   - http://localhost:{PORT}/gks-mali.html (French)
   - http://localhost:{PORT}/en/gks-mali.html (English)
   - http://localhost:{PORT}/tu/gks-mali.html (Turkish)
   - http://localhost:{PORT}/md/gks-mali.html (Chinese)

   Press Ctrl+C to stop the server
===============================================================
""")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServer stopped.")
