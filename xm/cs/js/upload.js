// ossms();
// function ossms(){
//     $.ajax({
//     　　url:domain + '/v2/files/?'+getAuth().merges,  //请求的URL
//     　　timeout : 10000, //超时时间设置，单位毫秒
//     　　type : 'get',  //请求方式，get或post
//     　　dataType:'json',//返回的数据格式
//         contentType:"application/json;charset=utf-8",
//     　　success:function(data){ //请求成功的回调函数
//             accessid= data.accessid;
//             accesskey= data.accessKey;
//             host = data.host;
//             policyBase64 = Base64.encode(JSON.stringify(policyText))
//             message = policyBase64
//             bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
//             signature = Crypto.util.bytesToBase64(bytes);
//             yc();
//     　　},
//     　　complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
//             if(status=='timeout'){//超时,status还有success,error等值的情况
//                 $('#loadingDiv').remove();
//                 $.alert('上传密匙请求超时');
//     　　　　}
//     　　},  
//         error:function(XMLHttpRequest, status){  
//             $('#loadingDiv').remove();
//             $.alert(errorEnv(XMLHttpRequest)||"上传密匙请求出错!");
//         } 
//     });
// }


g_dirname = ''
g_object_name = ''
g_object_name_type = ''
now = timestamp = Date.parse(new Date()) / 1000; 

var policyText = {
    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
    "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
    ]
};

accessid= 'LTAIwUU2XPcTmLXm';
accesskey= '9bqQ8VKMLHloCpPegM0zUMrgw30nHv';
host = "http://hbm-yimei.oss-cn-hangzhou.aliyuncs.com";
policyBase64 = Base64.encode(JSON.stringify(policyText))
message = policyBase64
bytes = Crypto.HMAC(Crypto.SHA1, message, accesskey, { asBytes: true }) ;
signature = Crypto.util.bytesToBase64(bytes);
yc();

function check_object_radio() {
    var tt = document.getElementsByName('myradio');
    for (var i = 0; i < tt.length ; i++ )
    {
        if(tt[i].checked)
        {
            g_object_name_type = tt[i].value;
            break;
        }
    }
}

function get_dirname()
{
    dir = document.getElementById("dirname").value;
    if (dir != '' && dir.indexOf('/') != dir.length - 1)
    {
        dir = dir + '/'
    }
    //alert(dir)
    g_dirname = dir
}

function random_string(len) {
　　len = len || 32;
　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　var maxPos = chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.')
    suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

function calculate_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        g_object_name += "${filename}"
    }
    else if (g_object_name_type == 'random_name')
    {
        suffix = get_suffix(filename)
        g_object_name = g_dirname + random_string(10) + suffix
    }
    return ''
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        tmp_name = g_object_name
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name
    }
    else if(g_object_name_type == 'random_name')
    {
        return g_object_name
    }
}

function set_upload_param(up, filename, ret)
{
    g_object_name = g_dirname;
    if (filename != '') {
        suffix = get_suffix(filename)
        calculate_object_name(filename)
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });

    up.start();
}
var pic_wz=0;
function yc(){
    var uploader = new plupload.Uploader({
        runtimes : 'html5,flash,silverlight,html4',
        browse_button : 'selectfiles', 
        //multi_selection: false,
        container: document.getElementById('container'),
        flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
        silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
        url : host,

        init: {
            PostInit: function() {
                $('#container input').attr('accept','image/*');
                $('#container input').removeAttr("multiple");
                $('#container div').attr('style','overflow: hidden; width: 1.2rem; height: 1.2rem; position: relative; line-height: 2rem; text-align: center; margin: 0 auto; background: url(/static/images/icon_upload2.png) no-repeat; background-size: 100% 100%; float: left;');
                $('#loadingDiv').remove();
                document.getElementById('ossfile').innerHTML = '';
                document.getElementById('postfiles').onclick = function() {
                    set_upload_param(uploader, '', false);
                    return false;
                };
                $('.sc_btn').hide();
            },

            FilesAdded: function(up, files) {
                plupload.each(files, function(file) {
                    document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '"><p>' + file.name + ' (' + plupload.formatSize(file.size) + ')</p><b></b>'
                    +'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
                    +'</div>';
                    $.showLoading('图片上传中');
                    $('#postfiles').trigger('click');
                    $('#container div').attr('style','overflow: hidden; width: 1.2rem; height: 1.2rem; position: relative; line-height: 2rem; text-align: center; margin: 0 auto; background: url(/static/images/icon_upload2.png) no-repeat; background-size: 100% 100%; float: left;');
                });
            },

            BeforeUpload: function(up, file) {
                check_object_radio();
                get_dirname();
                set_upload_param(up, file.name, true);
            },

            UploadProgress: function(up, file) {
                var d = document.getElementById(file.id);
                d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                var prog = d.getElementsByTagName('div')[0];
                var progBar = prog.getElementsByTagName('div')[0]
                progBar.style.width= 2*file.percent+'px';
                progBar.setAttribute('aria-valuenow', file.percent);
            },

            FileUploaded: function(up, file, info) {
                if (info.status == 200)
                {
                    var pic=host+'/'+get_uploaded_object_name(file.name);
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML =  pic;
                    
                    if($('#container').hasClass('zhuan64')){
                        wz=$('#container').attr('data-wz'); 
                        $('.type_pic_'+wz).val(pic);
                        $('.imgBox_'+wz).html('<img src="' + pic + '">')
                        picBase64(pic);
                    }else if($('#container').attr('data-xg')=='1'){
                        $('#container').attr('data-xg','0');
                        $('.sign_pic'+$('#container').attr('data-pic')).attr('src',pic);
                        $.hideLoading();
                    }else{
                        pic_wz++;
                        $('.upload_list1').prepend('<li><div class="type"><div class="imgBox imgBox2" data-pic="'+pic_wz+'""><img class="sign_pic sign_pic'+pic_wz+'" src="' + pic + '"></div></div></li>');
                        $.hideLoading();
                    }
                    
                }
                else
                {
                    document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
                } 
            },

            Error: function(up, err) {
                document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
            }
        }
    });  
    uploader.init();
}


//图片转base64
function picBase64(pic){
    filechooser = document.getElementById("choose");
    //用于压缩图片的canvas
    canvas = document.createElement("canvas");
    ctx = canvas.getContext('2d');
    //瓦片canvas
    tCanvas = document.createElement("canvas");
    tctx = tCanvas.getContext("2d");
    maxsize = 80 * 1024;

    image = new Image();
    image.crossOrigin = '';
    image.src = pic;


    image.onload = function(){
        var result = getBase64Image(image);
        var img = new Image();
        img.src = result;
        if (result.length <= maxsize) {
            console.log(result)
            var imgs=result.split('base64,')[1]; 
            $('.type_base64_'+wz).val(imgs);
            img = null;
            $.hideLoading();
            return;
        }
        //图片加载完毕之后进行压缩，然后上传
        if (img.complete) {
            callback();
        } else {
            img.onload = callback;
        }
        function callback() {
            var data = compress(img);
            console.log(data)
            var imgs=data.split('base64,')[1]; 
            $('.type_base64_'+wz).val(imgs);
            img = null;
            $.hideLoading();
        }
    }

}
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
    var dataURL = canvas.toDataURL("image/"+ext);
    return dataURL;
}

//使用canvas对大图片进行压缩
function compress(img) {
    var initSize = img.src.length;
    var width = img.width;
    var height = img.height;
    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    var ratio;
    if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
    } else {
        ratio = 1;
    }
    canvas.width = width;
    canvas.height = height;
    //铺底色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //如果图片像素大于100万则使用瓦片绘制
    var count;
    if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //计算每块瓦片的宽和高
        var nw = ~~(width / count);
        var nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (var i = 0; i < count; i++) {
            for (var j = 0; j < count; j++) {
                tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
        }
    } else {
        ctx.drawImage(img, 0, 0, width, height);
    }
    //进行最小压缩
    var ndata = canvas.toDataURL('image/jpeg', 0.07);
    // console.log('压缩前：' + initSize);
    // console.log('压缩后：' + ndata.length);
    // console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
    return ndata;
}



