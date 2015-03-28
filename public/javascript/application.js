$(function() {
    var states = []
    $.getJSON('/states')
    .success(function(data){
      states = data;
      console.log('states', states);
    })
    console.log('state 2', states);

    var map = kartograph.map('#map');
    map.loadMap('usa.svg', function() {
        console.log("start of loadmap callback")
        map.addLayer('layer0', {
            styles: {
                stroke: '#aaa',
                fill: '#f6f4f2'
            },
            mouseenter: function(data, path) {
                path.attr('fill', Math.random() < 0.5 ? '#c04' : '#04c');
            },
            click: function(svgState, path) {
        
                // for(var i = 0; i < states.length; i++) {
                //     if(states[i].state_code === stateCode){
                //         updateSuperInfo(states[i])
                //     }
                // }

                var offset = 20;
                $('html, body').animate({
                  scrollTop: $(".scroll-to").offset().top + offset
                }, 2000);


                var stateCode = svgState.key

                var updateSuperInfo = function(state, x, y){
                    $("#superinfo").html("<p> Hello from " + state["name"] + "</p>")
                    $("#container1").html("<p> In a randomized telephone survey of women 18 years and older " + state.poor_health + "% reported having \"fair or poor\" health. </p>" + "<p>" + "An adult who has a BMI between 25 and 29.9 is considered overweight. An adult who has a BMI of 30 or higher is considered obese. " + state.obesity  + "% of women in " + state.name +" are overweight or obese" + "</p>")
                    $("#container2").html("<p>Out of every 1000 teenage girls between 15 and 19 years, " + state.teen_birth + " have had at least one child.</p>") 
                    $("#container3").html("<p>" + state.doctor + "% of women in " + state.name + " have no personal doctor or other health care provider." + "</p>" + "<p>" + state.health_insurance + "% of women aged 19-63 did not have health insurance coverage.</p>")
                }

                $.getJSON('/states/' + svgState.key)
                .success(function(state) {
                    $( ".infocontainer" ).fadeOut( "fast", function() {
                        updateSuperinfo(state);
                        $( ".infocontainer" ).fadeIn();
                    });
                    

     

                    console.log(state);
                    // fade in info boxes

                    
                })
                .error(function(status, error){
                  console.log("something went wrong", status, error);
                })

                //var currentState = <% State.last.name %>
                console.log(svgState)
                // $("#testytest").append("<p>"<% State.find(1).name %>"</p>")
            },
            mouseleave: function(d, path) {
                path.animate({ fill: '#f6f4f2' }, 200);
            }
        
        });

        var points_of_interest = [
            // { name: 'Juneau, AK', lat: 58.3, lon: -134.416667 },
            // { name: 'Honolulu, HI', lat: 21.3, lon: -157.816667 },
            // { name: 'San Francisco, CA', lat: 37.783333, lon: -122.416667 },
        ];

        map.addSymbols({
            type: kartograph.LabeledBubble,
            data: points_of_interest,
            location: function(d) { return [d.lon, d.lat] },
            title: function(d) { return d.name; },
            radius: 3,
            center: false,
            attrs: { fill: 'black' },
            labelattrs: { 'font-size': 11 },
            buffer: true
        });

    }, { padding: 30 });
});
