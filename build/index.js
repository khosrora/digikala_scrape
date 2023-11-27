"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var asus_1 = __importDefault(require("./digikala/laptop/asus"));
var Scrape = /** @class */ (function () {
    function Scrape() {
        this.digikala();
    }
    Scrape.prototype.digikala = function () {
        (0, asus_1.default)();
    };
    return Scrape;
}());
// ! run app
new Scrape();
