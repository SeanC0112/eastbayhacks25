'''
To start, paste the following pip functions into the terminal:
  pip install openai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os
from openai import OpenAI
from apikeys import openaikey
from app import image

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey)

gpt = OpenAI()

system_message = "Identify what the following image is and state whether it should go to landfill, recycle, compost, or hazardous other: https://www.thecarycompany.com/media/catalog/product/1/2/12_oz_355_ml_amber_glass_long_neck_beer_bottle_pry-off_crown_30wapl_1.jpg. If landfill, provide a list of some sustainable alternatives. If hazardous, provide a list of some specific disposal sites."
user_prompt = "You are part of a waste sustainability app that analyzes photos. Be concise and precise; stick to brief, single-word labels when possible. Respon in json format."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss,
        temperature=0.7
    )
    response = completion.choices[0].message.content
    return response

print(call_gpt(prompts))