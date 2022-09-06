let $input = $("input[type=\"text\"][id^=\"fullName\"]");

var a1 = document.getElementById('ans1').innerText = 'small',
    a2 = document.getElementById('ans2').innerText = 'windy',
    a3 = document.getElementById('ans3').innerText = 'blue',
    a4 = document.getElementById('ans4').innerText = 'fresh',
    a5 = document.getElementById('ans5').innerText = 'happy',
    a6 = document.getElementById('ans6').innerText = 'cold',

    ans = ['small', 'windy', 'blue', 'fresh', 'happy', 'cold']
arr = []
$(document).ready(function () {
    generatePlaceholders();
    makeNamePartListItemsDraggable($("#ulFirstNames"));
    makeFullNameTextBoxesAsDropTargets();
});

function generatePlaceholders() {
    $input.each((index, element) => {
        let id = element.getAttribute("id").toString();
        let number = id.substring("fullName".length);
        let n = parseInt(number);
        element.setAttribute("placeholder", ` `);
    });
}

function makeNamePartListItemsDraggable(...lists) {
    $.each(lists, function (index, element) {
        $list = $(element);
        let li = $($list).children("li");
        li.attr("draggable", "true");
        li.on("dragstart", namePartListItemDragStartEventHandler);
    });
}

function namePartListItemDragStartEventHandler(event) {
    let dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
    let parentId = $(this).parent().attr("id");
    let index = $(this).index();
    let namePart = $(this).text();
    let text = `${parentId}|${index}|${namePart}`
    dataTransfer.setData("text", text);
    dataTransfer.effectAllowed = "all";
}

function makeFullNameTextBoxesAsDropTargets() {
    $input.on("dragenter", function (event) {
        (event.dataTransfer || event.originalEvent.dataTransfer).dropEffect = "copy";
    });

    $input.on("drop", function (event) {
        let e = event.originalEvent || event;

        let text = e.dataTransfer.getData("text");
        let textPartsArray = text.split("|");

        let parentId = textPartsArray[0];
        let index = textPartsArray[1];
        let namePart = textPartsArray[2];

        let existingText = $(this).val().trim();

        if (existingText.split(" ").length > 1) {
            return false;
        }

        if (existingText === "") {
            $(this).val(namePart);
        } else {
            return false
        }

        arr.push(namePart)
        for (var i = 0; i < 5; i++) {

            console.log(arr[i]);
        }
        $(`#${parentId} > li`).get(index).remove();

        e.preventDefault();
    });
}
function show() {
    var mark = 0
    for (i = 0; i < 6; i++) {
        if (arr[i] == ans[i]) {
            mark++;
        }
    }
    for (i = 0; i < 6; i++) {
    console.log(ans[i])
    console.log(mark)
    }      
    if (mark == 6) {
        console.log(mark)
        let image = document.getElementById("image");
        image.src = "./assets/2.jpg"

        let audio = document.getElementById('audio');
        audio.src = "./assets/4.mp3"

        document.getElementById("btnID")

        document.getElementById('audio').play()
    }
    else {
        let image = document.getElementById("image");
        image.src = "./assets/1.jpg"

        let audio = document.getElementById('audio');
        audio.src = "./assets/2.mp3"

        document.getElementById("btnID")

        document.getElementById('audio').play()
    }

}
function clearDrop() {
    document.getElementById("myForm").reset();
}