$(function() {
    var states = []
    $.getJSON('/states')
    .success(function(data){
      states = data;
    })

    var mode = "education"
    var currentState = ""
    var currentPath = ""

    function updateWhenFilter() {
        for(var i = 0; i < states.length; i++) {
          if(states[i].state_code === currentState.key){
              updateSuperInfo(states[i])
          }
        }
    }

    $("#equalityMode").click(function(){ 
      console.log(currentState.key)
      mode = "equality"
      updateTitles()
      updateWhenFilter()
        // talkToServer(currentState, currentPath)
    });
    $("#educationMode").click(function(){ 
      mode = "education"
      updateTitles()
      updateWhenFilter()

    });
    $("#povertyMode").click(function(){ 
      mode = "poverty"
      updateTitles()
      updateWhenFilter()
    });

    var educationTitles = ["Resources", "Performance","Graduation Rates"]

    var equalityTitles = ["Politics", "Justice System","Wage Gap"]

    var povertyTitles = ["General Poverty Rate", "Women in Poverty","Health Insurance"]

    var updateTitles = function() {
        if (mode == "education"){
            $("#box1title").html(educationTitles[0])
            $("#box2title").html(educationTitles[1])
            $("#box3title").html(educationTitles[2])
        }else if(mode == "poverty"){
            $("#box1title").html(povertyTitles[0])
            $("#box2title").html(povertyTitles[1])
            $("#box3title").html(povertyTitles[2])
        }else if(mode == "equality"){
            $("#box1title").html(equalityTitles[0])
            $("#box2title").html(equalityTitles[1])
            $("#box3title").html(equalityTitles[2])
        }
    }

    updateTitles()

    var updateSuperInfo = function(state, x, y){

      console.log(state);

      var educationContainer1 = '<p> People per library: ' + parseInt(state.population/(state.branch_libraries + state.central_libraries)) + '</p>' + '<p>Students per teacher: ' + state.students_per_teacher + '</p>'

      var educationContainer2 = "<p>"+"Math: " + state.grade_eight_math_score + "</p>" + "<p>"+"Writing: "+ state.grade_eight_writing_score + "</p>" + "<p>* <em>Date from standardized tests of eighth grade students</em></p>"
      
      var educationContainer3 =  "<p>"+ "High school diploma: " + state.high_school_grad * 100 + "%</p>" + "<p>Bachelors degree: " + (state.bachelors  * 100) + "%</p>" + "<p>"+ " Advanced degree: "+ state.advanced_degree * 100 + "%</p>" + "<p>* <em>Percentage of adult population over 25 years old</em></p>"

      $("#superinfo").html("<h1>" + state["name"] + ", Population: "+ state.population +"</h1>")                    

      var equalityContainer1 = "<p>Women in legislature: " + parseInt(state.total_seats/(state.house+state.senate)) + "%</p>"
      var equalityContainer2 = "<p>Women in the justice system: "+"5"+"%</p>"
      var equalityContainer3 = "<p>" + "For every dollar earned by men on average, women earn " + parseInt(state.wage_gap) + " cents.</p>"
      var povertyContainer1 = "<p>Overall poverty rate: " + state.general_poverty_rate*100 + "%</p>"
      var povertyContainer2 = "<p>Women in poverty: " + state.women_in_poverty + "%</p>"
      var povertyContainer3 = "<p>Children in poverty: " + "5" + "%</p>"

      var contents1 = ""
      var contents2 = ""
      var contents3 = ""
      
      if(mode === "education") {
          contents1 = educationContainer1;
          contents2 = educationContainer2;
          contents3 = educationContainer3;
      } else if(mode === "equality") {
          contents1 = equalityContainer1;
          contents2 = equalityContainer2;
          contents3 = equalityContainer3;
      } else if(mode === "poverty") {
          contents1 = povertyContainer1;
          contents2 = povertyContainer2;
          contents3 = povertyContainer3;
      } 

      $("#container1").html(contents1)
      $("#container2").html(contents2) 
      $("#container3").html(contents3)
    }

    var map = kartograph.map('#map');
    map.loadMap('usa.svg', function() {
        console.log("start of loadmap callback")
        map.addLayer('layer0', {
          styles: {
              stroke: '#E4E4E4',
              fill: '#ABABAB'
          },
          mouseenter: function(state, path) {
              path.attr('fill', Math.random() < 0.5 ? '#F79244' : '#EA8B42');
              $("#statename").html("<h3 style='color:#F79244'>" + state.label +  "</h3>"); 
          },
          click: function(svgState, path) {
            // the following for loop can be used, when we set up havin g the database all load at once in the beginning. we need to figure out how to use the animations with it.
            // for(var i = 0; i < states.length; i++) {
            //     if(states[i].state_code === stateCode){
            //         updateSuperInfo(states[i])
            //     }
            // }

            currentState = svgState
            currentPath = path
              
            var talkToServer = function(svgState, path) {
              var offset = 20;
              $('html, body').animate({
                scrollTop: $(".scroll-to").offset().top + offset
              }, 1500);

              var stateCode = svgState.key

              $.getJSON('/states/' + svgState.key)
              .success(function(state) {
                $( ".infocontainer" ).fadeOut( "fast", function() {
                    updateSuperInfo(state);
                    $( ".infocontainer" ).fadeIn();
                });
                // fade in info boxes
              })
              .error(function(status, error){
                console.log("something went wrong", status, error);
              })
            }
            talkToServer(svgState, path)
          },

          mouseleave: function(d, path) {
              path.animate({ fill: '#ABABAB' }, 50);
          }
        
        });

        // var points_of_interest = [
        //     { name: 'Juneau, AK', lat: 58.3, lon: -134.416667 },
        //     { name: 'Honolulu, HI', lat: 21.3, lon: -157.816667 },
        //     { name: 'San Francisco, CA', lat: 37.783333, lon: -122.416667 },
        // ];

        // map.addSymbols({
        //     type: kartograph.LabeledBubble,
        //     data: points_of_interest,
        //     location: function(d) { return [d.lon, d.lat] },
        //     title: function(d) { return d.name; },
        //     radius: 3,
        //     center: false,
        //     attrs: { fill: 'black' },
        //     labelattrs: { 'font-size': 11 },
        //     buffer: true
        // });

    }, { padding: 30 });
});
