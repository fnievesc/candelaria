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
            window.mySwipe = $('#mySwipe').Swipe().data('Swipe');
            $( "#mySwipe" ).on( "swipeleft", function(){
                mySwipe.next();
            } );
            $( "#mySwipe" ).on( "swiperight", function(){
                mySwipe.previous();
            } );
        break;
        case 'recorrido.html':
            initMapa();
        break;
    }
});

function initMapa()
{
    alert('initMapa');
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
  alert('despues de tramos');
            var myLocation = new google.maps.LatLng(14.647695,-90.502769);
            alert(myLocation);
            map = new google.maps.Map(document.getElementById('recorrido'), {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                zoom: 15
                });
                alert(map);
                map.setCenter(myLocation);
                map.setZoom(18);
                primerTramoRuta.setMap(map);
                nuevoTramoRuta.setMap(map);
                ultimoTramoRuta.setMap(map);

}

