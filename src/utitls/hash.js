import uuid from 'uuid/v5';

const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

export function getHash(string) {
    return uuid(string, NAMESPACE);
}