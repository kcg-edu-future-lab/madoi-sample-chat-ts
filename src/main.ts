import { Madoi, Share } from "./madoi/madoi";

class Chat{
    private nameInput: HTMLInputElement;
    private messageInput: HTMLInputElement;
    private logDiv: HTMLDivElement;
    constructor(sendFormId: string, nameInputId: string,
        messageInputId: string, logDivId: string){
        this.nameInput = document.querySelector(nameInputId)!;
        this.messageInput = document.querySelector(messageInputId)!;
        this.logDiv = document.querySelector(logDivId)!;
        const sendForm: HTMLFormElement = document.querySelector(sendFormId)!;
        sendForm.addEventListener("submit", event => {
            event.preventDefault();
            const name = this.nameInput.value.trim();
            const text = this.messageInput.value.trim();
            if(text.length == 0) return false;
            this.messageInput.value = "";
            this.send(name, text);
            return false;
        });
    }

    @Share()
    send(name: string, message: string){
        const textSpan = document.createElement("span");
        textSpan.append(name + ": " + message);
        this.logDiv.append(textSpan);
        this.logDiv.append(document.createElement("br"));
        this.logDiv.scrollTop = this.logDiv.scrollHeight;
    }
}

window.addEventListener("load", function () {
    const m = new Madoi(`wss://fungo.kcg.edu/madoi-20210702/rooms/chat-o3i4falskdjj`);
    m.shareObject(new Chat("#chatForm", "#nameInputText",
        "#chatInputText", "#chatLogDiv"));
});
