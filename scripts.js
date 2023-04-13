document.addEventListener("DOMContentLoaded", () => {

    // Importing required modules
    // const request = require('request');
    // const pyttsx3 = require('pyttsx3');
    // const openai = require('openai');

    // Set up the API key
    const api_key = "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";
    const api_url = "https://api.openai.com/v1/engines/text-davinci-002/completions";
    // openai.api_key = api_key;

    // Set up the headers for the HTTP request
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_key}`
    };
    
    // Function to generate response using GPT API
    async function generate_response(prompt, tokens=150, temperature=0.5) {
        const data = {
            "prompt": prompt,
            "max_tokens": tokens,
            "temperature": temperature,
            "n": 1,
            "stop": null
        };

        // HTTP POST request to GPT API
        const response = await fetch(api_url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        });

        if (response.status === 200) {
            // The prompt response
            const message = (await response.json()).choices[0].text.trim();
            return message;
        } else {
            console.log(`Error: ${response.status} - ${response.statusText}`);
            return "Sorry, I'm unable to generate a response at the moment.";
        };
    };

    function setup_game() {
    // set the rules & setting for the game
    const initial_game_prompt = "I want you to act as a text based adventure game. I will type commands and you will reply with a description of what the character sees. I want you to only reply with the game output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. when i need to tell you something in english, i will do so by putting text inside curly brackets {like this}. my first command is wake up";
    generate_response(initial_game_prompt).then((chatbot_response) => {
        console.log(chatbot_response);
    });
    }

    async function generate_image(prompt) {
        const response = await openai.createImage({
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;

        console.log(image_url);
    };

    console.log("you're in a game (intro)");
    
    setup_game();

    while (true) {
        const user_input = prompt("prompt: "); // TODO pick word

        if (user_input.toLowerCase() === 'quit') {
            break;
        };

        generate_response(user_input).then((chatbot_response) => {
            console.log(`narrator: ${chatbot_response}`);
            // generate_image(chatbot_response);
        });
    };


});
