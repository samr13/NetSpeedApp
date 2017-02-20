# NetSpeedApp
Web application to check network performance using iperf


To run the app
npm install; node app.js

How to run network performance test:
1) Add devices with information (ip address of device, username/password for ssh - credentials not needed for localhost '127.0.0.1').
2) Devices will be displayed in server and client. Select correponding ip's and click "start test"
3) This will start iperf on server, client. Number of bytes send: 10MB
4) Throughput will be captured and results will be displayed below
