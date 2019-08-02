#! /bin/bash

# cd k8sselection ; rm -rf js/ ; cd ..
make
#printf "c.InteractiveShellApp.extensions.append('k8sselection.kernelextension')\n" > /Users/sahiljajodia/.ipython/profile_default/ipython_kernel_config.py
pip3 install .
pip install .
jupyter nbextension install --py k8sselection
# jupyter nbextension enable --py k8sselection
#jupyter nbextensions_configurator enable --system
# cp /Users/sahiljajodia/SWAN/k8s-selection/k8s-selection/k8sselection/js/index.js /usr/local/share/jupyter/nbextensions/k8sselection/index.js
# cp /Users/sahiljajodia/SWAN/k8s-selection/k8s-selection/k8sselection/kernelextension.py /usr/local/lib/python3.7/site-packages/k8sselection/kernelextension.py
