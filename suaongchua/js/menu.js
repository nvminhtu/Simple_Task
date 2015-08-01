$(window).load(function(){	
	//$('body, html').scrollTop(0);
	$("#menu-icon").click(function(){
		$('#gnavi').stop(1,1).slideToggle();
	});
	

});


$(window).bind('load resize',function(){
	init_size();
});
$(window).resize(function(){
		init_size();
});
function init_size()
{
		var screen_w =  $(document).outerWidth();
		var screen_h = $(document).innerHeight();		
		if(screen_w>=960){
				$('#gnavi').show();	
		}
		else{
				$('#gnavi').hide();	
			}
}