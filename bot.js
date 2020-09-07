// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();

        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            
            var replyText = ``;
            var data = new Date();
            var dia     = data.getDate();           // 1-31
            var dia_sem = data.getDay();            // 0-6 (zero=domingo)
            var mes     = data.getMonth();          // 0-11 (zero=janeiro)
            var ano2    = data.getYear();           // 2 dígitos
            var ano4    = data.getFullYear();       // 4 dígitos
            var hora    = data.getHours();          // 0-23
            var min     = data.getMinutes();        // 0-59
            var seg     = data.getSeconds();        // 0-59
            var mseg    = data.getMilliseconds();   // 0-999
            var tz      = data.getTimezoneOffset(); // em minutos

            var str_data = dia + '/' + (mes+1) + '/' + ano4;

            if (context.activity.text == 'data') {
                replyText = `Data atual: ${ str_data }`;
            } else {
                replyText = `Repetindo: ${ context.activity.text }`;
            }
            
            await context.sendActivity(MessageFactory.text(replyText, replyText));    
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Olá, seja bem vindo!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
