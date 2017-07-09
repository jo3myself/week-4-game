var character={}
var defender={}
var charSelect = false;
var defSelect = false;
var defeat = 0;
var robotName="";
end = false;

var characters = [
  r2d2 = {
    name: "r2d2",
    health: 100,
    attack: 10,
    counter: 10,
    image: "assets/images/r1.jpg",
  },

  c3po = {
    name: "c3po",
    health: 150,
    attack: 15,
    counter: 15,
    image: "assets/images/r2.jpg",
  },

  bb8 = {
    name: "bb8",
    health: 200,
    attack: 20,
    counter: 20,
    image: "assets/images/r3.jpg",
  },

  chopper = {
    name: "chopper",
    health: 250,
    attack: 25,
    counter: 25,
    image: "assets/images/r4.jpg",
  }
];
    
    for (let i = 0; i < characters.length; i++) {
    var charDiv = $("<span class='image availChar' id='" + characters[i].name + "'>");
    var charName = $("<p>").text(characters[i].name);
    var charImage = $("<img>").attr("src", characters[i].image);
    var charHealth = $("<p class='health'>").text(characters[i].health);
    charDiv.attr("name", characters[i].name);
    charDiv.attr("health", characters[i].health);
    charDiv.attr("attack", characters[i].attack);
    charDiv.attr("counter", characters[i].counter);
    charDiv.addClass("robot");
    charDiv.append(charName).append(charImage).append(charHealth);
    $(charAvail).append(charDiv);
    }

function becomeEnemy() {
  $(".availChar").removeClass("availChar").addClass("enemyChar");
  $("#enemyAvail").append($(".enemyChar"));
}

function reset() {
  $("#r2d2").children(".health").html(r2d2.health);
  $("#c3po").children(".health").html(c3po.health);
  $("#bb8").children(".health").html(bb8.health);
  $("#chopper").children(".health").html(chopper.health);

  $(".image").removeClass("choose enemyChar defChar").addClass("availChar");
  var available = $(".availChar").show();
  $("#charAvail").html(available);

  $("#message").empty();
  $("#restart").hide();

  charSelect = false;
  defSelect = false;
  defeat = 0;
  end = false;
  character = {};
  defender = {};
}


$(document).ready(function() {
  
  $("#restart").hide();

  $(".robot").on("click", function() {
    robotName = ($(this).attr("name"));
    if(charSelect == false) {
      $("#message").empty();
  
      charSelect = true;
      
      $("#"+robotName+'').removeClass("availChar").addClass("choose");
      $("#choose").append(this);
      console.log(robotName);
      character.name= ($(this).attr("name"));
      character.health=parseInt($(this).attr("health"));
      character.attack=parseInt($(this).attr("attack"));
      character.counter=parseInt($(this).attr("counter"));
      becomeEnemy();
    } else if ((charSelect == true) && (defSelect == false)) {
      if($("#"+robotName+'').hasClass("enemyChar")) {
        $("#message").empty();
 
        console.log(robotName);
        defender.name= ($(this).attr("name"));
        defender.health=parseInt($(this).attr("health"));
        defender.attack=parseInt($(this).attr("attack"));
        defender.counter=parseInt($(this).attr("counter"));
        defSelect = true;
        $("#"+robotName+'').removeClass("enemyChar").addClass("defChar");
        $("#defenderSec").append(this);
      }
    }

    });

  $("#attack").on("click", function() {
    
    if (charSelect && defSelect && !end) {

      defender.health = defender.health - character.attack;
      $(".defChar").children(".health").html(defender.health);
      $("#message").html("<p>You attacked " + defender.name + " for " + character.attack + " damage.<p>");
      character.attack = character.attack + character.counter;

      if (defender.health > 0) {
        character.health = character.health - defender.counter;
        $(".choose").children(".health").html(character.health);

        if (character.health > 0) {
          $("#message").append("<p>" + defender.name + " attacked you back for " + defender.counter + " damage.</p>");
        } else {
          end = true;
          $("#message").html("<p>You Defeated</p><p>Restart?</p>");
          $("#restart").show();
        }
      } else 
        {
        defeat++;
        defSelect = false;
        $("#message").html("<p>You have defeated " + defender.name + ". Choose another enemy.</p>");
        $(".defChar").hide();

        if (defeat === 3) {
          end = true;
          $("#message").html("<p>You WON!!!</p><p>Restart?</p>");
          $("#restart").show();
        }
      }
    } else if (!charSelect && !end) {
      $("#message").html("<p>Please select character.</p>");
    } else if (!defSelect && !end) {
      $("#message").html("<p>Please select enemy.</p>");
    }

  });

  $("#restart").on("click", function() {
    reset();
  });

}); 
