$("#reg a").click(function(){
	$(this).parent().fadeOut(300,function(){$("#signup").show()});
	return false;
});

$("#confradio").click(function(){
	$("#num2").slideUp();
});
$("#dblconfradio").click(function(){
	$("#num2").slideDown();
});

$(".tiptip").tipTip({maxWidth: "400px"}).click(function(){
	return false;
});

$("#buynow").click(function(){
	if($(this).children("span").html() != "Loading..."){
		var fullname = $("#fullname").val(),
			email = $("#email").val(),
			twitter = $("#twitter").val(),
			shirt = $("#shirt").find("option:selected").attr("value"),
			emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/,
    		emailIllegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/,
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
			$.post('{{base_url}}api/data/attendees-2012', {data_set_id: 2, fullname: fullname, email: email, twitter: twitter, tshirt: shirt, paid: "NO"}, function(data) {
				var data = eval('('+data+')');
				if(dbl){
					$.post('{{base_url}}api/data/attendees-2012', {data_set_id: 2, fullname: fullname2, email: email2, twitter: twitter2, tshirt: shirt2, paid: "NO"}, function(data2) {
						var data2 = eval('('+data2+')');
						if(data2.items[0].id != undefined){
							window.location = "http://valioinc.qx.ly/b/K1Nh?cp="+data.items[0].id+"-"+data2.items[0].id;
						} else {
							$(this).children("span").html("Buy Now");
							alert("Sorry, there was a problem registering you. Please try again.");
						}
					});				
				} else {
					if(data.items[0].id != undefined){
						window.location = "http://valioinc.qx.ly/b/1XFt?cp="+data.items[0].id;
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