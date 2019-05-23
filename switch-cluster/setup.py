#!/usr/bin/env python

import setuptools, find_packages

setuptools.setup(
    name="switchcluster",
    version='0.0.1',
      description='Helper to switch between CERN\'s Spark Clusters',
      include_package_data=True,
      packages=find_packages(),
      zip_safe=False,
)