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
                // console.log(d)
                // console.log(d["key"])
                // console.log(d["label"])
                // $("#superinfo").html("<p>Hello " + svgState.label + "</p>")

                var stateCode = svgState.key

                var updateSuperInfo = function(state, x, y){
                
                  $("#superinfo").html("<p> Hello from " + state["name"] + "</p>")
                $("#container1").html("<p> The Population of "+ state.name + " is " + state["population"] + "</p>")
                $("#container2").html("<p> Did you know the area of  " + state.name + " is " + state["area"] + " square miles?? " + "</p>")
                $("#container3").html("<p> The capital is " + state.capital + "</p>")
                }

                for(var i = 0; i < states.length; i++) {
                    if(states[i].state_code === stateCode){
                        updateSuperInfo(states[i])
                    }

                }

                // $.getJSON('/states/' + svgState.key)
                // .success(updateSuperInfo)
                // .error(function(status, error){
                //   console.log("something went wrong", status, error);
                // })

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
