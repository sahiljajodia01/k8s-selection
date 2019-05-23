def _jupyter_server_extension_paths():
    return [{
        "module": "switchcluster"
    }]

# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        # the path is relative to the `my_fancy_module` directory
        src="js",
        # directory in the `nbextension/` namespace
        dest="switchcluster",
        # _also_ in the `nbextension/` namespace
        require="switchcluster/index")]