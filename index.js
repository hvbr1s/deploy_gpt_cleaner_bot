import { createRequire } from "module"
const require = createRequire(import.meta.url)
require('dotenv').config()
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.SECRET_API_KEY
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
 });
const PORT = 4888

const openai = new OpenAIApi(configuration);
const app = express();

app.use(express.json()) 
app.use(express.static('public'))

app.get("/", (req, res) => res.type('html').send(html));

app.post("/gpt", async (req, res)=> {

  const { question } = req.body
  console.log(question)
  let chatResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    n: 1,
    max_tokens: 100,
    temperature: 1,
  })
  const answer = chatResponse.data.choices[0].text.trim()
  res.status(200).send({ "response": answer })
  console.log(answer)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} and ready to receive requests.`);
})

const html = `

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>CS Bot &#129302;</title>
	<!-- Link to the Open Sans font -->
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
	<style>
		/* Apply the font and background color styles to the body element */
		body {
			display: flex;
            flex-direction: column;
            font-family: "Open Sans", sans-serif;
			background-color: #0d0d0d;
            color: white;
            padding: 12px;
		}

        header{

            display: grid;
            place-items: center;
        }

        header h1 {
             font-size: 2rem;

        }

        header h2 {
            font-size: 1rem;
        }

        main {

            display: flex;
            flex-direction: column;
            gap: 14px;
            align-items: center;
            justify-content: center;
            flex: 1;

        }

        main section {

            display: flex;
            flex-direction: column;
            gap: 8px;


        }

        main section div{

            text-align: center;
            border: 1px solid white;
            padding: 8px 16px;
            border-radius: 5px;
            cursor: pointer;
        }

        main section div:hover {

            border-color: plum;

        }

        main section p {

            text-align: center;
            padding: 8px 16px;
            

        }

        label {

            text-align: center;
            padding: 8px 16px;
            align-items: center;

        }

        #second,#loading,#recommendations{

            display: none;
        }


        button {

            text-align: center;
            background: plum;
            color: white;         
            cursor: pointer;
            border: 1px solid white;
            border-radius: 5px;
            padding: 8px 16px;
        }

        button:hover {

            background: transparent;
            border: 1px solid white;
        }

        .try-button {

            text-align: center;
            background: rgb(101, 190, 242);
            color: white;         
            cursor: pointer;
            border: 1px solid white;
            border-radius: 5px;
            padding: 8px 16px;
        }

        try-button:hover{

            background: transparent;
            border: 1px solid white;

        }

        span {

        text-align: center;
        background: plum;
        color: white;         
        cursor: pointer;
        border: 1px solid white;
        border-radius: 5px;
        padding: 8px 16px;
        }

        span:hover {

        background: transparent;
        border: 1px solid white;
        }


	</style>
</head>
<body>

    <header>

        <h1>Beep Boop, I am Emailooor bot&#129302;</h1>
        <h2 id="job">Here to fix your email &#128295;</h2>

    </header>
	<main>
        <section id="tada">&#128076;</section>
        <section id="first">

            <label for="email-input">Let's begin, paste your email below &#128071;</label>
            <textarea id="email-input" rows="25" cols="50"></textarea>
            <button id="btn"><b>Fix</b></button>

        </section>
        <section id="second">
            <p>I want my email to sound:</p>
            <div onclick="selectTone('Friendly')">Friendly</div>
            <div onclick="selectTone('Formal')">Formal</div>
            <span><b>Generate</b></span>
        </section>
        <section id="loading">

            <p>Loading...</p>

        </section>           
        <section id="recommendations">
        </section>
        <section id="try-again">
            <a href="https://gpt-bot-akka.onrender.com">
                <button class="try-button"><b>Start again</b></button>
            </a> 
        </section>
        <section id="copied"><p><i>Copied to clipboard!</i>&#128203;</p></section>
    </main>
</body>
<script>
    let emails = []
    let tones = []
    let chatRecommends = []
    const firstEle = document.getElementById('first')
    document.getElementById("btn").addEventListener("click", selectEmail)
    const secondEle = document.getElementById('second')
    const thirdEle = document.getElementById('loading')
    const fourthEle = document.getElementById('recommendations')
    const submit = document.querySelector('span')
    submit.addEventListener('click', generateAnswer)
    const fithEle = document.getElementById('try-again')
    const sixthEle = document.getElementById('copied')
    const seventhEle = document.getElementById('job')
    const eightEle = document.getElementById('tada')
    fithEle.style.display = 'none'
    sixthEle.style.display = 'none'
    eightEle.style.display = 'none'
    

    function selectEmail(emailType){
        const emailInput = document.getElementById("email-input").value;
        emails.push(emailInput);
        firstEle.style.display = 'none'
        secondEle.style.display = 'flex'
        fithEle.style.display = 'flex'
        sixthEle.style.display = 'none'
        console.log(emails);

    };

    function selectTone(tone){
        tnz = tone
        tones.push(tone)
        color()
        console.log(tones)

    }

    function color() {
        const toneList = document.querySelectorAll('#second div')
        toneList.forEach(tone => {
            if (tones.includes(tone.innerText)){
                tone.style.background = 'orange'
            }
        })
    }


    async function generateAnswer(){
        let request = ${`Hi chat, could you please correct the following email: "${emails}". Please make it sound more ${tones} and correct the grammar, spelling and style so it sounds like something a customer service agent might write, thanks!"}
        console.log(request)
        try {
            secondEle.style.display = 'none'
            thirdEle.style.display = 'flex'
            fithEle.style.display = 'none'
            sixthEle.style.display = 'none'
            seventhEle.style.display = 'none'
            const res = await fetch ('https://gpt-bot-akka.onrender.com/gpt', {
               method: 'POST',
               headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({'question': request})

            })

            const { response } = await res.json()
            thirdEle.style.display = 'none'
            fourthEle.innerHTML = <p>${response}</p>;
            fourthEle.style.display = 'flex'
            fithEle.style.display = 'flex'
            sixthEle.style.display = 'flex'
            seventhEle.style.display = 'none'
            eightEle.style.display = 'flex'
            navigator.clipboard.writeText(response)
            console.log(response)
            
    
        } catch (err) {
            console.log(err.question)
        }
        
    }

</script>
</html>

`
