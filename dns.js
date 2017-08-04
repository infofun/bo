function recordCopy() {
	if(confirm(_LANG['recordCopyConfirm'])) {	
		var soruceDomain = $('form[name=copyform] select[name=soruceDomain]');
		var domain = $('form[name=copyform] input[name=domain]');

		var params = { 'mode'	: 'recordCopy', 'soruceDomain'	: soruceDomain.val(), 'domain' : domain.val() }
		$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){

					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					if(recv['status'] == 'success') {
						location.reload();
					}
				}}
			);
	}
}



function domainsort(type) {
	if(type) {
		location.href = 'domain_list.html?sort='+type;
	}
}


function copy_url() {
	var text = $('#copyurl').text();
	window.clipboardData.setData("Text", text);
}

function makeDdnsUrl(obj) {
	var record = $(obj).val();

	if(record == '@') {
		record = '';
	}

	$('.record_name').text(record);
}


function makeAuthKey() {

	var authkey = $('form[name=ddnsauthform] input[name=authkey]');
	var params = { 'mode'	: 'makeAuthKey'}

	$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					if(recv['status'] == 'success') {
						authkey.val(recv['authkey']);
					}
				}}
			);
}

function saveAuthKey() {

	if(confirm(_LANG['saveAuthKeyConfirm'])) {

		var authkey = $('form[name=ddnsauthform] input[name=authkey]');
		var params = { 'mode'	: 'saveAuthKey', 'authkey' : authkey.val() }

		$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					if(recv['status'] == 'success') {
						location.reload();
					}
				}}
			);

	}

}

function sort(orderdata,ordertype) {

	var str = "pathname="+location.pathname+"&orderdata="+orderdata+"&ordertype="+ordertype
	setCookie('sort',str,30);
	location.reload();
}

function openMemoEdit(cnt) {
	$('#'+cnt+'_text').hide();
	$('#'+cnt+'_edit').show();
}

function memoEditConfirm(cnt,domain) {

	if(confirm(_LANG['memoEditConfirm'])) {

		var memo = $('form[name=domainlistform] input[name='+cnt+'_memo]');
		var params = { 'mode'	: 'memoEdit', 'domain'	: domain, 'memo' : memo.val() }


		$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					if(recv['status'] == 'success') {
						$('#'+cnt+'_text > span').text(memo.val());
					}

				}}
			);
	}

	$('#'+cnt+'_text').show();
	$('#'+cnt+'_edit').hide();
}

function infoMemoEdit() {
	var domain = $('form[name=domaininfoform] input[name=domain]');
	var memo = $('form[name=domaininfoform] textarea[name=memo]');

	if(confirm(_LANG['memoEditConfirm'])) {

		var params = { 'mode'	: 'memoEdit', 'domain'	: domain.val(), 'memo' : memo.val() }
		$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
				}}
			);
	}

}



function domainAdd(type) {

	switch(type) {
		case 'domain':

			/*var domain = $('form[name=domainaddform] input[name=domain]');
			if (notAllowDomain(domain.val())) {
				alert(_LANG['notAllowDomain']);
				setTimeout(function() { domain.focus(); }, 30);
				return;
			}
			if(!checkDomain(domain.val())) {
				alert(_LANG['invalidDomain']);
				setTimeout(function() { domain.focus(); }, 30);
				return;
			}

			var memo = $('form[name=domainaddform] input[name=memo]');
			if(memo.val().length > 30) {
				alert(_LANG['invalidMemo']);
				setTimeout(function() { memo.focus(); }, 30);
				return;
			}*/
			$('form[name=domainaddform] input[name=mode]').val(type);
			$('form[name=domainaddform]').submit();

		break
		case 'domains':


			var domains = $('form[name=domainaddform] textarea[name=domains]');
			var domain_list = domains.val().split("\n");


			var check_cnt = 0;

			for(var i in domain_list) {

				if(!trim(domain_list[i])) { continue;}

				if (notAllowDomain(domain_list[i])) {
					alert("["+domain_list[i]+"] "+_LANG['notAllowDomain']);
					setTimeout(function() { domains.focus(); }, 30);
					return;
				}
				if(!checkDomain(domain_list[i])) {
					check_cnt++;
				}
			}

			if(check_cnt > 0) {
				alert(_LANG['invalidDomain']);
				setTimeout(function() { domains.focus(); }, 30);
				return;
			}

			$('form[name=domainaddform] input[name=mode]').val(type);
			$('form[name=domainaddform]').submit();

		break;
	}
}

function domainDel() {

	var domain = $('form[name=domainlistform] input[name=domain]');
	var domainArray    = new Array;

	domain.each(function () {
		if($(this).attr('checked') == 'checked') {
			domainArray.push($(this).val());
		}
	});

	if(domainArray.length > 0 ) {

		var domainList = domainArray.join(',');

		if(confirm(_LANG['domainDelConfirm'])) {

			var params = { 'mode'		: 'domainDel', 'domains'	: domainList }

			$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					location.reload();
				}}
			);
		}

	}
}

function aRecordAdd() {

	var domain = $('form[name=recordform] input[name=domain]');
	var subdomain = $('form[name=recordform] input[name=subdomain]');
	var ip = $('form[name=recordform] input[name=ip]');
	var memo = $('form[name=recordform] input[name=memo]');
	var ddns = $('form[name=recordform] select[name=ddns]');

	var aDomain = domain.val().split(".");
	if(subdomain.val() != '' && !checkSubDomain2(subdomain.val()+"."+aDomain[0])) {
		alert(_LANG['invalidSubDomain']);
		setTimeout(function() { subdomain.focus(); }, 30);
		return;
	}

	if(!checkIp(ip.val())) {
		alert(_LANG['invalidIp']);
		setTimeout(function() { ip.focus(); }, 30);
		return;
	}

	if($.trim(ip.val()) == '115.71.243.35') {
		alert(_LANG['notUseIp']);
		setTimeout(function() { ip.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['aRecordAddConfirm'])) {
		var params = {
			'mode'		: 'aRecordAdd',
			'domain'	: domain.val(),
			'subdomain'	: subdomain.val(),
			'ip'		: ip.val(),
			'ddns'		: ddns.val(),
			'memo'		: memo.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function aRecordDel(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var orderArray = new Array;

	orderArray.push(order.val());

	if(confirm(_LANG['aRecordDelConfirm'])) {
		var params = {
			'mode'		: 'aRecordDel',
			'order[]'	: orderArray,
			'domain'	: domain.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function aRecordCheckDel() {

	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			orderArray.push($(this).val());
		}
	});

	if(orderArray.length > 0 ) {
		if(confirm(_LANG['aRecordCheckDelConfirm'])) {
			var params = {
				'mode'		: 'aRecordDel',
				'domain'	: domain.val(),
				'order[]'	: orderArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}


function aRecordEdit(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var ip = $('form[name=recordform] input[name=ip_'+cnt+']');
	var ddns = $('form[name=recordform] select[name=ddns_'+cnt+']');
	var memo = $('form[name=recordform] input[name=memo_'+cnt+']');

	if(!checkIp(ip.val())) {
		alert(_LANG['invalidIp']);
		setTimeout(function() { ip.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['aRecordEditConfirm'])) {
		var params = {
			'mode'		: 'aRecordEdit',
			'domain'	: domain.val(),
			'order'		: order.val(),
			'ip'		: ip.val(),
			'ddns'		: ddns.val(),
			'memo'		: memo.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function aRecordCheckEdit() {

	var domain = $('form[name=recordform] input[name=domain]');
	var ipArray = {};
	var memoArray = {};
	var ddnsArray = {};
	var cnt = 0;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {

			var record = $(this).attr('name').replace(/\D/g,'');
			var ip = $('form[name=recordform] input[name=ip_'+record+']');
			var memo = $('form[name=recordform] input[name=memo_'+record+']');
			var ddns = $('form[name=recordform] select[name=ddns_'+record+']');

			if(!checkIp(ip.val())) {
				alert(_LANG['invalidIp']);
				setTimeout(function() { ip.focus(); }, 30);
				cnt = 0;
				return false;
			}

			ipArray[$(this).val()] = ip.val();
			memoArray[$(this).val()] = memo.val();
			ddnsArray[$(this).val()] = ddns.val();
			cnt++;
		}
	});

	if(cnt > 0) {
		if(confirm(_LANG['aRecordCheckEditConfirm'])) {
			var params = {
				'mode'		: 'aRecordCheckEdit',
				'domain'	: domain.val(),
				'ip[]'		: ipArray,
				'memo[]'	: memoArray,
				'ddns[]'	: ddnsArray
				};
			$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					location.reload();
				}}
			);

		}
	}


}


function aRecordSelect(obj) {

	var aRecord = $(obj).val();
	var data = $('form[name=recordform] input[name=data]');
	var domain = $('form[name=recordform] input[name=domain]').val();

	if(aRecord == '') {
		data.attr('readonly',false);
		data.val('');
	} else {
		data.attr('readonly',true);
		if(aRecord == '@') {
			data.val(domain);
		} else {
			data.val(aRecord+"."+domain);
		}
	}
}


function cnameRecordAdd() {

	var domain = $('form[name=recordform] input[name=domain]');
	var subdomain = $('form[name=recordform] select[name=subdomain]');
	var cname = $('form[name=recordform] input[name=cname]');
	var data = $('form[name=recordform] input[name=data]');
	var memo = $('form[name=recordform] input[name=memo]');

	//CNAME 호스트 유효성 확인
	var aDomain = domain.val().split('.');
	if(!checkSubDomain2(cname.val() + '.' + aDomain[0])) {
		alert(_LANG['invalidCnameRecord']);
		setTimeout(function() { cname.focus(); }, 30);
		return;
	}

	//A레코드 호스트 정보를 배열에 담는다
	var subdomainArray = new Array;
	$('form[name=recordform] select[name=subdomain] > option').each(function () {
		if($(this).val() != '') {
			subdomainArray.push($(this).val());
		}
	});

	//입력한 CNAME 호스트가 A레코드와 중복되는 지 확인
	if(in_array(cname.val(), subdomainArray)) {
		alert(_LANG['duplicationARecord']);
		setTimeout(function() { cname.focus(); }, 30);
		return;
	}

	//목적지 도메인 유효성 확인
	if(subdomain.val() == '') {
		if(!checkDomain2(data.val())) {
			alert(_LANG['invalidDomain']);
			setTimeout(function() { data.focus(); }, 30);
			return;
		}
	}

	if(confirm(_LANG['cnameRecordAddConfirm'])) {
		var params = {
			'mode'		: 'cnameRecordAdd',
			'domain'	: domain.val(),
			'cname'		: cname.val(),
			'subdomain'	: subdomain.val(),
			'data'		: data.val(),
			'memo'		: memo.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function cnameRecordDel(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var orderArray = new Array;

	orderArray.push(order.val());

	if(confirm(_LANG['cnameRecordDelConfirm'])) {
		var params = {
			'mode'		: 'cnameRecordDel',
			'domain'	: domain.val(),
			'order[]'	: orderArray
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function cnameRecordEdit(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var data = $('form[name=recordform] input[name=data_'+cnt+']');
	var memo = $('form[name=recordform] input[name=memo_'+cnt+']');

	if(!checkDomain2(data.val())) {
		alert(_LANG['invalidDomain']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['cnameRecordEditConfirm'])) {
		var params = {
			'mode'		: 'cnameRecordEdit',
			'domain'	: domain.val(),
			'order'		: order.val(),
			'data'		: data.val(),
			'memo'		: memo.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function cnameRecordCheckEdit() {

	var domain = $('form[name=recordform] input[name=domain]');
	var dataArray = {};
	var memoArray = {};
	var cnt = 0;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {

			var record = $(this).attr('name').replace(/\D/g,'');
			var data = $('form[name=recordform] input[name=data_' + record + ']');
			var memo = $('form[name=recordform] input[name=memo_' + record + ']');

			if(!checkDomain2(data.val())) {
				alert(_LANG['invalidDomain']);
				setTimeout(function() { data.focus(); }, 30);
				cnt = 0;
				return false;
			}

			dataArray[$(this).val()] = data.val();
			memoArray[$(this).val()] = memo.val();
			cnt++;

		}
	});

	if(cnt > 0 ) {
		if(confirm(_LANG['cnameRecordCheckEditConfirm'])) {
			var params = {
				'mode'		: 'cnameRecordCheckEdit',
				'domain'	: domain.val(),
				'data[]'	: dataArray,
				'memo[]'	: memoArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}


function cnameRecordCheckDel() {

	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			orderArray.push($(this).val());
		}
	});

	if(orderArray.length > 0 ) {
		if(confirm(_LANG['cnameRecordCheckDelConfirm'])) {
			var params = {
				'mode'		: 'cnameRecordDel',
				'domain'	: domain.val(),
				'order[]'	: orderArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}


function mxRecordAdd() {

	var domain = $('form[name=recordform] input[name=domain]');
	var subdomain = $('form[name=recordform] select[name=subdomain]');
	var mx = $('form[name=recordform] input[name=mx]');
	var data = $('form[name=recordform] input[name=data]');
	var priority = $('form[name=recordform] input[name=priority]');

	var aDomain = domain.val().split(".");
	if(mx.val() != '' && !checkSubDomain2(mx.val()+"."+aDomain[0])) {
		alert(_LANG['invalidMxRecord']);
		setTimeout(function() { mx.focus(); }, 30);
		return;
	}

	if(subdomain.val() == '') {
		if(!checkDomain2(data.val())) {
			alert(_LANG['invalidDomain']);
			setTimeout(function() { data.focus(); }, 30);
			return;
		}
	}

	if(!checkNumber(priority.val()) || priority.val() == '') {
		alert(_LANG['invalidPriority']);
		setTimeout(function() { priority.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['mxRecordAddConfirm'])) {
		var params = {
			'mode'	: 'mxRecordAdd',
			'domain'	: domain.val(),
			'mx'		: mx.val(),
			'subdomain'	: subdomain.val(),
			'data'		: data.val(),
			'priority'	: priority.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function mxRecordEdit(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var target = $('form[name=recordform] input[name=target_'+cnt+']');
	var data = $('form[name=recordform] input[name=data_'+cnt+']');
	var priority = $('form[name=recordform] input[name=priority_'+cnt+']');

	if(!checkDomain2(data.val())) {
		alert(_LANG['invalidDomain']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['mxRecordEditConfirm'])) {
		var params = {
			'mode'		: 'mxRecordEdit',
			'domain'	: domain.val(),
			'order'		: order.val(),
			'data'		: data.val(),
			'target'	: target.val(),
			'priority'	: priority.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}


function mxRecordCheckEdit() {


	var domain = $('form[name=recordform] input[name=domain]');
	var dataArray = {};
	var priorityArray = {};
	var cnt = 0;

	$('.check').each(function() {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {

			var record = $(this).attr('name').replace(/\D/g, '');
			var data = $('form[name=recordform] input[name=data_' + record + ']');
			var priority = $('form[name=recordform] input[name=priority_' + record + ']');

			if(!checkDomain2(data.val())) {
				alert(_LANG['invalidDomain']);
				setTimeout(function() { data.focus(); }, 30);
				cnt = 0;
				return false;
			}

			if(!checkNumber(priority.val()) || priority.val() == '') {
				alert(_LANG['invalidPriority']);
				setTimeout(function() { priority.focus(); }, 30);
				cnt = 0;
				return false;
			}

			dataArray[$(this).val()] = data.val();
			priorityArray[$(this).val()] = priority.val();
			cnt++;
		}
	});

	if(cnt > 0 ) {
		if(confirm(_LANG['mxRecordCheckEditConfirm'])) {
			var params = {
				'mode'			: 'mxRecordCheckEdit',
				'domain'		: domain.val(),
				'data[]'		: dataArray,
				'priority[]'	: priorityArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}

function mxRecordDel(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var orderArray = new Array;

	orderArray.push(order.val());

	if(confirm(_LANG['mxRecordDelConfirm'])) {
		var params = {
			'mode'		: 'mxRecordDel',
			'domain'	: domain.val(),
			'order[]'	: orderArray
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function mxRecordCheckDel() {

	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			orderArray.push($(this).val());
		}
	});

	if(orderArray.length > 0 ) {
		if(confirm(_LANG['mxRecordCheckDelConfirm'])) {
			var params = {
				'mode'		: 'mxRecordDel',
				'domain'	: domain.val(),
				'order[]'	: orderArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}

function txtRecordAdd() {

	var domain = $('form[name=recordform] input[name=domain]');
	var txt = $('form[name=recordform] input[name=txt]');
	var data = $('form[name=recordform] input[name=data]');

	var aDomain = domain.val().split(".");
	if(txt.val() != '' && !checkSubDomain(txt.val() + "." + aDomain[0])) {
		alert(_LANG['invalidTxtRecord']);
		setTimeout(function() { txt.focus(); }, 30);
		return;
	}

	if(data.val() == '') {
		alert(_LANG['emptyTxtData']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(data.val().length > 255) {
		alert(_LANG['txtRecordLengthOver']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['txtRecordAddConfirm'])) {
		var params = {
			'mode'		: 'txtRecordAdd',
			'domain'	: domain.val(),
			'txt'		: txt.val(),
			'data'		: data.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function txtRecordEdit(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var data = $('form[name=recordform] input[name=data_'+cnt+']');

	if(data.val() == '') {
		alert(_LANG['emptyTxtData']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(data.val().length > 255) {
		alert(_LANG['txtRecordLengthOver']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['txtRecordEditConfirm'])) {
		var params = {
			'mode'		: 'txtRecordEdit',
			'domain'	: domain.val(),
			'order'		: order.val(),
			'data'		: data.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}

}

function txtRecordDel(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var orderArray = new Array;

	orderArray.push(order.val());

	if(confirm(_LANG['txtRecordDelConfirm'])) {
		var params = { 'mode'		: 'txtRecordDel', 'domain'	: domain.val(), 'order[]'	: orderArray}

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}

}

function txtRecordCheckDel() {

	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			orderArray.push($(this).val());
		}
	});

	if(orderArray.length > 0 ) {
		if(confirm(_LANG['txtRecordCheckDelConfirm'])) {
			var params = {
				'mode'		: 'txtRecordDel',
				'domain'	: domain.val(),
				'order[]'	: orderArray
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}

function srvRecordAdd() {

	var domain = $('form[name=recordform] input[name=domain]');
	var service = $('form[name=recordform] select[name=service_name]');
	var service_input = $('form[name=recordform] input[name=service_input]');
	var protocol = $('form[name=recordform] select[name=protocol_name]');
	var protocol_input = $('form[name=recordform] input[name=protocol_input]');
	var subdomain = $('form[name=recordform] input[name=subdomain]');
	var priority = $('form[name=recordform] input[name=priority]');
	var weight = $('form[name=recordform] input[name=weight]');
	var port = $('form[name=recordform] input[name=port_number]');
	var data = $('form[name=recordform] input[name=data]');

	//서비스명 직접입력 일 경우
	if(service.val() == '') {
		if(service_input.val().length < 1) {
			alert(_LANG['srvEmptyServiceName']);
			setTimeout(function() { service_input.focus(); }, 30);
			return;
		}

		if(!checkSrvName(service_input.val())) {
			alert(_LANG['invalidSrvServiceName']);
			setTimeout(function() { service_input.focus(); }, 30);
			return;
		}
	} else {
		if(!checkSrvName(service.val())) {
			alert(_LANG['invalidSrvServiceName']);
			return;
		}
	}

	//프로토콜명 직접입력 일 경우
	if(protocol.val() == '') {
		if(protocol_input.val().length < 1) {
			alert(_LANG['srvEmptyProtocolName']);
			setTimeout(function() { protocol_input.focus(); }, 30);
			return;
		}

		if(!checkSrvName(protocol_input.val())) {
			alert(_LANG['invalidSrvProtocolName']);
			setTimeout(function() { protocol_input.focus(); }, 30);
			return;
		}
	} else {
		if(!checkSrvName(protocol.val())) {
			alert(_LANG['invalidSrvProtocolName']);
			return;
		}
	}

	//서브호스트 확인
	var aDomain = domain.val().split(".");
	if(subdomain.val() != '' && !checkSubDomain3(subdomain.val()+"."+aDomain[0])) {
		alert(_LANG['invalidSubDomain']);
		setTimeout(function() { subdomain.focus(); }, 30);
		return;
	}

	//우선순위, 비중, 포트번호 확인
	if(!checkNumber(priority.val()) || priority.val() == '') {
		alert(_LANG['invalidPriority']);
		setTimeout(function() { priority.focus(); }, 30);
		return;
	}
	if(priority.val() < 0 || priority.val() > 65535) {
		alert(_LANG['invalidNumberRange1']);
		setTimeout(function() { priority.focus(); }, 30);
		return;
	}

	if(!checkNumber(weight.val()) || weight.val() == '') {
		alert(_LANG['invalidWeight']);
		setTimeout(function() { weight.focus(); }, 30);
		return;
	}
	if(weight.val() < 1 || weight.val() > 65535) {
		alert(_LANG['invalidNumberRange2']);
		setTimeout(function() { weight.focus(); }, 30);
		return;
	}

	if(!checkNumber(port.val()) || port.val() == '') {
		alert(_LANG['invalidPort']);
		setTimeout(function() { port.focus(); }, 30);
		return;
	}
	if(port.val() < 0 || port.val() > 65535) {
		alert(_LANG['invalidNumberRange1']);
		setTimeout(function() { port.focus(); }, 30);
		return;
	}

	//목적지 도메인 확인
	if(!checkDomain2(data.val())) {
		alert(_LANG['invalidDomain']);
		setTimeout(function() { data.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['srvRecordAddConfirm'])) {
		var params = {
			'mode'		: 'srvRecordAdd',
			'domain'	: domain.val(),
			'subdomain'	: subdomain.val(),
			'priority'	: priority.val(),
			'weight'	: weight.val(),
			'port'		: port.val(),
			'data'		: data.val()
			}
		
		if(service.val() == '') {
			params['service'] = service_input.val();
		} else {
			params['service'] = service.val();
		}

		if(protocol.val() == '') {
			params['protocol'] = protocol_input.val();
		} else {
			params['protocol'] = protocol.val();
		}

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				console.log(data);
				var recv = null;
				eval("var recv = " + data + ";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}
}

function srvRecordDel(cnt) {

	var domain = $('form[name=recordform] input[name=domain]');
	var order = $('form[name=recordform] input[name=record_'+cnt+']');
	var orderArray = new Array;
	orderArray.push(order.val());

	if(confirm(_LANG['srvRecordDelConfirm'])) {
		var params = {
			'mode'		: 'srvRecordDel',
			'order[]'	: orderArray,
			'domain'	: domain.val()
			};

		$.ajax({
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data) {
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}
		});
	}
}

function srvRecordCheckDel() {

	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			orderArray.push($(this).val());
		}
	});

	if(orderArray.length > 0 ) {
		if(confirm(_LANG['srvRecordCheckDelConfirm'])) {
			var params = {
				'mode'		: 'srvRecordDel',
				'order[]'	: orderArray,
				'domain'	: domain.val()
				};

			$.ajax({
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data) {
					var recv = null;
					eval("var recv = " + data + ";");
					alert(_LANG[recv['message']]);
					location.reload();
				}
			});
		}
	}

}

function mainttlSet() {
	var domain = $('form[name=recordform] input[name=domain]');
	var ttl = $('form[name=recordform] select[name=main_ttl]');

	if(ttl.val() == '') {
		alert(_LANG['emptyTtl']);
		setTimeout(function() { ttl.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['ttlSetConfirm'])) {

		var params = {
			'mode'		: 'mainttlSet',
			'domain'	: domain.val(),
			'ttl'		: ttl.val()
			};

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}
}

function ttlSet() {
	var domain = $('form[name=recordform] input[name=domain]');
	var orderArray = {};
	var cnt = 0;
	$('.check').each(function() {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			var record = $(this).attr('name');
			var ttl =  $('form[name=recordform] select[name=sel_'+record+']').val();
			orderArray[$(this).val()] = ttl;
			cnt++;
		}
	});

	if(cnt > 0) {
		if(confirm(_LANG['ttlSetConfirm'])) {

			var params = {
				'mode'		: 'ttlSet',
				'domain'	: domain.val(),
				'order[]'	: orderArray
				};

			$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					location.reload();
				}}
			);

		}
	}
}

function forwardingReady() {

	var type = $('form[name=forwardingform] select[name=type]');
	var title = $('form[name=forwardingform] input[name=title]');
	var faviconurl = $('form[name=forwardingform] input[name=faviconurl]');
	title.attr('readonly',true);
	faviconurl.attr('readonly',true);

	type.change(function () {
		
		if($(this).val() == 'h' || $(this).val() == 'i') {
			title.val('');
			faviconurl.val('');
			title.attr('readonly',true);
			faviconurl.attr('readonly',true);
		} else {
			title.attr('readonly',false);
			faviconurl.attr('readonly',false);
		}

	});
}

function changeType(no) {

	var type = $('form[name=forwardingform] select[name='+no+'_type]');
	var title = $('form[name=forwardingform] input[name='+no+'_title]');
	var faviconurl = $('form[name=forwardingform] input[name='+no+'_faviconurl]');

	if(type.val() == 'h' || type.val() == 'i') {
		title.val('');
		faviconurl.val('');
		title.attr('readonly',true);
		faviconurl.attr('readonly',true);
	} else {
		title.attr('readonly',false);
		faviconurl.attr('readonly',false);
	}
}


function forwardingAdd() {

	var domain = $('form[name=forwardingform] input[name=domain]');
	var subdomain = $('form[name=forwardingform] input[name=subdomain]');
	var moveurl = $('form[name=forwardingform] input[name=moveurl]');
	var type = $('form[name=forwardingform] select[name=type]');
	var title = $('form[name=forwardingform] input[name=title]');
	var faviconurl = $('form[name=forwardingform] input[name=faviconurl]');

	var aDomain = domain.val().split(".");
	if(subdomain.val() != '' && !checkSubDomain2(subdomain.val()+"."+aDomain[0])) {
		alert(_LANG['invalidSubDomain']);
		setTimeout(function() { subdomain.focus(); }, 30);
		return;
	}

	if(!checkUrl(moveurl.val())) {
		alert(_LANG['invalidUrl']);
		setTimeout(function() { moveurl.focus(); }, 30);
		return;
	}

	if(title.val().length > 100) {
		alert(_LANG['invalidTitle']);
		setTimeout(function() { title.focus(); }, 30);
		return;
	}

	if(faviconurl.val() != '' && !checkUrl(faviconurl.val())) {
		alert(_LANG['invalidUrl']);
		setTimeout(function() { faviconurl.focus(); }, 30);
		return;
	}


	if(confirm(_LANG['forwardingAddConfirm'])) {

		var params = { 'mode' : 'forwardingAdd', 'domain': domain.val(), 'subdomain': subdomain.val(), 'moveurl': moveurl.val() , 'type': type.val(), 'title': title.val(), 'faviconurl': faviconurl.val() }

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){

				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}


}


function forwardingEdit(no) {

	var domain = $('form[name=forwardingform] input[name=domain]');
	var type = $('form[name=forwardingform] select[name='+no+'_type]');
	var title = $('form[name=forwardingform] input[name='+no+'_title]');
	var moveurl = $('form[name=forwardingform] input[name='+no+'_moveurl]');
	var faviconurl = $('form[name=forwardingform] input[name='+no+'_faviconurl]');

	if(!checkUrl(moveurl.val())) {
		alert(_LANG['invalidUrl']);
		setTimeout(function() { moveurl.focus(); }, 30);
		return;
	}


	if(title.val().length > 100) {
		alert(_LANG['invalidTitle']);
		setTimeout(function() { title.focus(); }, 30);
		return;
	}

	if(faviconurl.val() != '' && !checkUrl(faviconurl.val())) {
		alert(_LANG['invalidUrl']);
		setTimeout(function() { faviconurl.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['forwardingEditConfirm'])) {

		var params = { 'mode' : 'forwardingEdit', 'no' : no, 'domain': domain.val(), 'moveurl': moveurl.val() , 'type': type.val(), 'title': title.val(), 'faviconurl': faviconurl.val() }

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){

				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}
}

function forwardingDel(no) {
	var domain = $('form[name=forwardingform] input[name=domain]');
	var noArray = new Array;
	noArray.push(no);

	if(confirm(_LANG['forwardingDelConfirm'])) {

		var params = { 'mode'		: 'forwardingDel', 'no[]'	: noArray , 'domain'	: domain.val()}
		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}
}

function forwardingCheckDel() {
	var domain = $('form[name=forwardingform] input[name=domain]');
	var noArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			noArray.push($(this).val());
		}
	});

	if(noArray.length > 0 ) {

		if(confirm(_LANG['forwardingCheckDelConfirm'])) {

			var params = { 'mode'		: 'forwardingDel', 'no[]'	: noArray , 'domain'	: domain.val()}
			$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					location.reload();
				}}
			);
		}

	}
}


function parkingAdd() {
	var domain = $('form[name=forwardingform] input[name=domain]');
	var subdomain = $('form[name=forwardingform] input[name=subdomain]');
	var type = $('form[name=forwardingform] input[name=type]:checked');
	var design = $('form[name=forwardingform] input[name=design]:checked');
	var title = $('form[name=forwardingform] textarea[name=title]');

	var aDomain = domain.val().split(".");
	if(subdomain.val() != '' && !checkSubDomain2(subdomain.val()+"."+aDomain[0])) {
		alert(_LANG['invalidSubDomain']);
		setTimeout(function() { subdomain.focus(); }, 30);
		return;
	}

	if(title.val().length > 300) {
		alert(_LANG['parkingAddOverLength']);
		setTimeout(function() { title.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['parkingAddConfirm'])) {

		var params = { 'mode' : 'parkingAdd', 'domain': domain.val(), 'subdomain': subdomain.val(), 'type': type.val(), 'design': design.val(), 'title': title.val() }

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}

}

function parkingEdit(no) {

	var domain = $('form[name=forwardingform] input[name=domain]');
	var type = $('form[name=forwardingform] select[name='+no+'_type]');
	var design = $('form[name=forwardingform] select[name='+no+'_design]');
	var title = $('form[name=forwardingform] textarea[name='+no+'_title]');

	if(title.val().length > 300) {
		alert(_LANG['parkingAddOverLength']);
		setTimeout(function() { title.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['parkingEditConfirm'])) {
		var params = { 'mode' : 'parkingEdit', 'no' : no, 'domain': domain.val(), 'design': design.val() , 'type': type.val(), 'title': title.val() }

		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}
}

function parkingDel(no) {

	var domain = $('form[name=forwardingform] input[name=domain]');
	var noArray = new Array;
	noArray.push(no);

	if(confirm(_LANG['parkingDelConfirm'])) {

		var params = { 'mode'		: 'parkingDel', 'no[]'	: noArray , 'domain'	: domain.val()}
		$.ajax(
			{
			type: "POST",
			url: "/domain_check.html",
			data: params,
			async:false,
			success: function(data){
				var recv = null;
				eval("var recv = "+data+";");
				alert(_LANG[recv['message']]);
				location.reload();
			}}
		);
	}
}

function parkingCheckDel() {
	var domain = $('form[name=forwardingform] input[name=domain]');
	var noArray = new Array;

	$('.check').each(function () {
		if($(this).attr('checked') == 'checked' && $(this).val() != '') {
			noArray.push($(this).val());
		}
	});

	if(noArray.length > 0 ) {

		if(confirm(_LANG['parkingCheckDelConfirm'])) {

			var params = { 'mode'		: 'parkingDel', 'no[]'	: noArray , 'domain'	: domain.val()}
			$.ajax(
				{
				type: "POST",
				url: "/domain_check.html",
				data: params,
				async:false,
				success: function(data){
					var recv = null;
					eval("var recv = "+data+";");
					alert(_LANG[recv['message']]);
					location.reload();
				}}
			);
		}

	}
}

function authemailCheck() {

	var mode = $('form[name=transregform] :radio[name="mode"]:checked').val();
	if(mode == 'whois') {
		$('form[name=transregform] input[name=whois]').eq(0).attr('checked',true);
	} else {
		$('form[name=transregform] input[name=whois]').attr('checked',false);
	}
}

function adminMailChange() {

	var uname = $('form[name=transregform] input[name=uname]');

	if(uname.val() == '') {
		alert(_LANG['emptyRegName']);
		setTimeout(function() { uname.focus(); }, 30);
		return;
	}

	var content = $('form[name=transregform] textarea[name=content]');

	if(content.val() == '') {
		alert(_LANG['emptyMailContent']);
		setTimeout(function() { content.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['adminChangeConfirm'])) {
		$('form[name=transregform]').submit();
	}
}


function adminChange() {
	var userid = $('form[name=adminchangeform] input[name=new_userid]');

	if(userid.val() == '') {
		alert(_LANG['emptyUseridTo']);
		setTimeout(function() { userid.focus(); }, 30);
		return;
	}

	var re_userid = $('form[name=adminchangeform] input[name=re_new_userid]');

	if(userid.val() != re_userid.val()) {
		alert(_LANG['disaccordUseridTo']);
		setTimeout(function() { re_userid.focus(); }, 30);
		return;
	}

	if(confirm(_LANG['adminChangeConfirm'])) {
		$('form[name=adminchangeform]').submit();
	}
}

function domain_admin_ready() {
	var whois = $('form[name=transregform] input[name=whois]').eq(0).val();

	if(typeof whois == 'undefined') {
		$('form[name=transregform] input[name=mode]').eq(1).attr('disabled',true);
	}

	$('form[name=transregform] input[name=whois]').click(function() {
		$('form[name=transregform] input[name=mode]').eq(1).attr('checked',true);
	});
}
