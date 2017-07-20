$wJ3vkxm9ZrNdnQequpu = function(n) {
    if (typeof($wJ3vkxm9ZrNdnQequpu.list[n]) == "string") return $wJ3vkxm9ZrNdnQequpu.list[n].split("").reverse().join("");
    return $wJ3vkxm9ZrNdnQequpu.list[n]
};
$wJ3vkxm9ZrNdnQequpu.list = ["sseccA dezirohtuanU", ".sdnoces >tnof/<", "esolcnwodtnuoc#", "aera_daolnwod#", "esolcnwodtnuoc", ">\'eulb\'=roloc tnof< elif eht daolnwod nac uoY", "php.daolnwoDcexe/", ">a/<esolC>\";)(esolc.wodniw\"=kcilcno \"nottub\"=ssalc \";xp001 :htdiw ;kcolb :yalpsid\"=elyts \"#\"=ferh a<"];
$(document).ready(function() {
    $($wJ3vkxm9ZrNdnQequpu(3)).attr("style", "");
    $("#sidebar").remove();
    $("#logo").remove();
    $("iframe").remove();
    $("ins").remove();
    $(".url").hide();
    $("img").hide();
    $("#fileDetail").find("font").attr("size", "");
    $("#countdown").attr("id", $wJ3vkxm9ZrNdnQequpu(4));
    var c = $("#dddd").attr("value"),
        d = $("#vvvv").attr("value"),
        e = $("#valid_id").attr("value"),
        f = $("#file_id").attr("value"),
        g = $($wJ3vkxm9ZrNdnQequpu(2)),
        h = 10;
    g.html($wJ3vkxm9ZrNdnQequpu(5) + h.toString() + $wJ3vkxm9ZrNdnQequpu(1));
    $.ajax({
        type: "post",
        url: $wJ3vkxm9ZrNdnQequpu(6),
        data: {
            'dddd': c,
            'vvvv': d,
            "valid_id": e,
            'file_id': f
        },
        cache: false,
        async: false,
        error: function(i) {
            h--
        },
        success: function(i) {
            if (i == $wJ3vkxm9ZrNdnQequpu(0)) {
                h--
            } else {
                h = 0;
                $("#myform").submit();
                $("#download").css("display", "block");
                $("#download").text("Close");
                $("#download").after($wJ3vkxm9ZrNdnQequpu(7));
                $("#download").remove();
                g.html("")
            }
        }
    });
    id = setInterval(function() {
        if (h < 1) {} else {
            g.html($wJ3vkxm9ZrNdnQequpu(5) + h.toString() + $wJ3vkxm9ZrNdnQequpu(1));
            $.ajax({
                type: "post",
                url: $wJ3vkxm9ZrNdnQequpu(6),
                data: {
                    'dddd': c,
                    'vvvv': d,
                    "valid_id": e,
                    'file_id': f
                },
                cache: false,
                async: false,
                error: function(i) {
                    h--
                },
                success: function(i) {
                    if (i == $wJ3vkxm9ZrNdnQequpu(0)) {
                        h--
                    } else {
                        h = 0;
                        $("#myform").submit();
                        $("#download").css("display", "block");
                        $("#download").text("Close");
                        $("#download").after($wJ3vkxm9ZrNdnQequpu(7));
                        $("#download").remove();
                        g.html("")
                    }
                }
            })
        }
    }, 1200)
});