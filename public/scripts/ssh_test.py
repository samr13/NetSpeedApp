import paramiko, sys, os, subprocess

machine = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]
ssh = paramiko.SSHClient()

ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
conn = None
if machine != "127.0.0.1":
    conn = ssh.connect(machine, username=username, password=password)

if conn is None:
    ssh_stdout =""
    #start iperf server
    if len(sys.argv)==5:
        scriptname = sys.argv[4]
        if machine != "127.0.0.1":
            ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("python " + scriptname)
        else:
            os.system("python iperfs.py")

    #start iperf client
    if len(sys.argv)==7:
        scriptname = sys.argv[4]
        server_ip = sys.argv[5]
        bytes_to_send = sys.argv[6]
        if server_ip == "127.0.0.1":
            #server being local machine and client being remote machine, server ip should be real ip and not 127.0.0.1
            server_ip = os.popen('ifconfig eth0 | grep "inet\ addr" | cut -d: -f2 | cut -d" " -f1').read().strip()
            # print "changed", server_ip

        if machine != "127.0.0.1":
            ssh_stdin, ssh_stdout, ssh_stderr = ssh.exec_command("python " + scriptname + " " + server_ip + " " + bytes_to_send)
            print ssh_stdout.read(20)
            sys.stdout.flush()
        else:
            process = subprocess.Popen(['python', 'iperfc.py', server_ip, bytes_to_send], stdout=subprocess.PIPE)
            (out, err) = process.communicate()
            # out = os.popen("python iperfc.py " + server_ip + " " + bytes_to_send).read().strip()
            # os.system doesn't return output. it just returns error code
            # out = os.system("python iperfc.py " + server_ip + " " + bytes_to_send)
            # out = subprocess.check_output(['python', 'iperfc.py', server_ip, bytes_to_send], shell=True)
            # out = subprocess.call(['python', 'iperfc.py', server_ip, bytes_to_send], shell=True)
            print out
            sys.stdout.flush()
else:
    sys.exit()
