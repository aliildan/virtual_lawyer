import IModel from "./IModel";

/**
 * Model class for Law
 */
class Legislation implements IModel{
    private _id: number = 0;
    private _content: string = '';
    private readonly _type: number;
    private readonly _title: string;
    private readonly _composition: number;
    private readonly _official_gazette_date: string;
    private readonly _number: number;
    private readonly _acceptance_date: string;
    private _url: string = 'https://www.mevzuat.gov.tr/anasayfa/MevzuatFihristDetayIframe?MevzuatNo={id}&MevzuatTur={type}&MevzuatTertip={composition}';

    constructor(title: string, composition: number, official_gazette_date: string, number: number, acceptance_date: string, type: number) {
        this._title = title;
        this._composition = composition;
        this._official_gazette_date = official_gazette_date;
        this._number = number;
        this._acceptance_date = acceptance_date;
        this._type = type;
    }


    set id(value: number) {
        this._id = value;
    }

    set content(value: string) {
        this._content = value;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get composition(): number {
        return this._composition;
    }

    get official_gazette_date(): string {
        return this._official_gazette_date;
    }

    get number(): number {
        return this._number;
    }

    get acceptance_date(): string {
        return this._acceptance_date;
    }

    get url(): string {
        return this._url.replace('{id}', this._id.toString()).replace('{type}', this._type.toString()).replace('{composition}', this._composition.toString());
    }

    public toJson(): object {
       return  {
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

export default Legislation;