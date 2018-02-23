import {Identifier} from "../identifier/identifier.model";
import {Auth} from "../auth/auth.model";

export class User{

    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public credit?: number,
                public userId?: string,
                public identifiers?: Identifier[],
                public Auth: Auth._id,
                public subscriptionPlan: Subscriptionplan
    ){}
}