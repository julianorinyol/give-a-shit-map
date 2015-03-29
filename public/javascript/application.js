$(function() {
    var states = []
    $.getJSON('/states')
    .success(function(data){
      states = data;
      console.log('states', states);
    })
    console.log('state 2', states);

    var mode = "education"

    var map = kartograph.map('#map');
    map.loadMap('usa.svg', function() {
        console.log("start of loadmap callback")
        map.addLayer('layer0', {
            styles: {
                stroke: '#E4E4E4',
                fill: '#ABABAB'
            },
            mouseenter: function(data, path) {
                path.attr('fill', Math.random() < 0.5 ? '#F79244' : '#EA8B42');
            },
            click: function(svgState, path) {
        
                for(var i = 0; i < states.length; i++) {
                    if(states[i].state_code === stateCode){
                        updateSuperInfo(states[i])
                    }
                }

                var offset = 20;
                $('html, body').animate({
                  scrollTop: $(".scroll-to").offset().top + offset
                }, 2000);


                var stateCode = svgState.key




                var updateSuperInfo = function(state, x, y){
                    console.log(state);

                    var educationContainer1 = "<p> Libraries per capita" + ".12"+ "</p>" + "<p>Pupil/Teacher ratio: " + "14.3" + "</p>"


                    var educationContainer2 = "<p>"+"Math: " + "4"+ "</p>" + "<p>"+"Writing: "+ "5" + "</p>" + "<p>*Date from stardized tests of grade 8 students</p>"
                    
                    var educationContainer3 =  "<p>"+ "Graduated high school: 17%" + "</p>" + "<p>Bachelors Degree: 25% </p>" + "<p>"+ " Advanced degree: 17%</p>" + "<p>*Percentage of adult population over 25 years old</p>"

                    $("#superinfo").html("<h1> Hello from " + state["name"] + "</h1>")
                    
                    
                    $("#container1").html(educationContainer1)
                    $("#container2").html(educationContainer2) 
                    $("#container3").html(educationContainer3)
                }

                $.getJSON('/states/' + svgState.key)
                .success(function(state) {
                    $( ".infocontainer" ).fadeOut( "fast", function() {
                        updateSuperInfo(state);
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
                path.animate({ fill: '#ABABAB' }, 50);
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
