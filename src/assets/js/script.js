
import $ from 'jquery';
import 'jquery-ui';

$(document).ready(function(){
	//"use strict";
  
  
  $( "#sortable" ).sortable({
    placeholder: "ui-state-highlight"
  });
  $( "#sortable" ).disableSelection();
  

  
  /*$('.index-list').bind('scroll', function() {
    var currentTop = $('.index-list').scrollTop();
    var elems = $('.index-list .index-list-section[data-scroll-target]');

    elems.each(function(){
      var elemTop 	= $(this).offset().top;
      var elemBottom 	= elemTop + $(this).height();
      
      if(currentTop > elemTop && currentTop < elemBottom){
        var id = $(this).attr('data-scroll-target');
				//console.log(id);
        var navElem = $('.btn-index-navigator[data-scroll-to="' + id+ '"]');
        //console.log(navElem);
    		navElem.addClass('active').siblings().removeClass( 'active' );
      }
    });
	});*/
  
  $('.index-panel .index-navigator .btn-index-navigator').on('click', function(event){
		event.preventDefault(); 
		var offset = 0;
		var anchor = $(this).data('scroll-to');
		var target = $('[data-scroll-target="'+anchor+'"]');
		if(target.length){
			$('.index-list').animate({ 
				scrollTop: target.offset().top - offset
			}, 500);
		}
	});
 

});




