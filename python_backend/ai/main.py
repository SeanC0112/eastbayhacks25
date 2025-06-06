'''
To start, paste the following pip functions into the terminal:
  pip install openai

To run, type "python AI/ai.py" into the terminal. The regular run button generates error messages for some reason?
'''

import os

from openai import OpenAI

from ai.apikeys import openaikey_W, openaikey_A, openaikey_S

os.environ['OPENAI_API_KEY'] = os.getenv('OPENAI_API_KEY', openaikey_A)
gpt = OpenAI()


user_prompt = """
You are part of a waste sustainability app that analyzes photos. Respond in JSON format without markdown formatting.
The JSON format must be: {
    "item": <item>
    "disposal": <type of disposal>,
    "details": <details about the object>
}
"""


def generate_prompts(data):
    global user_prompt
    system_message = f"""
    The following image is encoded in base64.
    Identify what the image is and state whether it should go to landfill, recycle, compost, or hazardous other: \n{data}
    If landfill, provide a list of some sustainable alternatives. If hazardous, provide a list of some specific disposal sites.
    """
    prompts = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_prompt}
    ]
    return prompts

temp = 0.7

def call_gpt(promptsss):
    completion = gpt.chat.completions.create(
        model="gpt-4o",
        messages=promptsss
        # temperature=temp
    )
    response = completion.choices[0].message.content
    return response

