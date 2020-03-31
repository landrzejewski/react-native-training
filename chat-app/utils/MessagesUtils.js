let messageId = 0;

function nextId() {
    return ++messageId;
}

export function createTextMessage(text) {
    return {
        id: nextId(),
        type: 'text',
        text
    }
}

export function createImageMessage(uri) {
    return {
        id: nextId(),
        type: 'image',
        uri
    }
}

export function createLocationMessage(coordinates) {
    return {
        id: nextId(),
        type: 'location',
        coordinates
    }
}

