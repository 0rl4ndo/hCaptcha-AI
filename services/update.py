import os.path
import requests
from .settings import DIR_MODEL, PATH_OBJECTS_YAML
from services.settings import *

def download_model_(dir_model, path_model, model_src, model_name, upgrade: bool = None):
        """Download the de-stylized binary classification model"""
        upgrade = bool(upgrade)

        os.makedirs(dir_model, exist_ok=True)

        if os.path.exists(path_model) and not upgrade:
            return

        if not model_src.lower().startswith("http"):
            raise ValueError from None

        logger.debug(f"Downloading {model_name} from {model_src}")
        with requests.get(model_src, stream=True) as response, open(path_model, "wb") as file:
            for chunk in response.iter_content(chunk_size=1024):
                if chunk:file.write(chunk)


def Installer():
    logger.debug(f"Downloading objects.yaml from https://raw.githubusercontent.com/QIN2DIM/hcaptcha-challenger/main/src/objects.yaml")
    objects = requests.get("https://raw.githubusercontent.com/QIN2DIM/hcaptcha-challenger/main/src/objects.yaml").text
    with open(PATH_OBJECTS_YAML, "w", encoding="utf-8") as f:
        f.write(objects)

    # Dowloading ONNX files
    release = requests.get("https://api.github.com/repos/QIN2DIM/hcaptcha-challenger/releases/latest").json()

    for asset in release["assets"]:
        url = asset["browser_download_url"]
        name = asset["name"]
        model_path = os.path.join(DIR_MODEL, name)
        if not os.path.isfile(model_path):
            download_model_(DIR_MODEL, model_path, url, name)