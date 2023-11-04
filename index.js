import openai from "./config/openai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';


async function main(){
    
    try {
    //     const chatCompletion = await openai.chat.completions.create({
    //         messages: [{ role: "user", content: "What is the capital of Washington ?" }],
    //         model: "gpt-3.5-turbo",
    // });
    // console.log("API Response:", chatCompletion);

    //Array to keep track of chat history
    const chatHistory = [];

    while (true) {

        const userInput = readlineSync.question(colors.random('SUMMONER : '));
        console.log(" ");

        try {

            //chatHistory by iterating the history
            const messages = chatHistory.map(([role,content])=>({role,content}));

            messages.push({role:'user',content:userInput});

            //api call with user input
            const completion = await openai.chat.completions.create({

                model:'gpt-3.5-turbo',
                messages: messages,

            });

            //get completeion from api
            const completionRes = completion.choices[0].message.content;

            if( userInput.toLowerCase()==='exit'){

                console.log(colors.bgGreen('CONSCIOUSNESS : '+ completionRes + '\n'));
                return;
            }
        
                console.log(colors.bgGreen('CONSCIOUSNESS : '+ completionRes + '\n'));

            //Update history of userInput and Api
            chatHistory.push(['user',userInput]);
            
            chatHistory.push(['assistant',completionRes]);

            } catch (error){
                console.error(colors.red('Error:', error));
            }
    }

    // console.log(chatCompletion.choices[0].message.content);
    

    } catch (error) {
    console.error(colors.red('Error:', error));
    }
};

main();