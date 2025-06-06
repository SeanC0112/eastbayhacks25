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

system_message = "Identify what the following image is and state whether it should go to landfill, recycle, compost, or hazardous other: https://www.fromvalerieskitchen.com/wordpress/wp-content/uploads/2022/05/Pizza-crust-078.jpg. If landfill, provide a list of some sustainable alternatives. If hazardous, provide a list of some specific disposal sites."
user_prompt = """
You are part of a waste sustainability app that analyzes photos. Respond in JSON format.
The JSON format must be: {
    "item": <item>
    "disposal": <type of disposal>,
    "details": <details about the object>
}
"""

prompts = [
    {"role": "system", "content": system_message},
    {"role": "user", "content": user_prompt}
  ]

temp = 0.7

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss
        # temperature=temp
    )
    response = completion.choices[0].message.content
    return response

print(call_gpt(prompts))
