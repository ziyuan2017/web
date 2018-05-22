document.write("<script language='javascript' src='/static/js/md5.js?t=20180116'></script>");
function getAuth() {

    var user_id = getCookie("userId")
    var token = getCookie("token")
    var timestamp =new Date().getTime();
    var sign = hex_md5(timestamp + token);
    var auth = {
        sign:sign,
        timeStamp:timestamp,
        userId:user_id
    }
    return auth;

}

function getCookie(xxx)
{
    var aCookie = document.cookie.split("; ");
    for (var i=0; i < aCookie.length; i++)
    {
        var aCrumb = aCookie[i].split("=");
        if (xxx == aCrumb[0])
            return unescape(aCrumb[1]);
    }
    return null;
}
