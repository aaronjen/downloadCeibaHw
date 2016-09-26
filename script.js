var zip = new JSZip();
var addNum = 0
var globNum = 0
var downloading = false;


var tds = []

function getLink() {
    console.log("getLink")
    $('body').css('background-color', 'grey')
    $('body').mouseover(function(e) {
        if (e.target.tagName === "TD") {
            tds = []
            var $td = $(e.target)
            tds.push($td);
            $td.off("click")
            $td.click(function() {
                console.log(tds)
                globNum = tds.length
                for (var i in tds) {
                    var link = $(tds[i]).find($('a:contains("繳交檔案")'))
                    if (link[0]) {
                        console.log(link[0].href)
                        getHw(link[0].href)
                    } else {
                        --globNum
                    }
                }
                var checkDowload = setInterval(function() {
                    if (globNum === addNum) {
                        zip.generateAsync({ type: "blob" })
                            .then(function(blob) {
                                saveAs(blob, "HW");
                            });
                        clearInterval(checkDowload);
                    }
                }, 10000)
            })

            var index = $td.index()
            getTdBelow($td, index)
        }
    })
}

function getHw(link) {
    axios.get(link, { response: 'blob' })
        .then(function(response) {
            var header = response.headers['content-disposition'];
            var filename = header.match(/filename="(.+)"/)[1];
            zip.file("HW/" + filename, response.data);
            console.log("getfile!")
            addNum++
        })
}

var count = 100

function getTdBelow($td, index) {

    var $new = $td.closest('tr').next().children().eq(index)
    if ($new.length === 0) {
        return
    }
    tds.push($new[0])
    getTdBelow($new, index)
}

function addFile(link, name, subject, fileName) {
    axios.get(link, { responseType: 'blob' })
        .then(function(response) {
            zip.file(fileName + '/' + subject + '/' + name, response.data);
            addNum++;
            $('#downloadAll', $('frame[name="mainFrame"]').contents()[0])[0].innerText = "download" + addNum / goalNum * 100 + "%";
            if (addNum === goalNum) {
                zip.generateAsync({ type: "blob" })
                    .then(function(blob) {
                        saveAs(blob, fileName);
                    });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

getLink()
