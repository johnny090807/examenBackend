import {Identifier} from "../identifier/identifier.model";

export class User{

    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public credit?: number,
                public userId?: string,
                public identifiers?: Identifier[]){}
}