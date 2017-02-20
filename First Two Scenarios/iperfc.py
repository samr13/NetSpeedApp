import pymongo
from pymongo import MongoClient
import time
import pprint
import subprocess

mongoclient = MongoClient('localhost', 27017)
db = mongoclient.throughput
posts = db.posts
db.posts.drop()


#start server
# command=subprocess.Popen(["/usr/bin/iperf -s"],stdout=subprocess.PIPE,shell=True)
# (out,err)=command.communicate()

import sys, getopt
ip_addr = "localhost"
bytes_to_send = "1024MB"
try:
  opts, args = getopt.getopt(sys.argv[1:],"h:i:n:", ["ip=","nbytes="])
except getopt.GetoptError:
  print 'python iperfc.py --ip <SERVER_IP> --nbytes <NUMBYTES_TO_PASS>'
  sys.exit(2)
  
for opt, arg in opts:
  if opt == '-h':
     print 'python iperfc.py --ip <SERVER_IP> --nbytes <NUMBYTES_TO_PASS>'
     sys.exit()
  elif opt in ("-i", "--ip"):
     ip_addr = arg
  elif opt in ("-n" ,"--nbytes"):
     bytes_to_send = arg
print 'ip_addr is ', ip_addr
print 'bytes_to_send: ', bytes_to_send



starttime=time.time()
# while True:
for i in range(5):
	#start client
	command=subprocess.Popen(["/usr/bin/iperf -c "+ ip_addr+  " -n "+ bytes_to_send],stdout=subprocess.PIPE,shell=True)
	(out,err)=command.communicate()                                                                      #will be empty if no error occurs
	lastline = out.split('\n')[-2]
	throughput = ' '.join(lastline.split()[-2:])
	print throughput
	post = {"date-time": time.strftime('%x %X'), "throughput": throughput}
	post_id = posts.insert_one(post).inserted_id
	#sleep for 60 seconds
	# time.sleep(60.0 - ((time.time() - starttime) % 60.0))
	time.sleep(5) #debug for 5 seconds
# pprint.pprint(posts.find_one({}))
cursor = posts.find({})
for document in cursor: 
    pprint.pprint(document)


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
