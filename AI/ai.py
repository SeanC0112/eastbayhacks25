'''
To start, paste the following pip functions into the terminal:
  pip install openai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os
from openai import OpenAI
from apikeys import openaikey

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey)

gpt = OpenAI()

system_message = "Should this item go to a landfill, recycled, or composted: https://assets.fishersci.com/TFS-Assets/CCG/Air-Tite-Products-Co-Inc/product-images/ML320112-B-3.jpg-650.jpg"
user_prompt = "You are part of a waste sustainability app that analyzes photos."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temp = 0.3

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss
        # temperature=temp
    )
    response = completion.choices[0].message.content
    return response

print(call_gpt(prompts))