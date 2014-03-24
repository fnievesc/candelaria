/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var noticiaid = 0;
var app = {
irA: function(url) {
        $.mobile.changePage(url,{ transition: 'flow', changeHash: true });
        //$( ":mobile-pagecontainer" ).pagecontainer( "change", url, { transition: "slideup" } );
    },
externo: function(url)
{
    window.open(url, '_system');
}
};

$(document).bind("pagebeforechange", function(e, data)
{
    if (typeof data.toPage !== "string")
    {
        return;
    }

    // If the new page has a corresponding navbar link, activate its content div
    var url = $.mobile.path.parseUrl(data.toPage);


    switch(url.hash)
    {
    	case '#marchas':
    	case '#historia':
    	case '#poemas':
    	case '#programas':
     		hideTabsAudios(e,url);
 		break;
 		case '#recorridoTab':
 		case '#recorridoTabInfantil':
 		case '#recomendaciones':
 		case '#programaMarchas':
 		case '#programaMarchasInfantil':
 		case '#puntosInteres':
 		case '#horario':
 			hideTabsJuevesSanto(e, url);
		break;
	}
	
});


$(document).bind('pagechange',function(toPage, options){
    var url = $.mobile.path.parseUrl(toPage.currentTarget.URL);
    if(url.filename == 'juevesSanto.html' || url.filename== 'procesionInfantil.html')
		$('.ui-content').attr('style','height:'+($(window).height()-247)+'px !important');
	else
		$('.ui-content').attr('style','height:'+($(window).height()-177)+'px !important')

    switch(url.filename)
    {
        case 'jn.html':
        case 'vm.html':
        case 'mm.html':
        case 'sj.html':
        case 'pi.html':
            $('.carousel ul li img').css('width',($(document).width()*90)/100)
            $('.carousel').jCarouselLite({
                visible: 1,
                auto: 3000,
                speed: 800
            });
        break;
        case 'juevesSanto.html':
        	hideTabsJuevesSanto(null, url);
            initMapa();
            programaMarchas();
        break;
        case 'procesionInfantil.html':
        	hideTabsJuevesSanto(null,url);
        	initMapaInfantil();
        	programaMarchasInfantil();
        case 'noticias.html':
            getNoticias();
        break;
        case 'noticia.html':
            getNoticia();
        break;
        case 'pregon.html':
            getPregon();
        break;
        case 'audios.html':
        	getMarchas();
        	getProgramas();
        	hideTabsAudios(null, url);
    	break;
    }
});

function getPregon()
{
    $.mobile.loading('show') 
    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/pregon.php',
            type:'POST',
            dataType:'jsonp',
            crossDomain:true
}).done(function(data){
        $('#bodyPregon').html(data.content).trigger('create');
	    $.mobile.loading('hide'); 
    }).fail(function(){alert('error');    $.mobile.loading('hide'); 
});
}

function getMarchas()
{
	if($('#marchas').html()=='')
	{
	    $.mobile.loading('show');
	    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/marchas.php',
	            type:'POST',
	            dataType:'jsonp',
	            crossDomain:true
	}).done(function(data){
	        $('#marchas').html(data.marchas).trigger('create');
		    $.mobile.loading('hide'); 
	    }).fail(function(){alert('error');    
	    	$.mobile.loading('hide'); 
		});
	}
}

function programaMarchas()
{
	if($('#programaMarchas').html()=='')
	{
	    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/programaMarchas.php',
	            type:'POST',
	            dataType:'jsonp',
	            crossDomain:true
	}).done(function(data){
	        $('#programaMarchas').html(data.marchas).trigger('create');
		    $.mobile.loading('hide'); 
	    }).fail(function(){alert('error');    
	    	$$('#programaMarchas').html('<ul data-role="listview" data-inset="true" data-theme="a"><li data-role="list-divider">Programa disponible a partir de S&aacute;bado de Ramos</li></ul>').trigger('create');    
	    	$.mobile.loading('hide'); 
		});
	}
} 

function programaMarchasInfantil()
{
	if($('#programaMarchasInfantil').html()=='')
	{
	    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/programaMarchasInfantil.php',
	            type:'POST',
	            dataType:'jsonp',
	            crossDomain:true
	}).done(function(data){
	        $('#programaMarchasInfantil').html(data.marchas).trigger('create');
		    $.mobile.loading('hide'); 
	    }).fail(function(){
	    	$('#programaMarchasInfantil').html('<ul data-role="listview" data-inset="true" data-theme="a"><li data-role="list-divider">Programa disponible a partir del Cuarto S&aacute;bado de Cuaresma</li></ul>').trigger('create');    
	    	$.mobile.loading('hide'); 
		});
	}
} 


function getProgramas()
{
	if($('#grabados').html()=='')
	{
	    $.mobile.loading('show');
	    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/programas.php',
	            type:'POST',
	            dataType:'jsonp',
	            crossDomain:true
	}).done(function(data){
	        $('#bodyPregon').html(data.content).trigger('create');
		    $.mobile.loading('hide'); 
	    }).fail(function(){alert('error');    
		    $.mobile.loading('hide'); 
		});
	}
}



function getNoticias()
{
    $.mobile.loading('show') 
    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/noticias.php',
            type:'POST',
            dataType:'jsonp',
            crossDomain:true
}).done(function(data){
        listHTML = '<ul data-role="listview" data-inset="true"><li data-role="list-divider">&nbsp;</li>';    
        noticias = data.noticias
        for(i=noticias.length-1;i>=0;i--)
        {
            listHTML += '<li><a href="noticia.html" data-transition="slide" onClick="noticiaid='+i+'"><img src="http://216.120.237.30/~frajonic/candelaria/'+noticias[i].imagen[0].url+'"><h2>'+noticias[i].titulo+'</h2><p>'+noticias[i].texto+'</p></a></li>';
        }
        listHTML += '<li data-role="list-divider">&nbsp;</li></ul>';
        $('#noticiasHolder').html(listHTML).trigger('create');
    	$.mobile.loading('hide') 
    }).fail(function(){alert('error');    $.mobile.loading('hide') });
}

function getNoticia()
{
    $.mobile.loading('show') 
    $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/noticias.php',
            type:'POST',
            data: {noticia: noticiaid},
            dataType:'jsonp',
            crossDomain:true
}).done(function(data){
        noticias = data.noticias;
        i = 0;
        listHTML = '<h2 class="ff_intro ff_ifirst">'+noticias[i].titulo+'</h2>';
        if(noticias[i].imagen.length == 1)
            listHTML += '<img src="http://216.120.237.30/~frajonic/candelaria/'+noticias[i].imagen[0].url+'" style="width:90%">';
        else
        {
            listHTML += '<div class="carousel"><ul>';
            for(j=0;j<noticias[i].imagen.length;j++)
            {
                listHTML += '<li><img src="http://216.120.237.30/~frajonic/candelaria/'+noticias[i].imagen[j].url+'" style="height:200px;width: auto;"/></li>';
            }
            listHTML += '</ul></div>';
        }
        listHTML += '<p>'+noticias[i].texto+'</p>';
        $('#noticiaHolder').html(listHTML).trigger('create');
            $('.carousel').jCarouselLite({
                visible: 1,
                auto: 3000,
                speed: 800
            });    
			$.mobile.loading('hide') 
			$.mobile.loading('hide') 
        }).fail(function()
    	{
			alert('error obteniendo noticia');
			$.mobile.loading('hide') 
		});
}

function initMapaInfantil()
{
    $.mobile.loading('show') 
    $('#recorridoTabInfantil').css('height',$(window).height()-68);
    $('#recorridoTabInfantil').css('width','100%');

    var myLocation = new google.maps.LatLng(14.647695,-90.502769);
    map2 = new google.maps.Map(document.getElementById('recorridoTabInfantil'), {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        zoom: 15
    });
    map2.setCenter(myLocation);
    map2.setZoom(18);

    var infantilRuta = new google.maps.Polyline({
	    path: recorridoInfantil,
	    geodesic: true,
	    strokeColor: '#FF0000',
	    strokeOpacity: 1.0,
	    strokeWeight: 2
	});
	
	infantilRuta.setMap(map2);

            $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/puntosRefInfantil.php',
                     type:'POST',
                     dataType:'jsonp',
                     crossDomain:true
         }).done(function(data){
                puntosRef = data;
                for(punto=0;punto<puntosRef.puntosderef.length;punto++)
                {
                    marker = new google.maps.Marker({
                        "position": new google.maps.LatLng(puntosRef.puntosderef[punto].latitude,puntosRef.puntosderef[punto].longitude),
                        "title": puntosRef.puntosderef[punto].title,
                        "icon": (puntosRef.puntosderef[punto].image=="")?'images/Pelicano-Cruz.png':puntosRef.puntosderef[punto].image,
                        "map": map2
                    });                
                    var myTemplate = '<h1>'+puntosRef.puntosderef[punto].title+'<h1><p>Horario: '+(puntosRef.puntosderef[punto].horario=="00:00"?"No Disponible":puntosRef.puntosderef[punto].horario)+'</p>';
                    var infowindow = new google.maps.InfoWindow({
                        content: myTemplate 
                    });

                    google.maps.event.addListener(marker, 'click', makeInfoWindowListener(infowindow,map2,marker));
				    $.mobile.loading('hide') 
                }
             }).fail(function(){alert('error')});
	
    navigator.geolocation.getCurrentPosition(function(position)
    {
            miPosActual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            marker = new google.maps.Marker({
                "position": miPosActual,
                "map": map2
            });
            
            bounds = map2.getBounds();
            bounds.extend(miPosActual);
            
            map2.fitBounds(bounds);
	});
		
	$.mobile.loading('hide');  
}

function initMapa()
{
    $.mobile.loading('show'); 
    $('#recorridoTab').css('height',$(window).height()-68);
    $('#recorridoTab').css('width','100%');

    map = new google.maps.Map(document.getElementById('recorridoTab'), {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        zoom: 15
    });


    var primerTramoRuta = new google.maps.Polyline({
    path: primerTramo,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
  var nuevoTramoRuta = new google.maps.Polyline({
    path: nuevoTramo,
    geodesic: true,
    strokeColor: '#000000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
  var ultimoTramoRuta = new google.maps.Polyline({
    path: ultimoTramo,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  
 $.ajax({url:'http://216.120.237.30/~candelar/movilAPI/puntosRef.php',
             type:'POST',
             dataType:'jsonp',
             crossDomain:true
 }).done(function(data){
        puntosRef = data;
        for(punto=0;punto<puntosRef.puntosderef.length;punto++)
        {
            marker = new google.maps.Marker({
                "position": new google.maps.LatLng(puntosRef.puntosderef[punto].latitude,puntosRef.puntosderef[punto].longitude),
                "title": puntosRef.puntosderef[punto].title,
                "icon": (puntosRef.puntosderef[punto].image=="")?'images/Pelicano-Cruz.png':puntosRef.puntosderef[punto].image,
                "map": map
            });                
            var myTemplate = '<h1>'+puntosRef.puntosderef[punto].title+'<h1><p>Horario: '+(puntosRef.puntosderef[punto].horario=="00:00"?"No Disponible":puntosRef.puntosderef[punto].horario)+'</p>';
            var infowindow = new google.maps.InfoWindow({
                content: myTemplate 
            });

            google.maps.event.addListener(marker, 'click', makeInfoWindowListener(infowindow,map,marker));
		    $.mobile.loading('hide') 
        }
 }).fail(function(){alert('error')});
  
        navigator.geolocation.getCurrentPosition(function(position)
        {
            var myLocation = new google.maps.LatLng(14.647695,-90.502769);
            map.setCenter(myLocation);
            map.setZoom(18);
            primerTramoRuta.setMap(map);
            nuevoTramoRuta.setMap(map);
            ultimoTramoRuta.setMap(map);
            miPosActual = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            marker = new google.maps.Marker({
                "position": miPosActual,
                "map": map
            });
            
            bounds = map.getBounds();
            bounds.extend(miPosActual);
            
            map.fitBounds(bounds);
    });
}

function makeInfoWindowListener(infowindow, map, marker)
{
    return function() {
        infowindow.open(map,marker);
  };  
}

function initializePhoneGap( success, failure ) {
    var timer = window.setInterval( function () {
        if ( window.device ) {
            window.clearInterval( timer );
            success();
        };
    }, 100 );
    window.setTimeout( function () { //failsafe
        if ( !window.device ) { //phonegap failed
            window.clearInterval( timer );
            failure();
        };
    }, 5000 ); //5 seconds
};


window.onload = function () {
    initializePhoneGap( function success() {
        //start app
        pushNotification = window.plugins.pushNotification;
		if ( device.platform == 'android' || device.platform == 'Android' )
		{
		    pushNotification.register(
		        successHandler,
		        errorHandler, {
		            "senderID":"159481896421",
		            "ecb":"onNotificationGCM"
		        });
		}
		else
		{
		    pushNotification.register(
		        tokenHandler,
		        errorHandler, {
		            "badge":"true",
		            "sound":"true",
		            "alert":"true",
		            "ecb":"onNotificationAPN"
		        });
		}        
	},
	function failure() {
        //phonegap failed 
        //alert('Error loading system')
    } );

};

function hideTabsAudios(e,url)
{
	var $a = $("div[data-role='navbar'] a[href='" + url.hash + "']");
	if ($a.length)
	{
	    // Suppress normal page change handling since we're handling it here for this case
	    e.preventDefault();
	}
	// If the new page has a navbar, activate the content div for its active item
	else
	{
	    $a = $(url.hash + " div[data-role='navbar']").find("a.ui-btn-active");
	
	// Allow normal page change handling to continue in this case so the new page finishes rendering
	}
	
	// Show the content div to be activated and hide other content divs for this page
	var $content = $($a.attr("href"));
	$content.siblings().hide();
	$content.show();
}

function hideTabsJuevesSanto(e,url)
{
	var $a = $("div[data-role='navbar'] a[href='" + url.hash + "']");
	if ($a.length)
	{
	    // Suppress normal page change handling since we're handling it here for this case
	    e.preventDefault();
	}
	// If the new page has a navbar, activate the content div for its active item
	else
	{
	    $a = $(url.hash + " div[data-role='navbar']").find("a.ui-btn-active");
	
	// Allow normal page change handling to continue in this case so the new page finishes rendering
	}
	
	// Show the content div to be activated and hide other content divs for this page
	var $content = $($a.attr("href"));
	$content.siblings().hide();
	$content.show();
}
