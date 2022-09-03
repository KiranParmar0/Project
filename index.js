let $input = $("input[type=\"text\"][id^=\"fullName\"]");

$(document).ready(function() {
    generatePlaceholders();
    makeNamePartListItemsDraggable($("#ulFirstNames"));
    makeFullNameTextBoxesAsDropTargets();
});

function generatePlaceholders() {
    $input.each((index, element) => {
        let id = element.getAttribute("id").toString();
        let number = id.substring("fullName".length);
        let n = parseInt(number);
        element.setAttribute("placeholder", `Full Name ${n}`);
    });
}

function makeNamePartListItemsDraggable(...lists) {
    $.each(lists, function(index, element) {
        $list = $(element);
        let li = $($list).children("li");
        li.attr("draggable", "true");
        li.on("dragstart", namePartListItemDragStartEventHandler);
    });
}

function namePartListItemDragStartEventHandler(event) {
    let dataTransfer = event.dataTransfer || event.originalEvent.dataTransfer;
    dataTransfer.setData("text", $(this).text());
}

function makeFullNameTextBoxesAsDropTargets() {
    $input.on("drop", function(event) {
        let e = event.originalEvent || event;

        let namePart = e.dataTransfer.getData("text");
        let existingText = $(this).val().trim();

        if (existingText.split(" ").length > 1) {
            return false;
        }

        if (existingText === "") {
            $(this).val(namePart);
        } else {
            $(this).val( existingText.trimEnd() + " " + namePart );
        }
        
        e.preventDefault();
    });
}