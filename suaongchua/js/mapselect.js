(function($, win) {
  
  var  $commonTab = $(".map");

  $(function(){
    $commonTab.find("div").hide();
    selectChange();
  });

  function selectChange(){
    var $selectTarget = $(".info select");
    $selectTarget.change(function(event) {
       var $this = $(this);
       var curTab = $this.find('option:selected').val();
       
       curTab = "#tab-" + curTab;
       curTab = $(curTab);

       // change store address
       $(".daily_list").removeClass("active");
       $(".daily_list").hide();
       if(curTab.hasClass("active")) {
        curTab.removeClass("active");
         curTab.fadeOut();
       } else {
         curTab.fadeIn();
         curTab.addClass("active");
       }
    
    });

  }
    
})(jQuery,window);