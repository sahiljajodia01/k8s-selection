import subprocess
import os

my_env = os.environ.copy()
command = 'helm install --name "spark-user-' + os.environ['USER'] + '" --set user.name="' + os.environ['USER']  +  '" --set cvmfs.enable=true --set user.admin=false  https://gitlab.cern.ch/db/spark-service/spark-service-charts/raw/spark_user_accounts/cern-spark-user-1.1.0.tgz'
name = '--name spark-user-' + os.environ['USER']
p = subprocess.Popen([command], stdout=subprocess.PIPE, env=my_env, shell=True)
out, err = p.communicate()
print(out)
print(err)
