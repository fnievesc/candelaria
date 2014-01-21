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
    $.mobile.navigate(url,{ transition: 'slideup', changeHash: false });
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
    }
});

