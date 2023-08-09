function cleanArr(arr,val){
    const newArr = []
    for (var i =0;i<arr.length;i++){
        if (arr[i] !== val){
            newArr.push(arr[i])
        }
    }
    return newArr
}

export default cleanArr