$("a.regnow").click(function(){
	$("#modal, #modal_bg").show();
	return false;
});

$("#modal").click(function(e){
	var bg = $("#modal");
	if(e.target == bg[0]){
		$("#modal, #modal_bg").hide();
		return false;
	}
});

$("#buynow").click(function(){
	$("#modal form").submit();
	return false;
});

$("#modal fieldset input").click(function(){
	$("#modal fieldset label").removeClass("selected");
	$(this).parent().addClass("selected");
	
	if(this.id == "dblconf"){
		$("#dblform").slideDown(200);
	} else {
		$("#dblform").slideUp(200);
	}
});

$("#ending").click(function(){
	$("a.regnow:first").click();
	return false;
});

$("#modal form").submit(function(e){
	e.preventDefault();
	var fullname = $("input[name=name]",this).val(),
		email = $("input[name=email]",this).val(),
		twitter = $("input[name=twitter]",this).val(),
		shirt = $("#shirt option:selected").attr("value"),
		emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/,
    	emailIllegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/,
    	fullname2 = $("input[name=name2]",this).val(),
		email2 = $("input[name=email2]",this).val(),
		twitter2 = $("input[name=twitter2]",this).val(),
		shirt2 = $("#shirt2 option:selected").attr("value"),
		dbl = ($("#dblconf:checked").length > 0) ? true : false,
		buynow = $("#buynow"),
		loading = $("#formload");
		
		if(!buynow.hasClass("loading")){
		
			if(fullname == "" || /^\s/.test(fullname) || !/[\w ]/.test(fullname)){
				alert("Please enter your Full Name.");
			} else if(!emailFilter.test(email) || email.match(emailIllegalChars)){
				alert("Please enter a valid Email Address.");
			} else if(twitter == "" || !/[\w]/.test(twitter)|| /\s/.test(twitter)){
				alert("Please enter your Twitter Username.");
			} else if(shirt == "" || shirt == "undefined"){
				alert("Please choose a Shirt size.");
			} else if(dbl && (fullname2 == "" || /^\s/.test(fullname2) || !/[\w ]/.test(fullname2))){
				alert("Please enter your Full Name.");
			} else if(dbl && (!emailFilter.test(email2) || email2.match(emailIllegalChars))){
				alert("Please enter a valid Email Address.");
			} else if(dbl && (twitter2 == "" || !/[\w]/.test(twitter2)|| /\s/.test(twitter2))){
				alert("Please enter your Twitter Username.");
			} else if(dbl && (shirt2 == "" || shirt2 == "undefined")){
				alert("Please choose a Shirt size.");
			} else {
				twitter = twitter.replace("@", "");
				twitter2 = twitter2.replace("@", "");
				buynow.addClass("loading");
				loading.show();
				$.post('{{base_url}}api/data/attendees-2012', {data_set_id: 2, fullname: fullname, email: email, twitter: twitter, tshirt: shirt, paid: "NO"}, function(data) {
					var data = eval('('+data+')');
					if(dbl){
						$.post('{{base_url}}api/data/attendees-2012', {data_set_id: 2, fullname: fullname2, email: email2, twitter: twitter2, tshirt: shirt2, paid: "NO"}, function(data2) {
							var data2 = eval('('+data2+')');
							if(data2.items[0].id != undefined){
								window.location = "http://valioinc.qx.ly/b/K1Nh?cp="+data.items[0].id+"-"+data2.items[0].id;
							} else {
								buynow.removeClass("loading");
								loading.hide();
								alert("Sorry, there was a problem registering you. Please try again.");
							}
						});				
					} else {
						if(data.items[0].id != undefined){
							//window.location = "http://valioinc.qx.ly/b/1XFt?cp="+data.items[0].id;
							window.location = "http://valioinc.qx.ly/b/WGii?cp="+data.items[0].id;
						} else {
							buynow.removeClass("loading");
							loading.hide();
							alert("Sorry, there was a problem registering you. Please try again.");
						}					
					}
				});
			}
		}
});

$.get("{{base_url}}api/data/attendees-2012",function(data){
	data = eval('(' + data + ')');
	var recs = data.items;
	for(var i=0; i < data.count; i++){
		if(recs[i].paid != "NO"){
			$("#attendees").prepend($('<span title="'+recs[i].fullname+'"></span>').html($('<img src="http://twitter.com/api/users/profile_image/'+recs[i].twitter+'" alt="'+recs[i].fullname+'">').error(function(){$(this).remove();})));
		}
	}
	$("#attendees span").tipTip({maxWidth: "auto", edgeOffset: 2, delay: 100, defaultPosition: 'top'});
});