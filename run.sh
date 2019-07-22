#! /bin/bash

if [ $# -eq 0 ]
then
su root
apt-get update
apt-get -y install krb5-user git curl openjdk-8-jdk
pip install pyspark==2.4.0 jupyter_nbextensions_configurator kubernetes==9.0.0
rm /bin/sh && ln -s /bin/bash /bin/sh
git clone -b qa https://gitlab.cern.ch/swan/common.git /home/jovyan/.jupyter/custom
lessc --clean-css /home/jovyan/.jupyter/custom/css/style.less /home/jovyan/.jupyter/custom/css/style.css
rm -rf /opt/conda/lib/python3.7/site-packages/notebook/templates/
mv -f templates /opt/conda/lib/python3.7/site-packages/notebook/
ls -d ./*/ | xargs -n1 sh -c 'cd $0 ; pip install --no-deps .'
ls -d ./*/ | xargs -n1 sh -c 'extension=$(basename $0) ; jupyter nbextension install --py --system ${extension,,} || exit 1'
server_extensions=('sparkconnector' 'switchcluster') && for extension in ${server_extensions[@]}; do jupyter serverextension enable --py --system $extension || exit 1 ; done
nb_extensions=('sparkconnector' 'switchcluster') && for extension in ${nb_extensions[@]}; do jupyter nbextension enable --py --system $extension || exit 1; done
jupyter nbextensions_configurator enable --system

mkdir -p /home/jovyan/.ipython/profile_default/
printf "c.InteractiveShellApp.extensions.append('sparkconnector.connector')" > /home/jovyan/.ipython/profile_default/ipython_kernel_config.py

chmod g+w -R /usr/local/share/jupyter/nbextensions && chown -R root:users /usr/local/share/jupyter/nbextensions && chmod g+w -R /opt/conda/lib/python3.7/site-packages
else
# docker exec -it --user=root custom_jupyter bash -c "chmod +x /home/jovyan/run.sh && /home/jovyan/run.sh 0"
cd /home/jovyan/SparkConnector/sparkconnector/ ; rm -rf js/ ; cd .. ; cd .. ;
cd /home/jovyan/switch-cluster/switchcluster/ ; rm -rf js/ ; cd .. ; cd .. ;
server_extensions=('SparkConnector' 'switch-cluster') && for extension in ${server_extensions[@]}; do cd /home/jovyan/$extension/ ; make ; cd .. || exit 1; done
printf "c.InteractiveShellApp.extensions.append('sparkconnector.connector') \nc.InteractiveShellApp.extensions.append('switchcluster.kernelextension') " > /home/jovyan/.ipython/profile_default/ipython_kernel_config.py
cp -r /home/jovyan/SparkConnector/sparkconnector/js/* /usr/local/share/jupyter/nbextensions/sparkconnector/
echo 'Upgrade/replace Python for SparkConnector'
cp /home/jovyan/SparkConnector/sparkconnector/logreader.py /opt/conda/lib/python3.7/site-packages/sparkconnector/logreader.py
cp /home/jovyan/SparkConnector/sparkconnector/configuration.py /opt/conda/lib/python3.7/site-packages/sparkconnector/configuration.py
cp /home/jovyan/SparkConnector/sparkconnector/portallocator.py /opt/conda/lib/python3.7/site-packages/sparkconnector/portallocator.py
cp /home/jovyan/SparkConnector/sparkconnector/connector.py /opt/conda/lib/python3.7/site-packages/sparkconnector/connector.py
cp /home/jovyan/SparkConnector/sparkconnector/log4j_conf /opt/conda/lib/python3.7/site-packages/sparkconnector/log4j_conf

cp -r /home/jovyan/switch-cluster/switchcluster/js/* /usr/local/share/jupyter/nbextensions/switchcluster/
echo 'Upgrade/replace Python for Switchcluster'
cp /home/jovyan/switch-cluster/switchcluster/extension.py /opt/conda/lib/python3.7/site-packages/switchcluster/extension.py
cp /home/jovyan/switch-cluster/switchcluster/kernelextension.py /opt/conda/lib/python3.7/site-packages/switchcluster/kernelextension.py

# server_extensions=('SparkConnector' 'switch-cluster') && for extension in ${server_extensions[@]}; do cd /home/jovyan/$extension/ ; pip install --no-deps . ; cd .. || exit 1; done
# nb_extensions=('sparkconnector' 'switchcluster') && for extension in ${nb_extensions[@]}; do jupyter nbextension install --py --system $extension || exit 1; done
# server_extensions=('sparkconnector' 'switchcluster') && for extension in ${server_extensions[@]}; do jupyter serverextension enable --py --system $extension || exit 1 ; done
# nb_extensions=('sparkconnector' 'switchcluster') && for extension in ${nb_extensions[@]}; do jupyter nbextension enable --py --system $extension || exit 1; done
fi