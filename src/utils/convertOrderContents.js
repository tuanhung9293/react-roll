const convertOrderContents = (json) => {
    let data = JSON.parse(json);
    let contents = data.length > 1 ?
        data.reduce((a, b) => {
            return a.content + ', ' + b.content
        })
        :
        data[0].content;
    return contents;
}

export default convertOrderContents;