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
var app = {
irA: function(url) {
        $.mobile.changePage(url,{ transition: 'slideup', changeHash: true });
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
    }
});

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
              });
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
