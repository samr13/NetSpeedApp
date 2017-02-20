import os, sys
scriptname = sys.argv[1]
username = sys.argv[2]
hostip = sys.argv[3]
password = sys.argv[4]
s = " "
if hostip != "127.0.0.1":
    s = "sudo sshpass -p " + password + " scp -o 'StrictHostKeyChecking=no' -o 'UserKnownHostsFile=/dev/null' " \
     + scriptname + " "+username + "@" + hostip + ":/tmp"
    os.system(s)
print s
sys.stdout.flush()

