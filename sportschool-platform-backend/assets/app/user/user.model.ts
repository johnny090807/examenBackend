import {Identifier} from "../identifier/identifier.model";
import {Auth} from "../auth/auth.model";
import {Subscriptionplan} from "../subscriptionplan/subscriptionplan.model";

export class User{

    constructor(public firstName: string,
                public lastName: string,
                public email: string,
                public authId: Auth._id,
                public subscriptionPlan: Subscriptionplan,
                public credit?: number,
                public userId?: string,
                public identifiers?: Identifier[]){}
}