let startX, startY, charWidth, charHeight, charSpacing, numChars, referenceChars, charData = [];

export const setupOcr = (_startX, _startY, _charWidth, _charHeight, _charSpacing, _numChars, _referenceChars) => {

    startX = _startX;
    startY = _startY;
    charWidth = _charWidth;
    charHeight = _charHeight;
    charSpacing = _charSpacing;
    numChars = _numChars;
    referenceChars = _referenceChars;

    for (let charNo = 0; charNo < 10; charNo++) {
        console.log("Source: Setup");
        let char = extractCharacter(_referenceChars[charNo], 0, 0, charWidth, charHeight).substr(70)
        charData.push(char);
    }

}

export const processScreenshot = (_imageData) => {

    let score = '';
    console.log("Source: Process");
    for (let charNo = 0; charNo < numChars; charNo++) {
        let x = startX + (charNo * (charWidth + charSpacing));
        let scoreCharData = extractCharacter(_imageData, x , startY, charWidth, charHeight);
        for (let refCharNo = 0; refCharNo < 10; refCharNo++) {
            console.log('comparing ' + scoreCharData + ' with ' + charData[refCharNo]);
            if (scoreCharData.substr(70) === charData[refCharNo]) {
                score += refCharNo;
            }
        }
    }

    console.log (score);

    //return parseInt(score,10);

}

const extractCharacter = (_imageData, _startX, _startY, _width, _height, callback) => {
    let elem = document.createElement('canvas');
    let canvas = elem.getContext('2d');
    elem.width = _width;
    elem.height = _height;
    let i = new Image();
    i.src = _imageData;
    i.onload = function() {
        canvas.drawImage(i, _startX, _startY, _width, _height, 0, 0, _width, _height);
        callback(elem.toDataURL());
    }
}
