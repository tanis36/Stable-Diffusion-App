# Necessary dependencies
from auth_token import auth_token  # Authentication token for model access
from fastapi import FastAPI, Response  # FastAPI framework and Response for sending back images
from fastapi.middleware.cors import CORSMiddleware  # CORS Middleware allows cross-origin requests
import torch  # PyTorch for handling tensors
from torch import autocast  # Autocast for mixed-precision (Unused for CPU build)
from diffusers import StableDiffusionPipeline  # Stable Diffusion model from Hugging Face's Diffusers library
from io import BytesIO  # BytesIO to handle image byte data
import base64  # Base64 to encode image data for sending response

# Initialize a FastAPI app
app = FastAPI()

# Enables CORS for all origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Allow all origins
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"]  # Allow all headers
)

# Define model details and load the Stable Diffusion pipeline
model_id = "CompVis/stable-diffusion-v1-4"
pipe = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float32,  # Use 32-bit floating-point precision
    use_auth_token=auth_token,  # Use authentication token to access the model
    safety_checker=None,  # Disable default safety checker (model seems to flag everything as NSFW)
    requires_safety_checker=False  # Disable requirement for safety checker
)

# Define the endpoint for generating an image from a given prompt
@app.get("/")
def generate(prompt: str):
    # Generate an image based on the prompt
    image = pipe(prompt, guidance_scale=8.5, height=256, width=256).images[0]

    image.save("testimage.png")  # Saves the image to a file (optional)
    buffer = BytesIO()  # Create a buffer to hold image data in memory
    image.save(buffer, format="PNG")  # Save image to buffer in PNG format
    imgstr = base64.b64encode(buffer.getvalue())  # Encode image data as base64

    # Return the image as a response in PNG format
    return Response(content=imgstr, media_type="image/png")