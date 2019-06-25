#! /bin/bash

# cd switchcluster ; rm -rf js/ ; cd ..
make
# printf "c.InteractiveShellApp.extensions.append('switchcluster.kernelextension')\n" > /Users/sahiljajodia/.ipython/profile_default/ipython_kernel_config.py
pip3 install .
pip install .
jupyter nbextension install --py switchcluster
# jupyter serverextension enable --py switchcluster
# jupyter nbextension enable --py switchcluster
# jupyter nbextensions_configurator enable --system
# cp /Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/switchcluster/js/index.js /usr/local/share/jupyter/nbextensions/switchcluster/index.js
# cp /Users/sahiljajodia/SWAN/switch-cluster/switch-cluster/switchcluster/kernelextension.py /usr/local/lib/python3.7/site-packages/switchcluster/kernelextension.py
