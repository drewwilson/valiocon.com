$(function(){

	$("#speaker_intro li a").each(function(){
		$(this).tipTip({maxWidth: "auto", edgeOffset: 8, delay: 100, defaultPosition: "top", content: $(this).parent().find("span.name").html()});
		$(this).tipTip({maxWidth: "auto", edgeOffset: 8, delay: 100, holderID: "tiptopic", content: $(this).parent().find("span.topic").html()}); 
	});
	
	$("#reg_now").click(function(){
		var w = ($(window).width() - $(this).width())/2;
		var left = $("#reg1").offset()['left'];
		$("#register").animate({"height":"350px"});
		$("#reg1").css({"margin-left":(w - left - 170)+"px"}).animate({marginLeft: $(window).width()+"px"}, 500, function(){
			$(this).hide();
			$("#reg2").css({"display":"block", "margin-left":"-"+$(window).width()+"px"}).animate({marginLeft: "0px"}, 400);
		});	
		return false;
	});
	
	$("#redalert").click(function(){
		$("#reg_now").click();
	});
	
	$.getJSON('{{base_url}}api/data/attendees', function(data) {
		for(var i=0;i<data.count;i++){
			if(data.items[i].paid != "NO"){			
				var img = $("<img>").attr({"src":"https://api.twitter.com/1/users/profile_image/"+data.items[i].twitter+"?size=bigger", title: data.items[i].fullname}).error(function(){
					$(this).attr("src", "http://valiocon.com/images/default-avatar.png");
				});
				$("#attending p").append(img);
			}
		}
		$("#attending img").each(function(){
			var title = $(this).attr("title");
			$(this).tipTip({maxWidth: "auto", edgeOffset: 8, delay: 100, defaultPosition: "top", content: "<span>"+title+"</span>"}).attr("title","");
		});
	});

/*
	$("#liveradio").click(function(){
		$("#shirt").attr("disabled","disabled");
		$("#num2").slideUp();
		$("#register").animate({"height":"350px"});
	});
	$("#confradio").click(function(){
		$("#shirt").removeAttr("disabled");
		$("#num2").slideUp();
		$("#register").animate({"height":"350px"});
	});
	$("#dblconfradio").click(function(){
		$("#shirt").removeAttr("disabled");
		$("#num2").slideDown();
		$("#register").animate({"height":"500px"});
	});
*/
	
	$("#buynow").click(function(){
		if($(this).children("span").html() != "Loading..."){
			var fullname = $("#fullname").val(),
				email = $("#email").val(),
				twitter = $("#twitter").val(),
				shirt = $("#shirt").find("option:selected").attr("value"),
				emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/,
	    		emailIllegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/,
	    		pass_type = ($("#liveradio:checked").length > 0) ? "broadcast" : "conference",
	    		fullname2 = $("#fullname2").val(),
				email2 = $("#email2").val(),
				twitter2 = $("#twitter2").val(),
				shirt2 = $("#shirt2").find("option:selected").attr("value"),
	    		dbl = ($("#dblconfradio:checked").length > 0) ? true : false;
			if(fullname == "" || /^\s/.test(fullname) || !/[\w ]/.test(fullname)){
				alert("Please enter your Full Name.");
			} else if(!emailFilter.test(email) || email.match(emailIllegalChars)){
				alert("Please enter a valid Email Address.");
			} else if(twitter == "" || !/[\w]/.test(twitter)|| /\s/.test(twitter)){
				alert("Please enter your Twitter Username.");
			} else if(pass_type == "conference" && (shirt == "" || shirt == "undefined")){
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
				$(this).children("span").html("Loading...");
				$.post('{{base_url}}api/data/attendees', {data_set_id: 1, fullname: fullname, email: email, twitter: twitter, tshirt: shirt, pass_type: pass_type, paid: "NO"}, function(data) {
					var data = eval('('+data+')');
					if(dbl){
						$.post('{{base_url}}api/data/attendees', {data_set_id: 1, fullname: fullname2, email: email2, twitter: twitter2, tshirt: shirt2, pass_type: "conference", paid: "NO"}, function(data2) {
							var data2 = eval('('+data2+')');
							if(data2.items[0].id != undefined){
								window.location = "http://valioinc.qx.ly/b/ZkAX?cp="+data.items[0].id+"-"+data2.items[0].id;
							} else {
								$(this).children("span").html("Buy Now");
								alert("Sorry, there was a problem registering you. Please try again.");
							}
						});				
					} else {
						if(data.items[0].id != undefined){
							var loc = (pass_type == "broadcast") ? "http://valioinc.qx.ly/b/NJF9?cp="+data.items[0].id : "http://valioinc.qx.ly/b/l7uG?cp="+data.items[0].id;
							window.location = loc;
						} else {
							$(this).children("span").html("Buy Now");
							alert("Sorry, there was a problem registering you. Please try again.");
						}					
					}
				});
			}
		}
		return false;
	});
	
	$("a.registernow").click(function(){
		$("#reg_now").click();
	});
	
	$("#popup").click(function(){
		$(this).hide();
	});
	
	$("a.pop").click(function(){
		var src = $(this).parent().parent().children("img").attr("src");
		src = src.replace("small-", "big-");
		src = src.replace(".png", ".jpg");
		$("#popup > div.inner img").attr("src",src);
		$("#popup").show();
		return false;
	});

});