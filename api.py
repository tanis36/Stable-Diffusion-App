from auth_token import auth_token
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float32, use_auth_token=auth_token, safety_checker=None, requires_safety_checker=False)

@app.get("/")
def generate(prompt: str):
    image = pipe(prompt, guidance_scale=8.5, height=256, width=256).images[0]

    image.save("testimage.png")

    return {"out":"hello world"}