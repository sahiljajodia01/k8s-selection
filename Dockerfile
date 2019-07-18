FROM jupyter/minimal-notebook:7f1482f5a136

MAINTAINER Sahil Jajodia <sahil.jajodia@gmail.com>

RUN conda create --quiet --yes -p $CONDA_DIR/envs/python2 python=2.7 ipython ipykernel kernda && \
    conda clean -tipsy

USER root

RUN apt-get update

RUN apt-get -y install git curl

RUN apt-get -y install \
        krb5-user git curl openjdk-8-jdk

RUN pip install \
        jupyter_nbextensions_configurator \
        kubernetes==9.0.0 \
        sendgrid \
        python-dotenv \
        pyspark==2.4.0

RUN npm install -g yarn

RUN rm /bin/sh && \
    ln -s /bin/bash /bin/sh

ADD requirements.txt /requirements.txt

RUN $CONDA_DIR/envs/python2/bin/python -m ipykernel install && \
    $CONDA_DIR/envs/python2/bin/kernda -o -y /usr/local/share/jupyter/kernels/python2/kernel.json && \
    pip install -r /requirements.txt && \
    rm /requirements.txt && \

RUN mkdir /home/jovyan/switch_cluster

WORKDIR /Users/sahiljajodia/SWAN/switch-cluster

COPY switch-cluster/ /home/jovyan/switch-cluster/


RUN cd /home/jovyan/switch-cluster && \
    pip install . && \
    jupyter nbextension install --py --system switchcluster && \
    jupyter nbextension enable --py --system switchcluster && \
    jupyter nbextensions_configurator enable --system

RUN mkdir -p /home/jovyan/.ipython/profile_default/ && \
    printf "c.InteractiveShellApp.extensions.append('switchcluster.kernelextension')\n" > /home/jovyan/.ipython/profile_default/ipython_kernel_config.py




# FROM gettyimages/spark:2.4.0-hadoop-3.0

# MAINTAINER Sahil Jajodia <sahil.jajodia@gmail.com>

# USER root

# RUN apt-get update

# RUN apt-get -y install git curl

# RUN apt-get -y install \
#         git curl openjdk-8-jdk 

# RUN pip install \
#         jupyter \
#         jupyter_nbextensions_configurator \
#         kubernetes==9.0.0 \
#         sendgrid \
#         python-dotenv

# RUN npm install -g yarn

# RUN rm /bin/sh && \
#     ln -s /bin/bash /bin/sh

# RUN mkdir ${HOME}/switch_cluster

# WORKDIR /Users/sahiljajodia/SWAN/switch-cluster

# COPY switch-cluster/ ${HOME}/switch-cluster/


# RUN cd ${HOME}/switch-cluster && \
#     pip install . && \
#     jupyter nbextension install --py --system switchcluster && \
#     jupyter nbextension enable --py --system switchcluster && \
#     jupyter nbextensions_configurator enable --system

# RUN mkdir -p ${HOME}/.ipython/profile_default/ && \
#     printf "c.InteractiveShellApp.extensions.append('switchcluster.kernelextension')\n" > ${HOME}/.ipython/profile_default/ipython_kernel_config.py

