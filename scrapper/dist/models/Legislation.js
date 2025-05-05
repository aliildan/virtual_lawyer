"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Model class for Law
 */
class Legislation {
    constructor(title, composition, official_gazette_date, number, acceptance_date, type) {
        this._id = 0;
        this._content = '';
        this._url = 'https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatNo={id}&MevzuatTur={type}&MevzuatTertip={composition}';
        this._title = title;
        this._composition = composition;
        this._official_gazette_date = official_gazette_date;
        this._number = number;
        this._acceptance_date = acceptance_date;
        this._type = type;
    }
    set id(value) {
        this._id = value;
    }
    set content(value) {
        this._content = value;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get content() {
        return this._content;
    }
    get composition() {
        return this._composition;
    }
    get official_gazette_date() {
        return this._official_gazette_date;
    }
    get number() {
        return this._number;
    }
    get acceptance_date() {
        return this._acceptance_date;
    }
    get url() {
        return this._url.replace('{id}', this._id.toString()).replace('{type}', this._type.toString()).replace('{composition}', this._composition.toString());
    }
    toJson() {
        return {
            id: this.id,
            type: this._type,
            title: this.title,
            content: this.content,
            composition: this.composition,
            official_gazette_date: this.official_gazette_date,
            number: this.number,
            acceptance_date: this.acceptance_date,
            url: this.url
        };
    }
}
exports.default = Legislation;
