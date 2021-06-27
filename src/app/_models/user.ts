class SizePlan {
    type: string;
    capacity: number;
}

export class User {
    id: number;
    email: string;
    password: string;
    roles: string[];
    token?: string;
    sizePlan?: SizePlan;
}
