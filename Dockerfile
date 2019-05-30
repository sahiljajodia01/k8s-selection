FROM jupyter/minimal-notebook:7f1482f5a136

MAINTAINER Sahil Jajodia <sahil.jajodia@gmail.com>

USER root

RUN apt-get update

# Install required apt packages for all the extensions
RUN apt-get -y install \
        krb5-user git curl openjdk-8-jdk

# Install required python packages for all the extensions
RUN pip install \
        pyspark==2.4.0 \
        jupyter_nbextensions_configurator \
        kubernetes==9.0.0


RUN npm install less@2.7.1 -g && \
    npm install -g less-plugin-clean-css && \
    npm install -g yarn


# Use bash instead of dash
RUN rm /bin/sh && \
    ln -s /bin/bash /bin/sh

RUN mkdir /home/jovyan/SparkConnector && \
    mkdir /home/jovyan/switch_cluster

WORKDIR /Users/sahiljajodia/SWAN/switch-cluster

COPY SparkConnector/ /home/jovyan/SparkConnector/
COPY switch-cluster/ /home/jovyan/switch-cluster/


RUN cd /home/jovyan && \
    ls -a && \
    rm -rf work/ && \
    rm -rf switch_cluster && \
    ls -d ./*/ | xargs -n1 sh -c 'cd $0 ; pip install --no-deps .' && \
    # Automatically install all nbextensions from their python module (all extensions need to implement the api even if they return 0 nbextensions)
    nb_extensions=('sparkconnector' 'switchcluster') && \
    for extension in ${nb_extensions[@]}; do jupyter nbextension install --py --system $extension || exit 1; done && \
    # Enable the server extensions
    server_extensions=('sparkconnector' 'switchcluster') && \
    for extension in ${server_extensions[@]}; do jupyter serverextension enable --py --system $extension || exit 1 ; done && \
    # Enable the nb extensions
    # Not all nbextensions are activated as some of them are activated on session startup or by the import in the templates
    nb_extensions=('sparkconnector' 'switchcluster') && \
    for extension in ${nb_extensions[@]}; do jupyter nbextension enable --py --system $extension || exit 1; done && \
    # Force nbextension_configurator systemwide to prevent users disabling it
    jupyter nbextensions_configurator enable --system
    # Clean


RUN mkdir -p /home/jovyan/.ipython/profile_default/ && \
    printf "c.InteractiveShellApp.extensions.append('sparkconnector.connector') \nc.InteractiveShellApp.extensions.append('switchcluster.kernelextension')" > /home/jovyan/.ipython/profile_default/ipython_kernel_config.py

# # Set Jupyter configurations
# RUN printf "c.NotebookApp.default_url = 'projects' \
# \nc.NotebookApp.contents_manager_class = 'swancontents.filemanager.swanfilemanager.SwanFileManager' \
# \nc.NotebookApp.token = '' \
# " > /home/jovyan/.jupyter/jupyter_notebook_config.py

RUN chmod g+w -R /usr/local/share/jupyter/nbextensions && \
    chown -R root:users /usr/local/share/jupyter/nbextensions && \
    chmod g+w -R /opt/conda/lib/python3.7/site-packages