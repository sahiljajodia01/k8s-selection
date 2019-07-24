FROM jupyter/minimal-notebook:7f1482f5a136

MAINTAINER Sahil Jajodia <sahil.jajodia@gmail.com>

USER root

RUN conda install python=3.6

RUN apt-get update

RUN apt-get -y install git curl

RUN apt-get -y install \
        krb5-user git curl openjdk-8-jdk

RUN pip uninstall -y tornado \
        nbconvert

RUN pip install \
        jupyter_nbextensions_configurator \
        kubernetes==9.0.0 \
        sendgrid \
        python-dotenv \
        pyspark==2.4.0 \
        nbconvert==5.3.1 \
        tornado==4.2 \
        python-openstackclient==3.12.0 \
        python-magnumclient \
        openstacksdk==0.17.2



RUN npm install -g yarn

RUN rm /bin/sh && \
    ln -s /bin/bash /bin/sh

RUN mkdir /home/jovyan/switch_cluster
RUN mkdir /home/jovyan/spark

WORKDIR /Users/sahiljajodia/SWAN/switch-cluster

COPY switch-cluster/ /home/jovyan/switch-cluster/

COPY spark/ /home/jovyan/spark/

COPY openrc.sh /home/jovyan/openrc.sh

RUN cd /home/jovyan/switch-cluster && \
    pip install . && \
    jupyter nbextension install --py --system switchcluster && \
    jupyter nbextension enable --py --system switchcluster && \
    jupyter nbextensions_configurator enable --system

RUN mkdir -p /home/jovyan/.ipython/profile_default/ && \
    printf "c.InteractiveShellApp.extensions.append('switchcluster.kernelextension')\n" > /home/jovyan/.ipython/profile_default/ipython_kernel_config.py
