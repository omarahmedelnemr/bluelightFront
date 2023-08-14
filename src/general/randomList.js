function generateNumberList(n, random) {
    const numberList = Array.from({ length: n  }, (_, index) => index);
    
    if (random) {
        for (let i = numberList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numberList[i], numberList[j]] = [numberList[j], numberList[i]];
        }
    }
    
    return numberList;
}


export default generateNumberList