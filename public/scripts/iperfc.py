import subprocess, sys, time

server_ip_addr = "localhost"
bytes_to_send = "1024MB"

if len(sys.argv)==3:
    server_ip_addr = sys.argv[1]
    bytes_to_send = sys.argv[2]
# print 'server_ip_addr is ', server_ip_addr
# print 'bytes_to_send: ', bytes_to_send


# while True:
for i in range(1):
    #start client
    command = subprocess.Popen(["/usr/bin/iperf -c " + server_ip_addr + " -n " + bytes_to_send], stdout=subprocess.PIPE, shell=True)
    (out, err) = command.communicate()
    lastline = out.split('\n')[-2]
    throughput = ' '.join(lastline.split()[-2:])
    # post = {"date-time": time.strftime('%x %X'), "throughput": throughput}
    print(throughput)
    sys.stdout.flush()

#using library iperf3
# import iperf3
# import threading
# for i in range(1):
# 	lock.acquire()
# 	client = iperf3.Client()
# 	client.server_hostname = '127.0.0.1'
# 	client.port = 5203
# 	print "locked:", lock
# 	result = client.run()
# 	throughput = result.sent_Mbps
# 	print throughput
# 	lock.release()
# 	print "release:", lock
