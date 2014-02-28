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


$(document).bind('pagechange',function(toPage, options){
    var url = $.mobile.path.parseUrl(toPage.currentTarget.URL);

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
        case 'recorrido.html':
            initMapa();
        break;
        case 'noticias.html':
            getNoticias();
        break;
        case 'noticia.html':
            getNoticia();
        break;
        case 'pregon.html':
            getPregon();
        break;
    }
});

function getPregon()
{
    
    $.ajax({url:'http://216.120.237.30/~frajonic/candelaria/movilAPI/pregon.php',
            type:'POST',
            dataType:'jsonp',
            crossDomain:true
}).done(function(data){
        $('#bodyPregon').html(data.content).trigger('create');
    }).fail(function(){alert('error')});
}

function getNoticias()
{
    
    $.ajax({url:'http://216.120.237.30/~frajonic/candelaria/movilAPI/noticias.php',
            type:'POST',
            dataType:'jsonp',
            crossDomain:true
}).done(function(data){
        listHTML = '<ul data-role="listview" data-inset="true"><li data-role="list-divider">Noticias</li>';    
        noticias = data.noticias
        for(i=noticias.length-1;i>=0;i--)
        {
            listHTML += '<li><a href="noticia.html" data-transition="slide" onClick="noticiaid='+i+'"><img src="http://216.120.237.30/~frajonic/candelaria/'+noticias[i].imagen[0].url+'"><h2>'+noticias[i].titulo+'</h2><p>'+noticias[i].texto+'</p></a></li>';
        }
        listHTML += '</ul>';
        $('#noticiasHolder').html(listHTML).trigger('create');
    }).fail(function(){alert('error')});
}

function getNoticia()
{
    
    $.ajax({url:'http://216.120.237.30/~frajonic/candelaria/movilAPI/noticias.php',
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
            });    }).fail(function(){alert('error obteniendo noticia')});
}

function initMapa()
{
    
    $('#recorrido').css('height',$(window).height()-68);
    $('#recorrido').css('width','100%');

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
  
        navigator.geolocation.getCurrentPosition(function(position)
        {
            var myLocation = new google.maps.LatLng(14.647695,-90.502769);
            map = new google.maps.Map(document.getElementById('recorrido'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                zoom: 15
            });
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

            $.ajax({url:'http://216.120.237.30/~frajonic/candelaria/movilAPI/puntosRef.php',
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
                }
             }).fail(function(){alert('error')});
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
        console.write('done');
    }, function failure() {
        //phonegap failed 
        //alert('Error loading system')
    } );

};
