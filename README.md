# NetSpeedApp
Web application to check network performance using iperf

Prerequisites <br />
1) Install mongodb (sudo apt-get install -y mongodb; mongo (check mongo shell)) <br /><br />


To run the app <br />
npm install; nodejs app.js  (or)<br />
npm install; npm start <br/><br />

How to run network performance test: <br />
1) Add devices (enter ip address of device, username/password for ssh - credentials not needed for localhost '127.0.0.1'). <br />
2) Devices will be displayed in server and client. Select correponding ip's and click "start test" <br />
3) This will start iperf on server, client. Number of bytes send: 10MB <br />
4) Throughput will be captured and results will be displayed below <br /><br />

How it works: <br />
When test is started, corresponding iperf python scripts are transferred to server and client. Script gets executed in each machine and results are gathered from the client machine and piped to localmachine where it gets stored to mongodb. 
