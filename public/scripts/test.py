import subprocess, sys

#start server
command=subprocess.Popen(["/usr/bin/iperf -s"],stdout=subprocess.PIPE,shell=True)
# (out,err)=command.communicate()


throughput=" "
# while True:
for i in range(1):
    #start client
    command=subprocess.Popen(["/usr/bin/iperf -c localhost -n 10MB"],stdout=subprocess.PIPE,shell=True)
    (out,err)=command.communicate()                                                                      #will be empty if no error occurs
    lastline = out.split('\n')[-2]
    throughput = ' '.join(lastline.split()[-2:])
    # print throughput
    # post = {"date-time": time.strftime('%x %X'), "throughput": throughput}
    # post_id = posts.insert_one(post).inserted_id
    #sleep for 60 seconds
    # time.sleep(60.0 - ((time.time() - starttime) % 60.0))
    # time.sleep(60)
# pprint.pprint(posts.find_one({}))
# cursor = posts.find({})
# for document in cursor:
#     pprint.pprint(document)


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
