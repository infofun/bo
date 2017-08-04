$(document).ready(function(){
	
	$('script[src="/js/common_basic.js"]').remove();

	// LINK (url)
	$("[class*=btn_link],button[type=button]").bind("click", function(e){

		if ($(this).attr("url")) {
			var v_url = $(this).attr("url");
			if ($(this).attr("target") == "_blank") {
				window.open(v_url);
			}
			else {
				window.location.href = v_url;
			}
		}
		else if ($(this).attr("js")) {
			var v_js = $(this).attr("js");
			eval(v_js);
		}
		else  {
			return;
		}
	});

	// 통합검색
	$("#f_sch_tot input[name=sch_tot_k]").bind("keydown", function(e) {
		if (e.keyCode == 13) {
			var v_cate = $("#f_sch_tot input[name=sch_tot_c]").val();
			var v_sort = $("#f_sch_tot input[name=sch_sort_k]").val();
			submit_sch(v_cate, v_sort);
		}
		return;
	});




	$('.checkall').bind("click", function (e) {

		var check = $('.check');
		if($(this).attr('checked') == 'checked') {
			check.each(function () {
				$(this).attr("checked",true);
			});
		} else {
			check.each(function () {
				$(this).attr("checked",false);
			});
		}

	});

	var path = window.location.pathname;
	switch(path) {
		case '/':
		case '/index.html':
			var userid = $('form[name=loginform] input[name=userid]');
			setTimeout(function() { userid.focus(); }, 30);
		break;
	}

	//왼쪽배너 롤링
	var Maxing = 0;

	$('.rolling').each(function() {
		Maxing++;
	});

	var idx = 0;

	$('.rolling').eq(idx).show();
	setInterval(function() {
		$('.rolling').eq(idx).hide();
		idx++;
		if(Maxing == idx) {
			idx = 0;
		}
		$('.rolling').eq(idx).show();
	},2500);
});

function submit_sch(cate,sort_k) {
	$("#f_sch_tot").attr("method","get");
	$("#f_sch_tot input[name=sch_tot_c]").val(cate);
	$("#f_sch_tot input[name=sch_sort_k]").val(sort_k);
	$("#f_sch_tot").attr("action","/search/search_main.php");
	$("#f_sch_tot").submit();
}

function setPng24(obj)
{
	obj.width = obj.height = 1;
	obj.className = obj.className.replace(/\bpng24\b/i,'');
	obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+ obj.src +"',sizingMethod='image');"
	obj.src = '';
	return '';
}

function putComma(input) {
	var num = input;

	if (num < 0) {
		num *= -1;
		var minus = true
	}else{
		var minus = false
	}

	var dotPos = (num+"").split(".")
	var dotU = dotPos[0]
	var dotD = dotPos[1]
	var commaFlag = dotU.length%3

	if(commaFlag) {
		var out = dotU.substring(0, commaFlag)
		if (dotU.length > 3) out += ","
	}
	else var out = ""

	for (var i=commaFlag; i < dotU.length; i+=3) {
		out += dotU.substring(i, i+3)
		if( i < dotU.length-3) out += ","
	}

	if(minus) out = "-" + out
	if(dotD) return out + "." + dotD
	else return out
}

function getTimeStamp() {
	var d = new Date();

	var s =	leadingZeros(d.getFullYear(), 4) + '-' + leadingZeros(d.getMonth() + 1, 2) + '-' + leadingZeros(d.getDate(), 2) + ' ' + leadingZeros(d.getHours(), 2) + ':' + leadingZeros(d.getMinutes(), 2) + ':' + leadingZeros(d.getSeconds(), 2);

	return s;
}

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();

	if (n.length < digits) {
	for (i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

function sleep(msecs)
{
	var start = new Date().getTime();
	var cur = start;
	while (cur - start < msecs)
	{
		cur = new Date().getTime();
	}
}


function setCookie(name, value, expiredays) {
	var expire_date = new Date();
	expire_date.setDate(expire_date.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; expires=" + expire_date.toGMTString() + "; path=/";
}


function clearCookie(name) {

	var expire_date = new Date();


	expire_date.setDate(expire_date.getDate() - 1)
	document.cookie = name + "= " + "; expires=" + expire_date.toGMTString() + "; path=/"
}




function getCookie(name) {
	var from_idx = document.cookie.indexOf(name+'=');
		if (from_idx != -1) {
			from_idx += name.length + 1
			to_idx = document.cookie.indexOf(';', from_idx)
			if (to_idx == -1) {
			to_idx = document.cookie.length
		}
		return unescape(document.cookie.substring(from_idx, to_idx))
	}
}

function callkeydown(func) {
	if(event.keyCode == 13) {
		eval(func+"()");
	}
}


function trim(value) {
   return value.replace(/^\s+|\s+$/g,"");
}



/*
*/
function checkDomain2(domain) {

	domain = trim(domain);
	var length = domain.length;
	
	/*
	if (length > 70) {
		return false;
	}
	*/

	var pattern = /^(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z])))$/;
	return pattern.test(domain);
}

function notAllowDomain(domain){
	domain = domain.toLowerCase();
	domain = domain.replace(/\s/g,'');
	var domain_pattern = /(.tc|.ml|.ga|.cf|.gq)$/g;
	return domain_pattern.test(domain);
}

function checkDomain(domain){

	domain = domain.toLowerCase();

	if ( domain.substr(0,4) == "www." || domain.substr(0,4) == "WWW." ) {
            domain = domain.replace("www.","").replace("WWW.","");
    }

	if(domain.indexOf(".") < 0) {
		return false;
	}

	var domain_pattern = /^([a-z0-9\-.]){4,63}$/;

	if(!domain_pattern.test(domain)) {
		return false;
	}

	var tmp  = domain.split(".");
	var name = tmp[0];
	var ext  = tmp[(tmp.length-1)];

	var name_pattern = /^([^\-])([a-z0-9\-])*([^\-])$/;

	if(name.length < 2 )  {
		return false;
	}

	if(!name_pattern.test(name)) {
		return false;
	}

	var ext_pattern = /^([^\.])([a-z\.]){0,12}([^\.])$/;
	if(!ext_pattern.test(ext) && (ext != 'xn--3e0b707e' && ext != 'xn--mk1bu44c' && ext != 'xn--t60b56a')) {
		return false;
	}

	var sub_pattern = /(\.xn--3e0b707e|\.gyeongbuk\.kr|\.gyeongnam\.kr|\.chungnam\.kr|\.chungbuk\.kr|\.gyeonggi\.kr|\.gangwon\.kr|\.jeonbuk\.kr|\.jeonnam\.kr|\.incheon\.kr|\.gwangju\.kr|\.seoul\.kr|\.busan\.kr|\.daegu\.kr|\.ulsan\.kr|\.jeju\.kr|\.hs\.kr|\.firm\.in|\.com\.au|\.com\.mx|\.com\.cn|\.net\.cn|\.org\.cn|\.org\.uk|\.net\.in|\.org\.in|\.ind\.in|\.gen\.in|\.pe\.kr|\.re\.kr|\.or\.kr|\.co\.kr|\.go\.kr|\.ne\.kr|\.co\.nz|\.co\.uk|\.me\.uk|\.co\.in|\.co\.id|\.co\.jp|\.ac\.kr|\.solutions|\.name|\.land|\.mobi|\.info|\.asia|\.tips|\.biz|\.org|\.com|\.net|\.pro|\.gl|\.pe|\.gy|\.cy|\.to|\.co|\.la|\.us|\.de|\.se|\.kr|\.jp|\.je|\.rs|\.tv|\.cc|\.cn|\.do|\.me|\.so|\.in|\.is|\.eu|\.bz|\.cz|\.es|\.sh|\.ac|\.ly|\.st|\.gg|\.ch|\.mn|\.kim|\.im|\.link|\.club|\.at|\.camp|\.glass|\.io|\.social|\.sx|\.city|\.moe|\.net\.au|\.su|\.net\.nz|\.house|\.cm|\.cat|\.photo|\.cool|\.clinic|\.zone|\.ms|\.pt|\.vision|\.hk|\.pw|\.coffee|\.xyz|\.hn|\.pics|\.uk|\.space|\.website|\.cricket|\.work|\.works|\.red|\.rocks|\.forsale|\.reviews|\.ninja|\.social|\.capital|\.build|\.watch|\.design|\.pk|\.sg|\.media|\.in\.net|\.webcam|\.science|\.party|\.best|\.wiki|\.org\.au|\.guru|\.host|\.how|\.kg|\.date|\.faith|\.racing|\.review|\.win|\.ai|\.band|\.ink|\.gift|\.ws|\.download|\.center|\.bid|\.trade|\.accountant|\.loan|\.gallery|\.today|\.style|\.edu\.ph|\.be|\.tech|\.top|\.dance|\.one|\.company|\.lol|\.on|\.ee|\.tj|\.sale|\.news|\.company|\.menu|\.stream|\.xn--mk1bu44c|\.xn--t60b56a|\.black|\.com\.sg|\.games|\.shop|\.global|\.love|\.cn\.com|\.id|\.blog|\.life|\.bike|\.auction|\.site|\.services|\.cab|\.tours|\.cafe|\.email|\.studio|\.fund|\.events|\.by|\.online)$/g;
	var tmpdomain = domain.replace(sub_pattern,"");

	if(tmpdomain.split(".").length > 1) {
		return false;
	}

	return true;
}

function checkSrvName(str) {

	str = trim(str);

	var pattern = /^_([a-z0-9\-]+)$/;

	return pattern.test(str);
}

function checkSubDomain(subdomain) {

	subdomain = trim(subdomain);
	var length = subdomain.length;

	if (length > 61) {
		return false;
	}
	var pattern = /^(((([A-Za-z0-9\-\_]+)|([\*]+))\.)+([A-Za-z0-9\-\_])+)$/;
	//var pattern = /^((\*.+)|(([A-Za-z0-9\-\_])+\.+([A-Za-z0-9\-\_])+))$/;
	return pattern.test(subdomain);
}

function checkSubDomain2(subdomain) {

	subdomain = trim(subdomain);
	var length = subdomain.length;

	if (length > 61) {
		return false;
	}

	var pattern = /^(\*|[a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)(\.[a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)*$/;
	return pattern.test(subdomain);
}

function checkSubDomain3(subdomain) {

	subdomain = trim(subdomain);
	var length = subdomain.length;

	if (length > 61) {
		return false;
	}

	var pattern = /^([a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)(\.[a-zA-Z0-9]+([-_]*[a-zA-Z0-9]+)*)*$/;
	return pattern.test(subdomain);
}


function checkIp(ip) {
	ip = trim(ip);

	var pattern = /^((((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5]))))$/;
	return pattern.test(ip);
}

function checkUrl(url) {
	url = trim(url);

	var pattern = /^(((([a-z0-9\-])+\.)+([a-z]{2}\.[a-z]{2}|[a-z]{2,4}))|((((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))\.(((([0-1])?([0-9])?[0-9])|(2[0-4][0-9])|(2[0-5][0-5])))))/;
	return pattern.test(url);
}

function checkNumber(num) {
	if (isNaN(num) == true) {
		return false;
	}
	return true;
}

function in_array (needle, haystack, argStrict) {
    // Checks if the given value exists in the array
    //
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/in_array    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {                return true;
            }
        }
    } else {
        for (key in haystack) {            if (haystack[key] == needle) {
                return true;
            }
        }
    }
    return false;
}

function copy(text) {
	var ie = (document.all) ? true : false;

	if(ie) {
		window.clipboardData.setData("Text", text);
		alert("클립보드로 복사 완료 되었습니다.");
	} else {
		temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요.", text);
	}
}

function srv_select_box(obj) {
	if(obj.value == ''){
		$(obj).css('margin-top', '5px');
		$(obj).next().show();
	} else {
		$(obj).css('margin-top', '0px');
		$(obj).next().hide();
	}
}








