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

system_message = "Concisely state what the following image is and whether it should go to landfill, recycle, compost, or specific hazardous other: https://energyeducation.ca/wiki/images/thumb/7/74/Batterydura.jpg/1200px-Batterydura.jpg"
user_prompt = "You are part of a waste sustainability app that analyzes photos."

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temp = 0.1

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss
        # temperature=temp
    )
    response = completion.choices[0].message.content
    return response

print(call_gpt(prompts))