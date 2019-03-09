import { Injectable } from "@angular/core";
import { Item } from "../../models/item";

@Injectable()
export class Messages {
    messages: Item[] = [];

    constructor() {
        let messages = [
            {
                username: "Thet Htet Aung",
                message: "Hello, How are you?",
                time: "10:30pm"
            },
            {
                username: "Aung Aung",
                message: "Hi, Nice to meet you!",
                time: "10:40pm"
            }
        ];
    }
}