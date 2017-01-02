var iniLocations = [{
  clickCount: 0,
  name: "Solenoid",
  descr: "a great view",
  article : ko.observable(),
  coords: {
    lat: 50.364409,
    lng: 7.614130
  }
}, {
  clickCount: 0,
  name: "Pressure Relief",
  descr: "an awesome green",
  article : ko.observable(),
  coords: {
    lat: 50.355523,
    lng: 7.602743
  }
}, {
  clickCount: 0,
  name: "Shutoff Valve",
  descr: "two rivers at once",
  article : ko.observable(),
  coords: {
    lat: 50.364555,
    lng: 7.606087
  }
}, {
  clickCount: 0,
  name: "Valve Isle",
  descr: "a Fountain!",
  article : ko.observable(),
  coords: {
    lat: 50.360200,
    lng: 7.598058
  }
}, {
  clickCount: 0,
  name: "2-Solenoid",
  descr: "trains",
  article : ko.observable(),
  coords: {
    lat: 50.358886,
    lng: 7.590677
  }
}, {
  clickCount: 0,
  name: "Solenoid Budget",
  descr: "a nice building",
  article : ko.observable(),
  coords: {
    lat: 50.360793,
    lng: 7.595737
  }
}, {
  clickCount: 0,
  name: "Lorem Ipsum",
  descr: "neat architecture",
  article : ko.observable(),
  coords: {
    lat: 50.355461,
    lng: 7.603140
  }
}, {
  clickCount: 0,
  name: "Steam Trap",
  descr: "an old building",
  article : ko.observable(),
  coords: {
    lat: 50.362062,
    lng: 7.603766
  }
}, {
  clickCount: 0,
  name: "Steam Trap Pharma",
  descr: "an old square",
  article : ko.observable(),
  coords: {
    lat: 50.358631,
    lng: 7.610564
  }
}];

  /**ViewModel aka Octopus*/
  

var ViewModel = function() {

    var self = this;
	self.availableApplications = ko.observableArray(["Prep","Pla","Tri","Har"]);
	self.specselect = ko.observable();
	self.towMachselect = ko.observable();
	self.dateSelect = ko.observable();
	self.size_field = ko.observable();
	self.total_price = ko.observable("Datum Wählen");
	self.pricing_level = ko.observable("Datum Wählen")
	
	self.showChoices = function(){
		if (self.specselect(false)) {
			self.specselect(true);
		}
		else  {
			self.specselect(false)
		}
    };
	
	self.showTowMach = function(){
		self.towMachselect(true);
		self.dateSelect(true);
    };
	/* trigger of function hidden in slider 2 functionality*/
    
	



var size_field = 50;
var max_field = 200;

  $( function() {
    $( "#slider-range-min" ).slider({
      range: "min",
      value: size_field,
      min: 1,
      max: max_field,
      slide: function( event, ui ) {
        $( "#amount" ).val(+ ui.value );
		size_field = ui.value;
		/* actual price could be calculated depending on month */
		self.size_field(Math.ceil(size_field/20));

      }
    });
	
    $( "#amount" ).val( $( "#slider-range-min" ).slider( "value" ) );
	
	
	setInterval(repaintCanvas, 50);
	
  } );
  
  
var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
function repaintCanvas() {
		var canvas_dim = 500;
		/* variable below is softening the scaling of the box and keeping it at min 100px */
		var current_field = ((size_field/max_field) * 400) + 100;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		var grd = ctx.createLinearGradient(0,0,1.1*current_field,0);
		grd.addColorStop(0,"red");
		grd.addColorStop(1,"white");
		ctx.fillStyle = grd;


		ctx.fillRect(20,20,current_field,current_field);
		unit_field = " ha";
		
		total_field = Math.floor(Math.sqrt(size_field)* Math.sqrt(size_field));
		total_field = total_field.toString();
		show_field = total_field.concat(unit_field);
		ctx.stroke();
		ctx.font = "30px Arial";
		ctx.fillStyle = 'white';
		ctx.fillText(show_field,(size_field/2+20),(size_field/2)+50);
};


var size_field2 = 75;
var max_field2 = 100;

  $( function() {
    $( "#slider-range-min2" ).slider({
      range: "min",
      value: size_field2,
      min: 35,
	  step: 5,
      max: max_field2,
      slide: function( event, ui ) {
        $( "#amount2" ).val(+ ui.value );
		size_field2 = ui.value;
		self.showTowMach();
      }
    });
	
    $( "#amount2" ).val( $( "#slider-range-min2" ).slider( "value" ) );
	
	
	setInterval(repaintCanvas2, 50);
  } );
  
  
var c2=document.getElementById("myCanvas2");
var ctx2=c2.getContext("2d");
function repaintCanvas2() {
		var objimage1 = new Image();
		objimage1.src = "hill.png";
		var objimage2 = new Image();
		objimage2.src = "hill.png";
		var canvas_dim2 = 500;
		/* variable below is softening the scaling of the box and keeping it at min 100px */
		
		ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
		basic_offset = 100;
		basic_o_2nd_img = 200;
		ctx2.drawImage(objimage1,basic_offset,100)
		ctx2.drawImage(objimage2,basic_o_2nd_img + size_field2,100)
		unit_field2 = " cm";		
		total_width = size_field2.toString();
		show_field2 = total_width.concat(unit_field2);
        ctx2.beginPath();
        ctx2.moveTo(100, 135);
        ctx2.lineTo(250+size_field2, 135);
        ctx2.stroke();
		
		
		ctx2.font = "20px Arial";
		ctx2.fillStyle = 'black';
		ctx2.fillText(show_field2,(160 + size_field2/2),100);
};
	


	  $( function() {
    $( "#datepicker" ).datepicker({
      altField: "#alternate",
      altFormat: "DD, d MM, yy",
	  onSelect: function() {
		preisfaktor = (1+ (Math.random()/2)).toFixed(2)
        self.pricing_level(preisfaktor)
		self.total_price((size_field*150*preisfaktor).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "."));
      }
    });
  } );
	
	
	
	
	
	
	
	
	
	
	
	
	

};





  $(document).ready(function(){
ko.applyBindings(new ViewModel())
});

