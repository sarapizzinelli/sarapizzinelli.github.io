jQuery.get('projects.txt', function(data) {
    var myText = data;

    const rule_speaker  = /<speaker>.*?<speaker>/g;
	const aboutText = myText.match(/<about>.*?<about>/)[0].replaceAll('<about>','');
	const projTitles = myText.match(/<title>.*?<\/>/g);
	const projYears = myText.match(/<year>.*?<\/>/g);
	const projCategories = myText.match(/<category>.*?<\/>/g);
	const projDescription = myText.match(/<description>.*?<\/>/g);
	const projImages = myText.match(/<images>.*?<\/>/g);

	//console.log(myText);
	//console.log(aboutText);
	//console.log(projTitles);
	//console.log(projYears);
	//console.log(projCategories);

    $(document).ready(function() {
    	$('.about_text')[0].innerHTML = aboutText;
    	
    	for (i=0; i<projTitles.length; i++){
    		var images = projImages[i].replaceAll('<images>','').replaceAll('</>','').split(',');

    		$( "<div id='project_"+i+"' class='project_line'>"+
				"<div class='info' onclick='openImage(this)'>"+
	                "<div class='year'>"+projYears[i].replaceAll('<year>','')+"</div>"+
	                "<div class='category'>"+projCategories[i].replaceAll('<category>','')+"</div>"+
	                "<div class='title'>"+projTitles[i].replaceAll('<title>','')+"</div>"+
	            "</div>"+
	            "<div id='gallery_"+i+"' class='gallery'>"+
	            "</div>"+
			"</div>"+
			"<div id='lightbox_"+i+"' class='lightbox displayNone'>"+
				"<div class='closeButton' onclick='closeImage(this)'>close</div>"+
	            "<div class='lightbox_gallery'>"+
	            "</div>"+
	            "<div class='description'>"+projDescription[i]+"</div>"+
            "</div>" ).appendTo($('.projects_main'));

            for (j=0; j<images.length; j++){
            	var usedImages = $('#lightbox_'+i+' > .lightbox_gallery img[src="images/'+images[j]+'"');
    			//$( "<img loading='lazy' alt='project_"+i+"_"+j+"' onclick='openImage(this)' src='images/"+
    				//images[j]+"'>" ).appendTo($('#gallery_'+i));

    			if (usedImages.length === 0) {
    				$( /*<img loading='lazy' */"<alt='"+images[j].split('.')[0]+"_"+j+"' onclick='openImage(this)' src='images_preview/"+
    				images[j]+"'>" ).appendTo($('#gallery_'+i));

    				$( "<figure>"+
	    				"<div class='imageArrowLeft'></div>"+
	    				/*<img loading='lazy' */"<alt='"+images[j].split('.')[0]+"_"+j+"' class='insideImg' src='images/"+images[j]+"'>"+
	    				"<div class='imageArrowRight'></div>"+
	    				"</figure>" ).appendTo($('#lightbox_'+i+' > .lightbox_gallery'));
    			} else {
    				$( /*<img loading='lazy' */"<alt='"+usedImages[0].alt+"' onclick='openImage(this)' src='images_preview/"+
    				images[j]+"'>" ).appendTo($('#gallery_'+i));
    			}
    		}
    	}

    	var rows = $('.project_line');

    	//CLONE IMAGES IN GALLERIES
    	/*for (i=0; i<rows.length; i++){
    		var imagesInThisRow = rows[i].querySelectorAll('img');

		    while(true){
		    	var actualImagesInThisRow = rows[i].querySelectorAll('img');
		    	$(imagesInThisRow).clone().appendTo($('#gallery_'+i));
		    	
		    	if($(imagesInThisRow[imagesInThisRow.length-1]).width()*(actualImagesInThisRow.length) > $(rows[i].getElementsByClassName('gallery')[0]).width()){
		    		break;
		    	}
		    }
    	}*/

    	/*ARROWS*/
		$(".imageArrowLeft").on('click', function(event) {
			event.preventDefault();
			$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "none");
			$(".lightbox > .lightbox_gallery").css("overflow", "hidden");
			
			if ($(this).parent().is(':first-child')) {
				$(this).parent().parent().animate({
					scrollLeft: ($(this).parent().width() * $(this).parent().parent().children().length)
				}, 400);
				setTimeout(function() {
					$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "start");
					$(".lightbox > .lightbox_gallery").css("overflow", "scroll");
				}, 400);
				return
			}
			
			$(this).parent().parent().animate({
				scrollLeft: '-='+($(this).parent().width())
			}, 400);
			setTimeout(function() {
				$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "start");
				$(".lightbox > .lightbox_gallery").css("overflow", "scroll");
			}, 400);
			return
		});

		$(".imageArrowRight").on('click', function(event) {
			event.preventDefault();
			
			$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "none");
			$(".lightbox > .lightbox_gallery").css("overflow", "hidden");
			
			if ($(this).parent().is(':last-child')) {
				$(this).parent().parent().animate({
					scrollLeft: 0
				}, 400);
				setTimeout(function() {
					$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "start");
					$(".lightbox > .lightbox_gallery").css("overflow", "scroll");
				}, 400);
				return
			}

			$(this).parent().parent().animate({
				scrollLeft: '+='+($(this).parent().width())
			}, 400);
			setTimeout(function() {
				$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "start");
				$(".lightbox > .lightbox_gallery").css("overflow", "scroll");
			}, 400);
			return
		});
    });
});




function openAbout(moreButton) {
	$('.about_page').toggleClass('translateOnView');

	if (!$('.about_page_background').hasClass('displayBlock')){
		$('.about_page_background').addClass('displayBlock');
		setTimeout(function() {
			$('.about_page_background').addClass('visible');
		}, 10);
	} else {
		$('.about_page_background').removeClass('visible');
		$('.about_page_background').removeClass('displayBlock');
	}

	$(moreButton).toggleClass('colorWhite');

	if ($(moreButton).hasClass('colorWhite')){
		$('.moreButton')[0].innerText = 'less';
	} else {
		$('.moreButton')[0].innerText = 'more';
	}
}
function closeAbout(aboutBackground) {
	$(aboutBackground).removeClass('visible');
	$(aboutBackground).removeClass('displayBlock');

	$('.about_page').removeClass('translateOnView');
	$('.moreButton').removeClass('colorWhite');
	$('.moreButton')[0].innerText = 'more';
}

function openImage(image) {
	if(image.tagName == 'IMG'){
		var thisProjectNumber = image.parentElement.id.replace('gallery_','');
		var thisImageAlt = image.alt;
		var thisImageNumber = (thisImageAlt + '').split('_').at(-1);
		if(!$('#lightbox_'+thisProjectNumber).hasClass('displayNone')){
			return
		}
	} else if(image.tagName == 'DIV'){
		var thisProjectNumber = image.parentElement.id.replace('project_','');
		if(!$('#lightbox_'+thisProjectNumber).hasClass('displayNone')){
			
			$('#lightbox_'+thisProjectNumber).removeClass('opacityOne');
			setTimeout(function(){
				$('#lightbox_'+thisProjectNumber).addClass('displayNone');
			}, 300);
			$('#project_'+thisProjectNumber+' > .info > *').removeClass('colorPink');
			return
		}
	}

	/*$('.lightbox').removeClass('opacityOne');
	$('.lightbox').addClass('displayNone');*/
	var openedProject = $('.lightbox:not(.displayNone)');
	openedProject.removeClass('opacityOne');
	setTimeout(function(){
		openedProject.addClass('displayNone');
		//$('.gallery').addClass('displayNone');
	}, 600); /*make it more than 600*/

	$('.lightbox_gallery').animate({
		scrollLeft: 0
	}, 0);

	$('.project_line > .info > *').removeClass('colorPink');

	$('#lightbox_'+thisProjectNumber).removeClass('displayNone');
	setTimeout(function(){
		$('#lightbox_'+thisProjectNumber).addClass('opacityOne');
	}, 10);

	//get to precise image
	if(thisImageAlt){

		var desiredImage = $('#lightbox_'+thisProjectNumber+
			' > .lightbox_gallery > figure > img[alt="'+thisImageAlt+'"');

		console.log(thisImageAlt);
		console.log(thisImageNumber);
		console.log(desiredImage);
		console.log($(desiredImage).parent());
		console.log($(desiredImage).parent().width());
		console.log($(desiredImage).parent().width() * (thisImageNumber));

		$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "none");
		$(".lightbox > .lightbox_gallery").css("overflow", "hidden");

		$(desiredImage).parent().parent().animate({
			scrollLeft: ($(desiredImage).parent().width() * (thisImageNumber))
		}, 400);

		setTimeout(function() {
			$(".lightbox > .lightbox_gallery > figure").css("scroll-snap-align", "start");
			$(".lightbox > .lightbox_gallery").css("overflow", "scroll");
		}, 400);
	}

	$('#project_'+thisProjectNumber+' > .info > *').addClass('colorPink');
}

function closeImage(image) {
	var thisProjectNumber = image.parentElement.id.replace('lightbox_','');

	$('.gallery').removeClass('displayNone');
	$('#lightbox_'+thisProjectNumber).removeClass('opacityOne');

	setTimeout(function(){
		$('#lightbox_'+thisProjectNumber).addClass('displayNone');
	}, 600);

	$('#project_'+thisProjectNumber+' > .info > *').removeClass('colorPink');
}
