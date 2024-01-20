"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const loadCommomFunctions_1 = __importDefault(require("./loadCommomFunctions"));
const simsimi_1 = __importDefault(require("../services/simsimi"));
const general_1 = require("../configuration/general");
const verifyPrefix_1 = __importDefault(require("../middlewares/verifyPrefix"));
const client_1 = require("@prisma/client");
const messages_1 = require("./messages");
const prisma = new client_1.PrismaClient();
function default_1(bot, baileysMessage) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const data = __rest((0, loadCommomFunctions_1.default)(bot, baileysMessage), []);
        const { command } = yield (0, _1.choiceRandomCommand)();
        if ((_a = baileysMessage.message) === null || _a === void 0 ? void 0 : _a.viewOnceMessageV2) {
            const image = yield (0, _1.downloadImage)(baileysMessage);
            if (!image)
                return;
            return data.sendImageFromFile(image, (0, messages_1.randomMessageViewOnce)());
        }
        if ((0, _1.isCommand)(data.fullMessage) || (0, verifyPrefix_1.default)(data.prefix) || data.fromMe)
            return;
        processMessage(data, baileysMessage);
        if (Math.random() < 0.001)
            return;
        try {
            yield (command === null || command === void 0 ? void 0 : command.handle(Object.assign({}, data)));
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = default_1;
function processMessage(data, baileysMessage) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    return __awaiter(this, void 0, void 0, function* () {
        const keywordsRegex = new RegExp(`(bot|${general_1.general.BOT_NAME})`, "i");
        const shouldUseSimsimi = keywordsRegex.test(data.fullMessage);
        const mentionedMessage = ((_c = (_b = (_a = baileysMessage.message) === null || _a === void 0 ? void 0 : _a.extendedTextMessage) === null || _b === void 0 ? void 0 : _b.contextInfo) === null || _c === void 0 ? void 0 : _c.participant) ===
            general_1.general.NUMBER_BOT ||
            ((_e = (_d = baileysMessage.message) === null || _d === void 0 ? void 0 : _d.extendedTextMessage) === null || _e === void 0 ? void 0 : _e.text) ===
                `@${general_1.general.NUMBER_BOT.slice(0, 11)}` ||
            `@556186063515`;
        const mentionedBot = (_j = (_h = (_g = (_f = baileysMessage.message) === null || _f === void 0 ? void 0 : _f.extendedTextMessage) === null || _g === void 0 ? void 0 : _g.contextInfo) === null || _h === void 0 ? void 0 : _h.mentionedJid) === null || _j === void 0 ? void 0 : _j.includes(general_1.general.NUMBER_BOT);
        if (shouldUseSimsimi || mentionedMessage || mentionedBot) {
            return data.sendText(yield (0, simsimi_1.default)(data.fullMessage));
        }
    });
}
