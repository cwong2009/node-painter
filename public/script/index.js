let commandInputHistory = [];
let commandKeyCount = 0;

$(function () {
    var socket = io();
    $(document).click(function () {
        $('#commandInput').focus();
    });
    $('form').submit(function (event) {
        socket.emit('EXECUTE_COMMAND', $('#commandInput').val());
        commandKeyCount = 0;
        commandInputHistory.push($('#commandInput').val())
        $('#commandInput').val('');
        return false;
    });

    $(document).keydown(function (event) {
        if (commandInputHistory.length > 0 && (event.which == 38 || event.which == 40)) {
            if (event.which == 38 && $("#commandInput").is(":focus") && commandKeyCount < commandInputHistory.length) {
                //arrow up
                commandKeyCount++;
            } else if (event.which == 40 && $("#commandInput").is(":focus") && commandKeyCount > 1) {
                //arrow down
                commandKeyCount--;
            }
            var index = commandInputHistory.length - commandKeyCount;
            if (commandInputHistory[index]) {
                $('#commandInput').val(commandInputHistory[index]);
            }

            return false;
        }
    });

    /**
     * Socket IO
     */
    socket.on('INIT', function (html) {
        $('#banner').html(html);
        $(window).scrollTop($(document).height());
        $("#commandPanel").show();
    });
    socket.on('RENDER', function (html) {
        $('#messages').append(html);
        $(window).scrollTop($(document).height());
    });
});