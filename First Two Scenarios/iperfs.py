# import iperf3
# server = iperf3.Server()
# while True:
#     result = server.run()

import subprocess
# while True:
command=subprocess.Popen(["/usr/bin/iperf -s"],stdout=subprocess.PIPE,shell=True)
(out,err)=command.communicate()